import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './NavigationDots.scss';

const NavigationDots = ({ active }) => {
  const [activeSection, setActiveSection] = useState(active || 'home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'work', 'skills', 'testimonial', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'work', label: 'Projets' },
    { id: 'skills', label: 'Compétences' },
    { id: 'testimonial', label: 'Témoignages' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="app__navigation">
      {sections.map((section, index) => (
        <motion.a
          href={`#${section.id}`}
          key={section.id + index}
          className={`app__navigation-dot ${activeSection === section.id ? 'active' : ''}`}
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <span className="tooltip">{section.label}</span>
        </motion.a>
      ))}
    </div>
  );
};

export default NavigationDots;