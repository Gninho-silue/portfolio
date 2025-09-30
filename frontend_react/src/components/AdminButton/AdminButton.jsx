import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCog } from 'react-icons/hi';
import './AdminButton.scss';

const AdminButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  // Combinaison secrète : Ctrl + Shift + A
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsVisible((prev) => !prev);
      }

      // Alternative : Triple clic sur le logo
      // Ou séquence de touches : 'admin'
      setKeySequence((prev) => [...prev.slice(-4), e.key]);
    };

    // Vérifier la séquence 'admin'
    if (keySequence.join('').toLowerCase() === 'admin') {
      setIsVisible((prev) => !prev);
      setKeySequence([]);
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence]);

  const handleAdminClick = () => {
    window.open(process.env.REACT_APP_SANITY_STUDIO_URL, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="admin-button"
          onClick={handleAdminClick}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          title="Accès Sanity Studio (Ctrl+Shift+A pour masquer)"
        >
          <HiCog />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default AdminButton;