import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Home.module.css';
import Hero3D from '../components/Hero3D/Hero3D';
import { ArrowRight, Calendar, Users, Sparkles, Target, Zap, Heart } from 'lucide-react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div 
      className={styles.homeContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      
      {/* --- Hero Section --- */}
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroText}
          variants={itemVariants}
        >
          <motion.div
            className={styles.floatingElements}
            animate={floatingAnimation}
          >
            <Sparkles className={styles.sparkle1} size={24} />
            <Sparkles className={styles.sparkle2} size={20} />
          </motion.div>
          
          <h1 className={styles.headline}>
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              ECHO: Knowledge,
            </motion.span>
            <br />
            <motion.span 
              className={styles.gradientText}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Amplified.
            </motion.span>
          </h1>
          
          <motion.p 
            className={styles.subHeadline}
            variants={itemVariants}
          >
            We are students from Srinivas Institute of Technology
            <br />
            aiming to share knowledge and technology.
          </motion.p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/join" className={styles.ctaButton}>
              <Zap size={20} />
              Join the Movement
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={styles.heroVisual}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Hero3D />
        </motion.div>
      </section>

      {/* --- Who We Are Section --- */}
      <motion.section 
        className={styles.whoWeAre}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.whoWeAreContent}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            A Hub for <span className={styles.gradientText}>Innovators</span>
          </motion.h2>
          
          <motion.p 
            className={styles.sectionText}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ECHO is more than just a club; it's a community. We are a passionate
            group of students dedicated to exploring the frontiers of
            technology, from AI and web development to cloud computing and
            beyond. We believe in collaborative learning and building projects
            that make an impact.
          </motion.p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/about" className={styles.secondaryButton}>
              Learn More About Us 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Upcoming Events Section --- */}
      <motion.section 
        className={styles.upcomingEvents}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Upcoming <span className={styles.gradientText}>Events</span>
        </motion.h2>
        
        <div className={styles.eventGrid}>
          <motion.div 
            className={styles.eventCard}
            whileHover={{ 
              scale: 1.05,
              rotateY: 10
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className={styles.eventIcon}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Calendar size={32} />
            </motion.div>
            <h3>Association Inauguration</h3>
            <p>New Office Bearers</p>
            <motion.span 
              className={styles.eventDate}
              animate={{ 
                color: ['#00d4ff', '#ff6b6b', '#00d4ff']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Nov 8, 2025
            </motion.span>
          </motion.div>

          {/* Additional event cards can be added here */}
        </div>
      </motion.section>

    </motion.div>
  );
};

export default Home;