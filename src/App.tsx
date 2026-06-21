import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('vishnuvardhanrao1919@gmail.com');

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen text-slate-900 bg-slate-900" id="app-root">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen"
            id="login-view-wrapper"
          >
            <Login onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="min-h-screen"
            id="dashboard-view-wrapper"
          >
            <Dashboard userEmail={userEmail} onSignOut={handleSignOut} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
