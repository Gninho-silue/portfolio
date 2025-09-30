import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Testimonial.scss';

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [direction, setDirection] = useState(0);

  const handleClick = (newIndex) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <>
      <h2 className="head-text">
        Ce que disent <span>mes clients</span>
      </h2>

      {testimonials.length > 0 && (
        <>
          <div className="testimonial-container">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="app__testimonial-item app__flex"
              >
                <div className="testimonial-quote-icon">"</div>
                
                <div className="testimonial-header">
                  <img
                    src={urlFor(testimonials[currentIndex].imageUrl)}
                    alt={testimonials[currentIndex].name}
                  />
                  <div className="testimonial-author">
                    <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                    <h5 className="p-text">{testimonials[currentIndex].company}</h5>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <HiStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="app__testimonial-content">
                  <p className="testimonial-text">{testimonials[currentIndex].feedback}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="app__testimonial-btns app__flex">
              <motion.div
                className="app__flex nav-btn"
                onClick={() =>
                  handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
                }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiChevronLeft />
              </motion.div>

              <div className="testimonial-indicators">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => handleClick(index)}
                  />
                ))}
              </div>

              <motion.div
                className="app__flex nav-btn"
                onClick={() =>
                  handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
                }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiChevronRight />
              </motion.div>
            </div>
          </div>
        </>
      )}

      {brands.length > 0 && (
        <div className="brands-section">
          <h3 className="brands-title">Ils m'ont fait confiance</h3>
          <div className="app__testimonial-brands app__flex">
            {brands.map((brand) => (
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ duration: 0.5, type: 'tween' }}
                key={brand._id}
              >
                <img src={urlFor(brand.imageUrl)} alt={brand.name} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonial'),
  'testimonial',
  'app__primarybg'
);