import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './MediaCard.module.css';
import { 
  ArrowUpRight, 
  Play, 
  Heart, 
  Eye, 
  MessageCircle,
  Share2,
  Calendar,
  ExternalLink,
  Youtube,
  Instagram,
  Linkedin
} from 'lucide-react';

const MediaCard = ({ item, isHovered }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const getPlatformIcon = (source) => {
    switch (source) {
      case 'youtube': return Youtube;
      case 'instagram': return Instagram;
      case 'linkedin': return Linkedin;
      default: return ExternalLink;
    }
  };

  const getPlatformColor = (source) => {
    switch (source) {
      case 'youtube': return '#FF0000';
      case 'instagram': return '#E1306C';
      case 'linkedin': return '#0A66C2';
      default: return '#667eea';
    }
  };

  const PlatformIcon = getPlatformIcon(item.source);
  const platformColor = getPlatformColor(item.source);

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    normal: { scale: 1 },
    hover: { scale: 1.1 }
  };

  return (
    <motion.a 
      href={item.link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.card}
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={() => setIsImageHovered(true)}
      onHoverEnd={() => setIsImageHovered(false)}
      style={{ '--platform-color': platformColor }}
    >
      {/* Platform Badge */}
      <motion.div 
        className={styles.platformBadge}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <PlatformIcon size={16} />
        <span>{item.source.charAt(0).toUpperCase() + item.source.slice(1)}</span>
      </motion.div>

      {/* Image Container */}
      <motion.div 
        className={styles.imageContainer}
        variants={imageVariants}
        animate={isImageHovered ? "hover" : "normal"}
      >
        <motion.img 
          src={item.thumbnail} 
          alt={item.title}
          className={`${styles.thumbnail} ${imageLoaded ? styles.loaded : ''}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay with play button for videos */}
        <motion.div 
          className={styles.imageOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: isImageHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.type === 'video' && (
            <motion.div
              className={styles.playButton}
              animate={{ scale: isImageHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Play size={32} fill="currentColor" />
            </motion.div>
          )}
        </motion.div>

        {/* Engagement Stats */}
        <motion.div 
          className={styles.engagementStats}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isImageHovered ? 1 : 0, y: isImageHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          {item.views && (
            <span className={styles.stat}>
              <Eye size={12} />
              {formatNumber(item.views)}
            </span>
          )}
          {item.likes && (
            <span className={styles.stat}>
              <Heart size={12} />
              {formatNumber(item.likes)}
            </span>
          )}
          {item.comments && (
            <span className={styles.stat}>
              <MessageCircle size={12} />
              {formatNumber(item.comments)}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <h3 className={styles.title}>
            {item.title}
            <motion.span 
              className={styles.linkIcon}
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight size={20} />
            </motion.span>
          </h3>
          
          {/* Date */}
          {item.date && (
            <motion.span 
              className={styles.date}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Calendar size={14} />
              {formatDate(item.date)}
            </motion.span>
          )}
        </div>

        <p className={styles.description}>{item.description}</p>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className={styles.tags}>
            {item.tags.slice(0, 3).map(tag => (
              <span key={tag} className={styles.tag}>#{tag}</span>
            ))}
          </div>
        )}

        {/* Action Bar */}
        <motion.div 
          className={styles.actionBar}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button 
            className={styles.actionButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              // Add to favorites logic here
            }}
          >
            <Heart size={16} />
          </motion.button>
          
          <motion.button 
            className={styles.actionButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              navigator.share?.({
                title: item.title,
                text: item.description,
                url: item.link,
              });
            }}
          >
            <Share2 size={16} />
          </motion.button>
        </motion.div>
      </div>

      {/* Hover Effect */}
      <motion.div 
        className={styles.hoverEffect}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

export default MediaCard;