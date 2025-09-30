import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import './SocialMedia.scss';

const SocialMedia = () => {
  const socialLinks = [
    {
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/Gninema-silue',
      label: 'LinkedIn',
      color: '#0077B5',
    },
    {
      icon: <FaGithub />,
      url: 'https://github.com/gninho-silue',
      label: 'GitHub',
      color: '#333',
    },
    {
      icon: <FaInstagram />,
      url: 'https://www.instagram.com/gninhosilue',
      label: 'Instagram',
      color: '#E4405F',
    },
  ];

  return (
    <div className="app__social">
      {socialLinks.map((social, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.2, y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            style={{ '--hover-color': social.color }}
          >

            {social.icon}
            <span className="tooltip">{social.label}</span>
          </a>
        </motion.div>
      ))}
    </div>
  );
};

export default SocialMedia;