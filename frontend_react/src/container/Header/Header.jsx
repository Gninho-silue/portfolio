import React from 'react';
import './Header.scss';
import { motion } from 'framer-motion';
import { images } from '../../constants';
import { AppWrap } from '../../wrapper';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
}

const Header = () => {
  return (
    <div className='app__header app__flex'>
      {/* Gradient animé en arrière-plan */}
      <div className="gradient-bg">
        <div className="gradient-blob gradient-blob-1"></div>
        <div className="gradient-blob gradient-blob-2"></div>
        <div className="gradient-blob gradient-blob-3"></div>
      </div>

      <motion.div 
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='app__header-info'
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              👋
            </motion.span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Bonjour, Je suis</p>
              <h1 className="header-text gradient-text">Silue</h1>
            </div>
          </div>
          
          <div className="tag-cmp app__flex">
            <p className="p-text">Ingénieur Génie Informatique</p>
            <p className="p-text-sub">Spécialisation Logiciel</p>
          </div>
          
          <div className="header-stats">
            <div className="stat-item">
              <h3>5+</h3>
              <p>Projets</p>
            </div>
            <div className="stat-item">
              <h3>10+</h3>
              <p>Technologies</p>
            </div>
            <div className="stat-item">
              <h3>2+</h3>
              <p>Ans d'expérience</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.8, delayChildren: 0.5 }}
        className='app__header-img'
      >
        <motion.div
          className="profile-img-container"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img src={images.profile} alt="Profile" />
          <motion.img 
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            src={images.circle}
            alt='Profile_circle'
            className='overlay_circle'
          /> 
        </motion.div>
      </motion.div>

      <motion.div 
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className='app__header-circles'
      >
        {[
          { img: images.react, name: 'React' },
          { img: images.python, name: 'Python' },
          { img: images.javascript, name: 'JavaScript' }
        ].map((tech, index) => (
          <motion.div 
            className="circle-cmp app__flex" 
            key={tech.name}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <img src={tech.img} alt={tech.name} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default AppWrap(Header, 'home');