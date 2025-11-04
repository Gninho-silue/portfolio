import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiDownload } from 'react-icons/hi';
import './CTA.scss';

const CTA = () => {
  const handleDownloadCV = () => {
    
    const cvUrl = '/Mon_cv.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Curriculum Vitae - Silue.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContact = () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="cta-section">
      <div className="cta-container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="cta-title">
            Prêt à donner vie à votre <span className="gradient-text">projet</span> ?
          </h2>
          <p className="cta-description">
            Travaillons ensemble pour créer quelque chose d'extraordinaire. 
            Je suis disponible pour des missions freelance, stages ou CDI.
          </p>

          <div className="cta-buttons">
            <motion.button
              className="cta-btn primary"
              onClick={handleContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Démarrons un projet
              <HiArrowRight />
            </motion.button>

            <motion.button
              className="cta-btn secondary"
              onClick={handleDownloadCV}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiDownload />
              Télécharger mon CV
            </motion.button>
          </div>

          <div className="cta-stats">
            <div className="stat">
              <h3>100%</h3>
              <p>Satisfaction client</p>
            </div>
            <div className="stat">
              <h3>48h</h3>
              <p>Temps de réponse</p>
            </div>
            <div className="stat">
              <h3>24/7</h3>
              <p>Support disponible</p>
            </div>
          </div>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="cta-bg-elements">
          <motion.div
            className="bg-circle circle-1"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="bg-circle circle-2"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CTA;