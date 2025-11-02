import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './JoinUs.module.css';
import { 
  MessageSquare, 
  Mail, 
  ArrowRight, 
  Zap, 
  Users, 
  Award, 
  Rocket, 
  Sparkles,
  Star,
  Heart,
  Target,
  Calendar,
  BookOpen,
  TrendingUp,
  Shield,
  Gem
} from 'lucide-react';

const JoinUs = () => {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [isHovered, setIsHovered] = useState(null);

  const whatsappNumber = '919110687983';
  const emailAddress = 'prajwalganiga06@gmail.com';

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20ECHO%20Club!%20I'm%20interested%20in%20joining.`;
  const emailLink = `mailto:${emailAddress}?subject=Inquiry%20about%20joining%20ECHO%20Club`;

  const benefits = [
    {
      icon: Rocket,
      title: "Build Projects",
      description: "Transform ideas into reality. Collaborate on innovative projects and build an impressive portfolio.",
      features: ["Real-world projects", "Team collaboration", "Portfolio building"]
    },
    {
      icon: BookOpen,
      title: "Learn Skills",
      description: "Master cutting-edge technologies through exclusive workshops and hands-on sessions.",
      features: ["AI/ML Workshops", "Web Development", "UI/UX Design"]
    },
    {
      icon: Users,
      title: "Network & Connect",
      description: "Build valuable connections with peers, seniors, and industry professionals.",
      features: ["Industry Experts", "Alumni Network", "Peer Learning"]
    },
    {
      icon: Award,
      title: "Earn Recognition",
      description: "Get certified for your contributions and stand out with official recognition.",
      features: ["Certificates", "Skill Badges", "Leadership Roles"]
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Boost your career with internship opportunities and industry exposure.",
      features: ["Internship Support", "Resume Building", "Interview Prep"]
    },
    {
      icon: Heart,
      title: "Community Spirit",
      description: "Join a supportive community that celebrates creativity and innovation.",
      features: ["Cultural Events", "Team Building", "Fun Activities"]
    }
  ];

  const stats = [
    { number: "50+", label: "Active Members" },
    { number: "15+", label: "Workshops" },
    { number: "10+", label: "Projects" },
    { number: "5+", label: "Hackathons" }
  ];

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

  return (
    <motion.div 
      className={styles.joinUsPage}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <div className={styles.backgroundElements}>
        <motion.div 
          className={styles.floatingOrb1}
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={styles.floatingOrb2}
          animate={{ 
            y: [10, -10, 10],
            x: [15, -15, 15]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={styles.floatingOrb3}
          animate={{ 
            y: [-15, 15, -15],
            x: [-20, 20, -20]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header Section */}
      <motion.header className={styles.header} variants={itemVariants}>
        <motion.div
          className={styles.titleContainer}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h1 className={styles.title}>
            Join the <span className={styles.gradientText}>ECHO</span> Community
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
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Become part of the most vibrant tech and design community at Srinivas Institute of Technology
        </motion.p>

        {/* Stats Overview */}
        <motion.div 
          className={styles.statsOverview}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className={styles.statItem}
              whileHover={{ scale: 1.1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.header>

      {/* Why Join Section */}
      <motion.section className={styles.whyJoin} variants={itemVariants}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Why Join <span className={styles.gradientText}>ECHO?</span>
        </motion.h2>
        
        <motion.p 
          className={styles.sectionSubtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Discover endless opportunities for growth, learning, and innovation
        </motion.p>

        {/* Benefits Grid */}
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className={styles.benefitCard}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setIsHovered(index)}
              onHoverEnd={() => setIsHovered(null)}
            >
              <motion.div 
                className={styles.benefitIcon}
                animate={{ 
                  rotate: isHovered === index ? 360 : 0,
                  scale: isHovered === index ? 1.2 : 1
                }}
                transition={{ duration: 0.6 }}
              >
                <benefit.icon size={32} />
              </motion.div>
              
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
              
              <div className={styles.features}>
                {benefit.features.map((feature, featureIndex) => (
                  <motion.span 
                    key={feature}
                    className={styles.featureTag}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: featureIndex * 0.1 + index * 0.1 }}
                  >
                    <Star size={12} />
                    {feature}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Membership Tiers */}
      <motion.section 
        className={styles.membershipTiers}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Membership <span className={styles.gradientText}>Tiers</span>
        </motion.h2>

        <div className={styles.tiersGrid}>
          {/* General Member */}
          <motion.div 
            className={styles.tierCard}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className={styles.tierHeader}>
              <Users className={styles.tierIcon} />
              <h3>General Member</h3>
              <div className={styles.tierPrice}>Free</div>
            </div>
            <ul className={styles.tierFeatures}>
              <li>Access to all workshops</li>
              <li>Participate in events</li>
              <li>Club community access</li>
              <li>Learning resources</li>
              <li>Networking opportunities</li>
            </ul>
            <motion.button 
              className={styles.tierButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join as Member
            </motion.button>
          </motion.div>

          {/* Core Member */}
          <motion.div 
            className={`${styles.tierCard} ${styles.featured}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className={styles.featuredBadge}>
              <Gem size={16} />
              Most Popular
            </div>
            <div className={styles.tierHeader}>
              <Shield className={styles.tierIcon} />
              <h3>Core Member</h3>
              <div className={styles.tierPrice}>By Selection</div>
            </div>
            <ul className={styles.tierFeatures}>
              <li>All General Member benefits</li>
              <li>Leadership opportunities</li>
              <li>Exclusive projects</li>
              <li>Priority registration</li>
              <li>Certificates & recognition</li>
              <li>Mentorship roles</li>
            </ul>
            <motion.button 
              className={styles.tierButtonFeatured}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply for Core Team
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Get in Touch Section */}
      <motion.section 
        className={styles.getInTouch}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to <span className={styles.gradientText}>Join?</span>
        </motion.h2>
        
        <motion.p 
          className={styles.sectionSubtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Get in touch with us today and start your journey with ECHO
        </motion.p>

        <div className={styles.contactGrid}>
          {/* WhatsApp Card */}
          <motion.a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.contactCard} ${styles.whatsapp}`}
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className={styles.contactIcon}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <MessageSquare size={48} />
            </motion.div>
            <div className={styles.contactInfo}>
              <h3>Chat on WhatsApp</h3>
              <p>Quick responses and instant support</p>
              <motion.div 
                className={styles.contactHint}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Click to start conversation
              </motion.div>
            </div>
            <motion.div 
              className={styles.arrowContainer}
              whileHover={{ x: 10 }}
            >
              <ArrowRight className={styles.arrowIcon} size={24} />
            </motion.div>
            
            {/* WhatsApp Floating Animation */}
            <motion.div 
              className={styles.floatingAnimation}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageSquare size={20} />
            </motion.div>
          </motion.a>

          {/* Email Card */}
          <motion.a 
            href={emailLink} 
            className={`${styles.contactCard} ${styles.email}`}
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className={styles.contactIcon}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <Mail size={48} />
            </motion.div>
            <div className={styles.contactInfo}>
              <h3>Send us an Email</h3>
              <p className={styles.emailAddress}>{emailAddress}</p>
              <motion.div 
                className={styles.contactHint}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                Detailed inquiries welcome
              </motion.div>
            </div>
            <motion.div 
              className={styles.arrowContainer}
              whileHover={{ x: 10 }}
            >
              <ArrowRight className={styles.arrowIcon} size={24} />
            </motion.div>
            
            {/* Email Floating Animation */}
            <motion.div 
              className={styles.floatingAnimation}
              animate={{ 
                y: [-10, 10, -10],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Mail size={16} />
            </motion.div>
          </motion.a>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className={styles.ctaSection}
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
          <Zap className={styles.ctaIcon} size={48} />
          <h2>Don't Wait - Join ECHO Today!</h2>
          <p>Be part of something extraordinary. Your journey in tech and innovation starts here.</p>
          <motion.div 
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButtonPrimary}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(37, 211, 102, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare size={20} />
              Message on WhatsApp
            </motion.a>
            <motion.a 
              href={emailLink}
              className={styles.ctaButtonSecondary}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              Send Email
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Floating Action Button */}
      <motion.div 
        className={styles.floatingAction}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.fab}
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: [
              "0 4px 20px rgba(37, 211, 102, 0.4)",
              "0 8px 30px rgba(37, 211, 102, 0.6)",
              "0 4px 20px rgba(37, 211, 102, 0.4)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MessageSquare size={24} />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default JoinUs;