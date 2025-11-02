import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MemberCard.module.css';
import {
  Linkedin, Mail, Phone, Star, Award, Zap, Users,
  Calendar, BookOpen, Sparkles, Heart, Target
} from 'lucide-react';
import { defaultProfilePic } from '../../data/members';

const MemberCard = ({ member, coreInfo }) => {
  // Local defensive copies to avoid undefined access
  const name = member?.name || 'Member';
  const usn = member?.usn || '';
  const currentYear = member?.currentYear || '';
  const skills = Array.isArray(member?.skills) ? member.skills : [];
  const hobbies = Array.isArray(member?.hobbies) ? member.hobbies : [];
  const linkedin = member?.linkedin || '#';
  const email = member?.email || '';
  const phone = member?.phone || '';
  const profilePic = member?.profilePic || defaultProfilePic;

  const displayRole = coreInfo?.role || 'Member';
  const funFact = coreInfo?.funFact || null;

  const [currentSide, setCurrentSide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const calculateStars = () => {
    const totalActivities =
      (member?.eventsJoined || 0) +
      (member?.workshopsJoined || 0) +
      (member?.eventsConducted || 0) +
      (member?.workshopsConducted || 0);
    if (totalActivities >= 10) return 5;
    if (totalActivities >= 7) return 4;
    if (totalActivities >= 5) return 3;
    if (totalActivities >= 3) return 2;
    if (totalActivities >= 1) return 1;
    return 0;
  };

  const stars = calculateStars();

  const handleFlip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSide(prev => (prev + 1) % 4);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const cardVariants = {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 }
  };

  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${styles.star} ${i < count ? styles.filled : ''}`}
        fill={i < count ? 'currentColor' : 'none'}
      />
    ));

  const safePrimarySkill = skills[0] || 'technology';

  return (
    <div className={styles.cardContainer} onClick={handleFlip}>
      <div className={styles.cardInner}>
        {/* Note: mode removed to avoid blocking/unmount quirks */}
        <AnimatePresence>
          {/* Side 1: Profile Overview */}
          {currentSide === 0 && (
            <motion.div
              key="profile"
              className={`${styles.cardFace} ${styles.cardFront}`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6 }}
            >
              {coreInfo && <div className={styles.coreBadge}>Core</div>}

              <motion.img
                src={profilePic}
                alt={name}
                className={styles.profilePic}
                onError={(e) => { e.currentTarget.src = defaultProfilePic; }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />

              <h3 className={styles.memberName}>{name}</h3>
              <p className={styles.memberRole}>{displayRole}</p>

              {funFact && (
                <p className={styles.funFact}>"{funFact}"</p>
              )}

              <div className={styles.quickStats}>
                <div className={styles.stat}>
                  <Zap size={14} />
                  <span>{skills.length} Skills</span>
                </div>
                <div className={styles.stat}>
                  <Calendar size={14} />
                  <span>{(member?.eventsJoined || 0) + (member?.workshopsJoined || 0)} Activities</span>
                </div>
              </div>

              <div className={styles.sideIndicator}>1/4</div>
            </motion.div>
          )}

          {/* Side 2: Skills & Achievements */}
          {currentSide === 1 && (
            <motion.div
              key="skills"
              className={`${styles.cardFace} ${styles.cardBack}`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6 }}
            >
              <div className={styles.sideHeader}>
                <Award className={styles.sideIcon} />
                <h4>Skills & Stars</h4>
              </div>

              <div className={styles.starsSection}>
                <div className={styles.starsDisplay}>
                  {renderStars(stars)}
                </div>
                <p className={styles.starsLabel}>
                  {stars === 5
                    ? 'ECHO Legend! 👑'
                    : stars === 4
                    ? 'Active Contributor! 🔥'
                    : stars === 3
                    ? 'Growing Star! ✨'
                    : stars === 2
                    ? 'Getting Started! 🌱'
                    : 'New Member! 👋'}
                </p>
              </div>

              <div className={styles.achievements}>
                <div className={styles.achievement}>
                  <BookOpen size={16} />
                  <span>Events Joined: {member?.eventsJoined || 0}</span>
                </div>
                <div className={styles.achievement}>
                  <Users size={16} />
                  <span>Workshops: {member?.workshopsJoined || 0}</span>
                </div>
                <div className={styles.achievement}>
                  <Target size={16} />
                  <span>Events Conducted: {member?.eventsConducted || 0}</span>
                </div>
              </div>

              <div className={styles.skillsGrid}>
                {skills.slice(0, 6).map((skill) => (
                  <span key={skill} className={styles.skillTag}>{skill}</span>
                ))}
              </div>

              <div className={styles.sideIndicator}>2/4</div>
            </motion.div>
          )}

          {/* Side 3: Social & Contact */}
          {currentSide === 2 && (
            <motion.div
              key="social"
              className={`${styles.cardFace} ${styles.cardSocial}`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6 }}
            >
              <div className={styles.sideHeader}>
                <Users className={styles.sideIcon} />
                <h4>Connect</h4>
              </div>

              <div className={styles.contactInfo}>
                {usn && <p className={styles.memberUsn}>{usn}</p>}
                {currentYear && <p className={styles.memberYear}>{currentYear}</p>}
              </div>

              <div className={styles.socialLinks}>
                <motion.a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </motion.a>

                {email && (
                  <motion.a
                    href={`mailto:${email}`}
                    className={styles.socialLink}
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={20} />
                    <span>Email</span>
                  </motion.a>
                )}

                {phone && (
                  <motion.a
                    href={`tel:${phone}`}
                    className={styles.socialLink}
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone size={20} />
                    <span>Call</span>
                  </motion.a>
                )}
              </div>

              {hobbies.length > 0 && (
                <div className={styles.hobbies}>
                  <h5>Hobbies & Interests</h5>
                  <div className={styles.hobbiesList}>
                    {hobbies.slice(0, 4).map((hobby) => (
                      <span key={hobby} className={styles.hobbyTag}>{hobby}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.sideIndicator}>3/4</div>
            </motion.div>
          )}

          {/* Side 4: Personal Touch */}
          {currentSide === 3 && (
            <motion.div
              key="personal"
              className={`${styles.cardFace} ${styles.cardPersonal}`}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6 }}
            >
              <div className={styles.sideHeader}>
                <Sparkles className={styles.sideIcon} />
                <h4>ECHO Spirit</h4>
              </div>

              <div className={styles.personalContent}>
                <Heart className={styles.heartIcon} />
                <p className={styles.memberQuote}>
                  “Passionate about {safePrimarySkill} and ready to innovate!”
                </p>

                <div className={styles.activityLevel}>
                  <div className={styles.activityBar}>
                    <div
                      className={styles.activityFill}
                      style={{ width: `${Math.min((stars / 5) * 100, 100)}%` }}
                    />
                  </div>
                  <span>Activity Level</span>
                </div>

                <div className={styles.funStats}>
                  <div className={styles.funStat}>
                    <Zap size={14} />
                    <span>Energy: {stars * 20}%</span>
                  </div>
                  <div className={styles.funStat}>
                    <Target size={14} />
                    <span>Focus: {Math.min(skills.length * 10, 100)}%</span>
                  </div>
                </div>
              </div>

              <div className={styles.flipHint}>
                <Sparkles size={12} />
                Keep flipping to explore more!
              </div>

              <div className={styles.sideIndicator}>4/4</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemberCard;
