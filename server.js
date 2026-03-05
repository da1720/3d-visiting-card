import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import https from 'https';
import http from 'http';

const app = express();
app.use(cors());
app.use(express.json());

import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool(process.env.DATABASE_URL || 'mysql://YOUR_USER:YOUR_PASSWORD@YOUR_HOST:22858/defaultdb?ssl-mode=REQUIRED', {
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});

async function initDB() {
    try {

        // Create users table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255)
      )
    `);

        // Create cards table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS cards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        card_data JSON NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

        // Create feedback table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

        console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}

app.post('/api/login', async (req, res) => {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        let userId;

        if (rows.length === 0) {
            const [result] = await pool.query('INSERT INTO users (email, name) VALUES (?, ?)', [email, name || 'User']);
            userId = result.insertId;
        } else {
            userId = rows[0].id;
        }

        res.json({ userId, email, name: rows[0]?.name || name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/users/:userId', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.userId]);
        res.json(rows[0] || null);
    } catch (err) { res.status(500).json({ error: 'DB error' }); }
});

app.put('/api/users/:userId', async (req, res) => {
    try {
        await pool.query('UPDATE users SET name = ? WHERE id = ?', [req.body.name, req.params.userId]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: 'DB error' }); }
});

app.delete('/api/users/:userId', async (req, res) => {
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [req.params.userId]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: 'DB error' }); }
});

app.get('/api/cards/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const [rows] = await pool.query('SELECT id, card_data FROM cards WHERE user_id = ?', [userId]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/cards/:userId', async (req, res) => {
    const { userId } = req.params;
    const { id, cardData } = req.body; // allow saving existing card id

    try {
        if (id) {
            await pool.query('UPDATE cards SET card_data = ? WHERE id = ? AND user_id = ?', [JSON.stringify(cardData), id, userId]);
            return res.json({ success: true, id });
        }

        const [rows] = await pool.query('SELECT COUNT(*) as count FROM cards WHERE user_id = ?', [userId]);
        if (rows[0].count >= 3) return res.status(403).json({ error: 'Card limit reached (3 max).' });

        const [insertRes] = await pool.query('INSERT INTO cards (user_id, card_data) VALUES (?, ?)', [userId, JSON.stringify(cardData)]);
        res.json({ success: true, id: insertRes.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

app.delete('/api/cards/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM cards WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: 'DB error' }); }
});

app.post('/api/feedback', async (req, res) => {
    try {
        await pool.query('INSERT INTO feedback (user_id, message) VALUES (?, ?)', [req.body.userId, req.body.message]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: 'DB error' }); }
});

app.get('/api/proxy-image', (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) return res.status(400).send('URL required');

    const client = imageUrl.startsWith('https') ? https : http;
    client.get(imageUrl, (imageRes) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Expose-Headers', '*');
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        res.set('Content-Type', imageRes.headers['content-type']);
        imageRes.pipe(res);
    }).on('error', () => {
        res.status(500).send('Failed to fetch image');
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    await initDB();
    console.log(`Server running on port ${PORT}`);
});
