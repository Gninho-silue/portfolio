import  { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa';
import { AppWrap, MotionWrap } from '../../wrapper';
import { Toast } from '../../components';
import './Footer.scss';

const Spinner = () => {
  return (
    <div className="inline-flex items-center">
      <svg
        aria-hidden="true"
        role="status"
        className="inline w-4 h-4 me-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
    
      </svg>
      Envoi en cours...
    </div>
  );
};

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  const { name, email, message } = formData;

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
    setTimeout(() => {
      setToast({ isVisible: false, message: '', type: 'success' });
    }, 5000);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      const data = await response.json();

      if (data.success) {
        setLoading(false);
        setIsFormSubmitted(true);
        showToast('Message envoyé avec succès ! 🎉', 'success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setLoading(false);
        showToast(data.error || 'Une erreur est survenue', 'error');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setLoading(false);
      showToast("Impossible d'envoyer le message. Vérifiez votre connexion.", 'error');
    }
  };

  const contactMethods = [
    {
      icon: <HiMail />,
      label: 'Email',
      value: 'gninhosilue@gmail.com',
      link: 'mailto:gninninmaguignonsilue@gmail.com',
      color: '#6366f1',
    },
    {
      icon: <FaWhatsapp />,
      label: 'WhatsApp',
      value: '+212 776 323 683',
      link: 'https://wa.me/212776323683',
      color: '#25D366',
    },
    {
      icon: <HiLocationMarker />,
      label: 'Localisation',
      value: 'Maroc',
      link: null,
      color: '#ef4444',
    },
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, link: 'https://linkedin.com/in/gninema-silue', label: 'LinkedIn' },
    { icon: <FaGithub />, link: 'https://github.com/Gninho-silue', label: 'GitHub' },
  ];

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      <h2 className="head-text">
        Travaillons <span>Ensemble</span>
      </h2>

      <p className="footer-subtitle">
        Vous avez un projet en tête ? Discutons-en autour d'un café ☕
      </p>

      {/* Contact Cards */}
      <div className="app__footer-cards">
        {contactMethods.map((method, index) => (
          <motion.div
            key={index}
            className="app__footer-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.05 }}
          >
            <div className="card-icon" style={{ background: method.color }}>
              {method.icon}
            </div>
            <div className="card-content">
              <h4>{method.label}</h4>
              {method.link ? (
                <a href={method.link} target="_blank" rel="noreferrer">
                  {method.value}
                </a>
              ) : (
                <p>{method.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Form or Success Message */}
      {!isFormSubmitted ? (
        <motion.div
          className="app__footer-form app__flex"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Nom complet</label>
              <input
                id="name"
                className="form-input"
                type="text"
                placeholder="Votre nom"
                name="name"
                value={name}
                onChange={handleChangeInput}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Adresse email</label>
              <input
                id="email"
                className="form-input"
                type="email"
                placeholder="votre.email@exemple.com"
                name="email"
                value={email}
                onChange={handleChangeInput}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Votre message</label>
            <textarea
              id="message"
              className="form-input"
              placeholder="Parlez-moi de votre projet..."
              name="message"
              value={message}
              onChange={handleChangeInput}
              rows="6"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? <Spinner /> : 'Envoyer le message'}
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="success-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="success-icon">✓</div>
          <h3 className="head-text">Message envoyé avec succès ! 🎉</h3>
          <p>Merci de m'avoir contacté. Je vous répondrai dans les plus brefs délais.</p>
          <button className="reset-btn" onClick={() => setIsFormSubmitted(false)}>
            Envoyer un autre message
          </button>
        </motion.div>
      )}

      {/* Social Links */}
      <div className="footer-social">
        <p>Retrouvez-moi aussi sur :</p>
        <div className="social-links">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              className="social-link"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>© 2025 Silue. Tous droits réservés.</p>
        <p>Fait avec ❤️ et React</p>
      </div>
    </>
  );
};

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__whitebg');