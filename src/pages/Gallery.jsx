import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { youtubeVideos, instagramPosts, linkedinPosts } from '../data/mediaData';
import MediaCard from '../components/MediaCard/MediaCard';
import styles from './Gallery.module.css';
import { 
  Youtube, 
  Instagram, 
  Linkedin, 
  Sparkles, 
  Filter, 
  Play, 
  Heart, 
  Eye,
  TrendingUp,
  Zap,
  Users,
  Share2,
  Calendar,
  ArrowUp,
  ExternalLink
} from 'lucide-react';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [hoveredItem, setHoveredItem] = useState(null);

  // Combine all media with source info
  const allMedia = useMemo(() => {
    const youtube = youtubeVideos.map(item => ({ ...item, source: 'youtube', type: 'video' }));
    const instagram = instagramPosts.map(item => ({ ...item, source: 'instagram', type: item.mediaType || 'image' }));
    const linkedin = linkedinPosts.map(item => ({ ...item, source: 'linkedin', type: 'post' }));
    return [...youtube, ...instagram, ...linkedin];
  }, []);

  // Filter and sort logic
  const filteredMedia = useMemo(() => {
    let filtered = allMedia;
    
    // Apply source filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(item => item.source === activeFilter);
    }
    
    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'popular') {
        return (b.views || b.likes || 0) - (a.views || a.likes || 0);
      }
      return 0;
    });
    
    return filtered;
  }, [allMedia, activeFilter, sortBy]);

  // Calculate stats with engagement
  const stats = useMemo(() => {
    const totalViews = allMedia.reduce((sum, item) => sum + (item.views || 0), 0);
    const totalLikes = allMedia.reduce((sum, item) => sum + (item.likes || 0), 0);
    const totalEngagement = allMedia.reduce((sum, item) => sum + (item.engagement || 0), 0);
    
    return {
      youtube: youtubeVideos.length,
      instagram: instagramPosts.length,
      linkedin: linkedinPosts.length,
      total: allMedia.length,
      totalViews,
      totalLikes,
      totalEngagement
    };
  }, [allMedia]);

  const filters = [
    { key: 'all', label: 'All Content', icon: Sparkles, count: allMedia.length },
    { key: 'youtube', label: 'YouTube', icon: Youtube, count: youtubeVideos.length },
    { key: 'instagram', label: 'Instagram', icon: Instagram, count: instagramPosts.length },
    { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, count: linkedinPosts.length }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
        duration: 0.5,
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
      className={styles.galleryPage}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      
      {/* Enhanced Animated Background */}
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
        
        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.floatingParticle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Page Header */}
      <motion.header className={styles.header} variants={itemVariants}>
        <motion.div
          className={styles.titleContainer}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h1 className={styles.title}>
            Media <span className={styles.gradientText}>Hub</span>
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
          Explore our journey through videos, posts, and creative content
        </motion.p>

        {/* Enhanced Stats Overview */}
        <motion.div 
          className={styles.statsOverview}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className={styles.statItem}>
            <motion.div 
              className={styles.statIconContainer}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Play className={styles.statIcon} size={24} />
            </motion.div>
            <span className={styles.statNumber}>{stats.total}</span>
            <span className={styles.statLabel}>Total Posts</span>
          </div>
          
          <div className={styles.statItem}>
            <motion.div 
              className={styles.statIconContainer}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <Eye className={styles.statIcon} size={24} />
            </motion.div>
            <span className={styles.statNumber}>
              {(stats.totalViews / 1000).toFixed(1)}K
            </span>
            <span className={styles.statLabel}>Total Views</span>
          </div>
          
          <div className={styles.statItem}>
            <motion.div 
              className={styles.statIconContainer}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <Heart className={styles.statIcon} size={24} />
            </motion.div>
            <span className={styles.statNumber}>
              {(stats.totalLikes / 1000).toFixed(1)}K
            </span>
            <span className={styles.statLabel}>Total Likes</span>
          </div>
          
          <div className={styles.statItem}>
            <motion.div 
              className={styles.statIconContainer}
              whileHover={{ scale: 1.2, rotate: 180 }}
              transition={{ duration: 0.6 }}
            >
              <TrendingUp className={styles.statIcon} size={24} />
            </motion.div>
            <span className={styles.statNumber}>
              {stats.totalEngagement}%
            </span>
            <span className={styles.statLabel}>Engagement</span>
          </div>
        </motion.div>
      </motion.header>

      {/* Filter and Sort Controls */}
      <motion.section className={styles.controls} variants={itemVariants}>
        <div className={styles.controlsContainer}>
          {/* Platform Filters */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              <Filter size={16} />
              Filter by Platform
            </label>
            <div className={styles.filterButtons}>
              {filters.map((filter) => (
                <motion.button
                  key={filter.key}
                  className={`${styles.filterButton} ${activeFilter === filter.key ? styles.active : ''}`}
                  onClick={() => setActiveFilter(filter.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <filter.icon size={18} />
                  {filter.label}
                  <span className={styles.filterCount}>{filter.count}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className={styles.sortGroup}>
            <label className={styles.sortLabel}>
              <Calendar size={16} />
              Sort by
            </label>
            <select 
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">Latest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(activeFilter !== 'all' || sortBy !== 'latest') && (
          <motion.div 
            className={styles.activeFilters}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className={styles.activeFiltersLabel}>Active:</span>
            {activeFilter !== 'all' && (
              <span className={styles.activeFilterTag}>
                Platform: {filters.find(f => f.key === activeFilter)?.label}
              </span>
            )}
            {sortBy !== 'latest' && (
              <span className={styles.activeFilterTag}>
                Sort: {sortBy === 'popular' ? 'Most Popular' : 'Latest'}
              </span>
            )}
            <motion.button 
              className={styles.clearFilters}
              onClick={() => {
                setActiveFilter('all');
                setSortBy('latest');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear All
            </motion.button>
          </motion.div>
        )}
      </motion.section>

      {/* Results Info */}
      <motion.div className={styles.resultsInfo} variants={itemVariants}>
        <span className={styles.resultsCount}>
          Showing {filteredMedia.length} of {allMedia.length} items
        </span>
        {filteredMedia.length > 0 && (
          <span className={styles.resultsHint}>
            {sortBy === 'popular' ? 'Sorted by popularity' : 'Sorted by latest'}
          </span>
        )}
      </motion.div>

      {/* Unified Media Grid */}
      <motion.section 
        className={styles.mediaSection}
        variants={containerVariants}
      >
        <AnimatePresence mode="wait">
          {filteredMedia.length > 0 ? (
            <motion.div 
              className={styles.mediaGrid}
              layout
            >
              {filteredMedia.map((item, index) => (
                <motion.div
                  key={`${item.source}-${item.id}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <MediaCard 
                    item={item} 
                    isHovered={hoveredItem === item.id}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className={styles.noResults}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Sparkles size={64} className={styles.noResultsIcon} />
              <h3>No content found</h3>
              <p>Try adjusting your filters to see more content</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Platform Highlights */}
      <motion.section 
        className={styles.platformHighlights}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.highlightsTitle}>Follow Us Everywhere</h2>
        <div className={styles.platformGrid}>
          <motion.a
            href="https://youtube.com/your-channel"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.platformCard}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.platformIcon}>
              <Youtube size={32} />
            </div>
            <h3>YouTube</h3>
            <p>Watch tutorials, event recordings, and more</p>
            <motion.span 
              className={styles.followButton}
              whileHover={{ x: 5 }}
            >
              Subscribe <ExternalLink size={16} />
            </motion.span>
          </motion.a>

          <motion.a
            href="https://instagram.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.platformCard}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.platformIcon}>
              <Instagram size={32} />
            </div>
            <h3>Instagram</h3>
            <p>Behind-the-scenes and daily updates</p>
            <motion.span 
              className={styles.followButton}
              whileHover={{ x: 5 }}
            >
              Follow <ExternalLink size={16} />
            </motion.span>
          </motion.a>

          <motion.a
            href="https://linkedin.com/company/your-company"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.platformCard}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.platformIcon}>
              <Linkedin size={32} />
            </div>
            <h3>LinkedIn</h3>
            <p>Professional updates and achievements</p>
            <motion.span 
              className={styles.followButton}
              whileHover={{ x: 5 }}
            >
              Follow <ExternalLink size={16} />
            </motion.span>
          </motion.a>
        </div>
      </motion.section>

      {/* Scroll to Top */}
      <motion.button
        className={styles.scrollToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <ArrowUp size={20} />
      </motion.button>
    </motion.div>
  );
};

export default Gallery;