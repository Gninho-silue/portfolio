import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiCode, HiLightningBolt, HiHeart } from 'react-icons/hi';
import { urlFor, client } from '../../client';
import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';

const About = () => {
  const [about, setAbout] = useState([]);
  const [activeTab, setActiveTab] = useState('services');

  useEffect(() => {
    const query = '*[_type == "about"]';
    client.fetch(query).then((data) => setAbout(data));
  }, []);

  const stats = [
    { icon: <HiCode />, value: '50+', label: 'Projets Complétés' },
    { icon: <HiLightningBolt />, value: '3+', label: 'Années d\'expérience' },
    { icon: <HiAcademicCap />, value: '15+', label: 'Technologies' },
    { icon: <HiHeart />, value: '100%', label: 'Passion' },
  ];

  const tabs = [
    { id: 'services', label: 'Services' },
    { id: 'bio', label: 'À propos' },
    { id: 'interests', label: 'Centres d\'intérêt' },
  ];

  return (
    <>
      <h2 className="head-text">
        Je sais que de <span>Bonnes Applications</span>
        <br />
        Signifient de <span>Bonnes Affaires</span>
      </h2>

      {/* Section Bio principale */}
      <motion.div
        className="about-hero"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="about-hero-content">
          <p className="about-description">
            Étudiant en dernière année de <strong>Génie Informatique</strong> (spécialisation Logiciel),
            passionné par le développement d'applications web modernes et performantes.
            Je transforme des idées en solutions numériques élégantes et efficaces.
          </p>
        </div>
      </motion.div>

      {/* Statistiques */}
      <div className="about-stats">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.05 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-label">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="about-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services Cards */}
      {activeTab === 'services' && (
        <motion.div
          className="app__profiles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {about.map((item, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1], y: [50, 0] }}
              whileHover={{ y: -15, scale: 1.05 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="app__profile-item"
              key={item.title + index}
            >
              <div className="profile-img-wrapper">
                <img src={urlFor(item.imageUrl)} alt={item.title} />
              </div>
              <h2 className="bold-text">{item.title}</h2>
              <p className="p-text">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Bio détaillée */}
      {activeTab === 'bio' && (
        <motion.div
          className="about-bio-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bio-card">
            <h3>Mon Parcours</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>2025 - Aujourd'hui</h4>
                  <p>Ingénieur Génie Informatique (Logiciel)</p>
                  <span>Dernier semestre</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>2023 - 2025</h4>
                  <p>Cycle Ingénieur - Génie Informatique (ENSAH)</p>
                  <span>Spécialisation développement logiciel</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>2021 - 2023</h4>
                  <p>Classes Préparatoires MPSI/MP (ESTEM CASABLANCA)</p>
                  <span>Fondations en informatique et mathématiques</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Centres d'intérêt */}
      {activeTab === 'interests' && (
        <motion.div
          className="about-interests"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="interests-grid">
            {[
              { icon: '💻', title: 'Programmation', desc: 'Toujours à apprendre de nouvelles technos' },
              { icon: '🚀', title: 'Innovation', desc: 'Créer des solutions qui comptent' },
              { icon: '🎨', title: 'Design UI/UX', desc: 'L\'esthétique rencontre la fonctionnalité' },
              { icon: '📚', title: 'Apprentissage', desc: 'Curieux et en évolution constante' },
            ].map((interest, index) => (
              <motion.div
                key={index}
                className="interest-card"
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <span className="interest-icon">{interest.icon}</span>
                <h4>{interest.title}</h4>
                <p>{interest.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AppWrap(MotionWrap(About, 'app__about'), 'about', 'app__whitebg');