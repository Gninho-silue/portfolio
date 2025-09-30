import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Skills.scss';

const Skills = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  
  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperience(data);
    });
    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        Compétences & <span>Expériences</span>
      </h2>

      <div className="app__skills-container">
        {/* Grouper les skills par catégorie */}
        {Object.entries(
          skills.reduce((acc, skill) => {
            const cat = skill.category || 'Autre';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(skill);
            return acc;
          }, {})
        ).map(([category, skillsInCat]) => (
          <div key={category} className="skills-category-section">
            <h3 className="skills-category-title">{category}</h3>
            <motion.div className='app__skills-list'>
              {skillsInCat.map((skill, index) => (
                <motion.div
                  whileInView={{ opacity: [0, 1], y: [50, 0] }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='app__skills-item app__flex' 
                  key={skill.name + index}
                  whileHover={{ y: -10, scale: 1.05 }}
                > 
                  <div className="app__flex skill-icon" style={{ backgroundColor: skill.bgColor }}>
                    <img src={urlFor(skill.icon)} alt={skill.name} />
                  </div>
                  <p className="p-text">{skill.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}

        <motion.div className='app__skills-exp'>
          <h3 className="exp-title">Expériences Professionnelles</h3>
          {experience?.map((exp, index) => (
            <motion.div 
              className='app__skills-exp-item' 
              key={exp.year + index}
              whileInView={{ opacity: [0, 1], x: [-50, 0] }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="app__skills-exp-year">
                <p className='bold-text'>{exp.year}</p>
              </div>
              <motion.div className='app__skills-exp-works'>
                {exp.works.map((work) => (
                  <React.Fragment key={work.name}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className='app__skills-exp-work' 
                      data-tip
                      data-tooltip-id={work.name} 
                      data-tooltip-content={work.desc}
                      whileHover={{ x: 10 }}
                    >
                      <h4 className='bold-text'>{work.name}</h4>
                      <p className='p-text'>{work.company}</p>
                    </motion.div>
                    <Tooltip id={work.name} className="skills-tooltip" />
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>           
          ))}
        </motion.div>         
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  "app__whitebg"
);