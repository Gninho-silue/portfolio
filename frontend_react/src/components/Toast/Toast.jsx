import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiInformationCircle } from 'react-icons/hi';
import './Toast.scss';

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  const icons = {
    success: <HiCheckCircle />,
    error: <HiXCircle />,
    info: <HiInformationCircle />
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`toast toast-${type}`}
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          transition={{ duration: 0.3 }}
        >
          <div className="toast-icon">
            {icons[type]}
          </div>
          <p className="toast-message">{message}</p>
          <button className="toast-close" onClick={onClose}>×</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;