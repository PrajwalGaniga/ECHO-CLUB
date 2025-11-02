import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import styles from './About.module.css';
import {
  Eye, Target, Crown, Settings, Laptop, Paintbrush, Megaphone,
  BadgeCheck, Users, Trophy, Medal, Rocket, Presentation,
  Zap, Network, PartyPopper, Instagram, Youtube, Globe,
  Sparkles, Code2, Heart, TrendingUp, Users2, Lightbulb,
  ArrowRight, Star, Calendar, Award
} from 'lucide-react';

const About = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 7);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const features = [
    { icon: Trophy, title: "Competition Reimbursement", desc: "Win external competitions → Get 50% of your registration fee reimbursed!" },
    { icon: Medal, title: "Skill Badges", desc: "Collect badges for hackathons & workshops." },
    { icon: Rocket, title: "Project Incubation", desc: "Club mentors help build your ideas." },
    { icon: Presentation, title: "Workshop Teaching", desc: "Conduct a workshop & get special recognition." },
    { icon: Zap, title: "Hackathon Booster Pack", desc: "Prep before the real battle." },
    { icon: Network, title: "Alumni Connect", desc: "Learn from seniors & industry experts." },
    { icon: PartyPopper, title: "ECHO Fest", desc: "Annual showcase of projects, talent & culture." }
  ];

  return (
    <motion.div 
      className={styles.aboutPage}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      
      {/* --- Animated Background Elements --- */}
      <div className={styles.backgroundElements}>
        <motion.div className={styles.floatingOrb1} animate={floatingAnimation} />
        <motion.div className={styles.floatingOrb2} animate={{ ...floatingAnimation, transition: { duration: 8 } }} />
        <motion.div className={styles.floatingOrb3} animate={{ ...floatingAnimation, transition: { duration: 7 } }} />
      </div>

      {/* --- Page Header --- */}
      <motion.header 
        className={styles.pageHeader}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.headerContent}>
          <motion.div
            className={styles.titleContainer}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h1 className={styles.pageTitle}>
              About <span className={styles.gradientText}>ECHO</span>
            </h1>
            <motion.div
              className={styles.sparkleContainer}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className={styles.sparkle} size={32} />
            </motion.div>
          </motion.div>
          
          <motion.p 
            className={styles.pageSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            The ultimate student-driven club of CSD + ISE
          </motion.p>
          
          <motion.div 
            className={styles.codeSnippet}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>echo_manifesto.js</span>
            </div>
            <pre>
              <code>
                <span className={styles.codeComment}>// ECHO Club Manifesto</span><br />
                <span className={styles.codeKeyword}>while</span>
                (<span className={styles.codeBoolean}>true</span>) {'{'}<br />
                &nbsp;&nbsp;<span className={styles.codeFunction}>code</span>(); 
                <span className={styles.codeComment}> // Write clean code</span><br />
                &nbsp;&nbsp;<span className={styles.codeFunction}>innovate</span>(); 
                <span className={styles.codeComment}> // Build new things</span><br />
                &nbsp;&nbsp;<span className={styles.codeFunction}>makeLearningFun</span>(); 
                <span className={styles.codeComment}> // Always</span><br />
                {'}'}
              </code>
            </pre>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowRight size={20} />
        </motion.div>
      </motion.header>

      {/* --- Introduction Section --- */}
      <motion.section 
        className={styles.section}
        variants={itemVariants}
      >
        <div className={styles.introContent}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Welcome to <span className={styles.gradientText}>ECHO</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            ECHO is a vibrant, student-led club for CSD and ISE students that
            fosters collaboration, creativity, and technical growth. The club
            promotes sharing knowledge and innovation across computing, hacking,
            design, AI/ML, and culture. Our goal is to create an engaging
            environment where ideas resonate and expand widely, impacting both
            campus and beyond.
          </motion.p>
          <motion.div 
            className={styles.techTags}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {['AI/ML', 'Web Dev', 'Cybersecurity', 'Hackathons', 'UI/UX Design', 'Cultural Events'].map((tech, index) => (
              <motion.span
                key={tech}
                className={styles.techTag}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* --- Vision & Mission --- */}
      <motion.section 
        className={`${styles.section} ${styles.bgSecondary}`}
        variants={itemVariants}
      >
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Vision & <span className={styles.gradientText}>Mission</span>
        </motion.h2>
        <div className={styles.cardGrid}>
          <motion.div 
            className={styles.card}
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.categoryHeader}>
              <motion.div 
                className={styles.categoryIcon}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Eye />
              </motion.div>
              <h3 className={styles.categoryTitle}>Vision</h3>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              To be a leading community empowering students through technology,
              creativity, and culture, where every idea finds room to grow
              and inspire.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className={styles.card}
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.categoryHeader}>
              <motion.div 
                className={styles.categoryIcon}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                <Target />
              </motion.div>
              <h3 className={styles.categoryTitle}>Mission</h3>
            </div>
            <ul className={styles.roleList}>
              {[
                "Facilitate skill development through projects and workshops.",
                "Encourage creative expression alongside technical expertise.",
                "Build leadership, communication, and industry connections."
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <TrendingUp size={16} />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Organization Structure --- */}
      <motion.section 
        className={styles.section}
        variants={itemVariants}
      >
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Organization <span className={styles.gradientText}>Structure</span>
        </motion.h2>
        <div className={styles.cardGrid}>
          {[
            { icon: Crown, title: "Leadership", items: [
              "President (Core Lead) – Captain of the ship 🚢",
              "Vice President (Core Co-Lead) – Ensures smooth sailing ⛵"
            ]},
            { icon: Settings, title: "Operations & Management", items: [
              "General Secretary – Documentation, scheduling 📑",
              "Joint Secretary – Assists secretary, keeps track 🧭",
              "Treasurer – Manages money, sponsorships 💰",
              "Finance Co-Lead – Assists treasurer 🧾",
              "Speaker – Active speaker for all events"
            ]},
            { icon: Laptop, title: "Technical Divisions", items: [
              "Website & Tech Infrastructure – Our web wizards 🌐",
              "AI / ML / GenAI Division – Data, models, and magic 🤖",
              "Hackathon & Project Division – Coding marathons 🏆"
            ]},
            { icon: Paintbrush, title: "Creative & Media", items: [
              "Design & Graphics Division – Posters, branding ✨",
              "Social Media & Content Division – Reels 📸, Edits 🎥",
              "Cultural & Event Division – Fun, fests, and vibes 🎶"
            ]},
            { icon: Megaphone, title: "Outreach & Growth", items: [
              "Workshops & Learning Division – Organizes tech sessions 📚",
              "PR & Outreach Division – Collabs, alumni, industry 🤝"
            ]}
          ].map((category, index) => (
            <motion.div 
              key={category.title}
              className={styles.card}
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.categoryHeader}>
                <motion.div 
                  className={styles.categoryIcon}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <category.icon />
                </motion.div>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
              </div>
              <ul className={styles.roleList}>
                {category.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: itemIndex * 0.1 + index * 0.1 }}
                  >
                    <Star size={14} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* --- Member Benefits --- */}
      <motion.section 
        className={`${styles.section} ${styles.bgSecondary}`}
        variants={itemVariants}
      >
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Member <span className={styles.gradientText}>Benefits</span>
        </motion.h2>
        <div className={`${styles.cardGrid} ${styles.twoColGrid}`}>
          <motion.div 
            className={`${styles.card} ${styles.infoCard} ${styles.premiumCard}`}
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className={`${styles.infoIcon} ${styles.iconFeature}`}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <BadgeCheck />
            </motion.div>
            <h3>Core Members</h3>
            <p>Leadership certificates, priority at events, exclusive projects, internship perks.</p>
            <motion.div 
              className={styles.benefitBadge}
              whileHover={{ scale: 1.1 }}
            >
              <Award size={20} />
              Premium Access
            </motion.div>
          </motion.div>
          
          <motion.div 
            className={`${styles.card} ${styles.infoCard}`}
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className={`${styles.infoIcon} ${styles.iconFeature}`}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <Users2 />
            </motion.div>
            <h3>General Members</h3>
            <p>Free/discounted workshops, hackathons, peer-to-peer learning, and fun community!</p>
            <motion.div 
              className={styles.benefitBadge}
              whileHover={{ scale: 1.1 }}
            >
              <Heart size={20} />
              Community Access
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Special Features --- */}
      <motion.section 
        className={styles.section}
        variants={itemVariants}
      >
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Special <span className={styles.gradientText}>Features</span>
        </motion.h2>
        
        {/* Feature Carousel */}
<div className={styles.featureCarousel}>
  <AnimatePresence mode="wait">
    <motion.div
      key={activeFeature}
      className={styles.activeFeature}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.activeFeatureIcon}>
        {React.createElement(features[activeFeature].icon, { size: 48 })}
      </div>
      <h3>{features[activeFeature].title}</h3>
      <p>{features[activeFeature].desc}</p>
    </motion.div>
  </AnimatePresence>
  
  <div className={styles.featureDots}>
    {features.map((_, index) => (
      <button
        key={index}
        className={`${styles.featureDot} ${index === activeFeature ? styles.active : ''}`}
        onClick={() => setActiveFeature(index)}
      />
    ))}
  </div>
</div>

        <div className={styles.cardGrid}>
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              className={`${styles.card} ${styles.infoCard} ${index === activeFeature ? styles.activeFeatureCard : ''}`}
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setActiveFeature(index)}
            >
              <motion.div 
                className={`${styles.infoIcon} ${styles.iconFeature}`}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon />
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* --- Financial Policy --- */}
      <motion.section 
        className={`${styles.section} ${styles.bgSecondary}`}
        variants={itemVariants}
      >
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Financial <span className={styles.gradientText}>Policy</span>
        </motion.h2>
        <div className={styles.introContent}>
          <motion.div 
            className={styles.policyCards}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div 
              className={styles.policyCard}
              whileHover={{ scale: 1.05 }}
            >
              <Calendar size={24} />
              <p>No entry fees; workshop fees post-completion (₹1-₹50, participant benefit-based).</p>
            </motion.div>
            
            <motion.div 
              className={styles.policyCard}
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp size={24} />
              <p>For club services to outsiders: 30% fees to club fund, 70% to service providers.</p>
            </motion.div>
            
            <motion.div 
              className={styles.policyCard}
              whileHover={{ scale: 1.05 }}
            >
              <Lightbulb size={24} />
              <p>Funds spent on events, infrastructure, sponsorships, and community growth.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Media & Documentation --- */}
      <motion.section 
        className={styles.section}
        variants={itemVariants}
      >
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Media & <span className={styles.gradientText}>Documentation</span>
        </motion.h2>
        <div className={`${styles.cardGrid} ${styles.threeColGrid}`}>
          {[
            { icon: Instagram, title: "Instagram", desc: "Reels, stories, posters.", color: "#E1306C" },
            { icon: Youtube, title: "YouTube", desc: "Workshop uploads, highlights.", color: "#FF0000" },
            { icon: Globe, title: "Website", desc: "Blogs, event reports, announcements.", color: "#00BFFF" }
          ].map((platform, index) => (
            <motion.div 
              key={platform.title}
              className={`${styles.card} ${styles.infoCard} ${styles.mediaCard}`}
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ '--platform-color': platform.color }}
            >
              <motion.div 
                className={styles.infoIcon}
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.3 }}
              >
                <platform.icon />
              </motion.div>
              <h3>{platform.title}</h3>
              <p>{platform.desc}</p>
              <motion.button 
                className={styles.followButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Follow Us
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* --- CTA Section --- */}
      <motion.section 
        className={`${styles.section} ${styles.ctaSection}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className={styles.ctaContent}
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h2>Ready to Join the Echo?</h2>
          <p>Become part of our growing community of innovators and creators</p>
          <motion.button 
            className={styles.ctaButton}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap size={20} />
            Join ECHO Now
          </motion.button>
        </motion.div>
      </motion.section>

    </motion.div>
  );
};

export default About;
