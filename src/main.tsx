import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'motion/react';
import App from './App.tsx';
import { LoginPage } from './components/LoginPage.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

function Root() {
  const [authData, setAuthData] = useState<{ userId: number, email: string } | null>(null);
  const [activeCard, setActiveCard] = useState<{ id?: number, data?: any } | null>(null);

  const handleLogout = () => {
    setAuthData(null);
    setActiveCard(null);
  };

  return (
    <AnimatePresence mode="wait">
      {!authData ? (
        <motion.div
          key="login"
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <LoginPage onLogin={(userId, email) => setAuthData({ userId, email })} />
        </motion.div>
      ) : activeCard ? (
        <motion.div
          key="app"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-screen"
        >
          <App
            userId={authData.userId}
            email={authData.email}
            cardId={activeCard.id}
            initialData={activeCard.data}
            onClose={() => setActiveCard(null)}
          />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Dashboard
            userId={authData.userId}
            email={authData.email}
            onOpenCard={(id, data) => setActiveCard({ id, data })}
            onLogout={handleLogout}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="154529877188-mol3kbt3lf58s3nbpt3m5u0msc4aajgr.apps.googleusercontent.com">
      <Root />
    </GoogleOAuthProvider>
  </StrictMode>,
);
