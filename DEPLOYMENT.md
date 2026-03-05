# Deployment & GitHub Guide

This guide covers everything you need to know about keeping your code secure, pushing it to GitHub, and hosting the application live on Vercel.

## 1. Hiding Important Items (The `.gitignore` File)

Before pushing any code to a public repository, you must prevent sensitive information and large generated folders from being uploaded. This is handled by a file named `.gitignore` in the root of your project. 

Our current `.gitignore` is already set up to protect your project. It automatically prevents the following things from ever being pushed to GitHub:
- `node_modules/`: Huge dependency folders that can be redownloaded anytime via `npm install`.
- `dist/` and `build/`: The compiled frontend code. It's better to let Vercel compile this on their own servers.
- `.env*`: **CRITICAL!** This prevents any `.env` files containing your MySQL Database connection strings, API keys, and Google Auth Client Secrets from being leaked publicly. 
- `*.log`: Any server or debug log files.

*Note: Make sure your actual secret variables are kept in a `.env` file! Do not hardcode secrets like `Aiven MySQL Connection Strings` or `Google OAuth keys` directly inside `server.js` or `main.tsx` if you make this repository public.*

---

## 2. Steps to Upload to GitHub

To store your project on GitHub, follow these console commands in the root of your project directory (`d:\2026\Projects\interactive-3d-visiting-card`):

1. **Initialize Git (if not done already):**
   \`\`\`bash
   git init
   \`\`\`

2. **Stage your files for commit:**
   Add all your files to the staging area. The `.gitignore` will automatically filter out the bad stuff.
   \`\`\`bash
   git add .
   \`\`\`

3. **Commit your changes:**
   \`\`\`bash
   git commit -m "Initial commit ✨: Full 3D Interactive Card Application"
   \`\`\`

4. **Connect to your new GitHub Repository:**
   Go to [GitHub.com](https://github.com), log in, and click **New Repository**. Give it a name (like `3d-visiting-card`). 
   Once created, copy the URL they provide and link it to your local project:
   \`\`\`bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   \`\`\`

5. **Push to GitHub:**
   Upload your code!
   \`\`\`bash
   git branch -M main
   git push -u origin main
   \`\`\`

---

## 3. Steps to Host on Vercel

Vercel is the easiest place to host this React/Node application. 

**Important Architecture Note for Vercel:**
Right now, your Express backend (`server.js`) and your React frontend (`src/`) run separately on different ports locally. Vercel specializes primarily in serverless Frontend hosting. To host everything for free simply on Vercel, you have two options depending on how you wish to structure it:

### The Easy Way: Vercel for Frontend, Render/Railway for Backend
1. **Frontend (Vercel):**
   - Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **Add New Project**.
   - Import the repository you just pushed to GitHub.
   - Vercel will auto-detect that it is a **Vite/React** project. 
   - Click **Deploy**. Your Frontend is now live on a global URL!

2. **Backend (Render.com or Railway.app):**
   - Because `server.js` runs a persistent Node Express server connected to MySQL, Vercel (which uses short-lived "serverless" functions) isn't the best fit for it natively without refactoring into `/api` serverless files.
   - Instead, log into [Render.com](https://render.com) and connect your GitHub.
   - Add a new **Web Service**.
   - Point it at `server.js`.
   - Setup your Environment Variables here (your Aiven MySQL strings).
   - Once it deploys, take the URL Render gives you (e.g. `https://my-backend.onrender.com`) and update all the `fetch('http://localhost:3001/...')` calls inside your React code to point to your new Production URL! Push that update to GitHub, and Vercel will auto-update!

### Vercel ONLY Route (Requires Minor Restructuring)
If you wish to do everything on Vercel, you would need to stop running it as `app.listen(3001)` in `server.js`, and instead break your endpoints out into individual serverless files inside a `/api` folder at the root of the project, which Vercel will automatically convert to serverless endpoints.
