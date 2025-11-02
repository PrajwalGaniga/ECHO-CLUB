import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clubActivities } from '../data/clubActivities';
import ActivityCard from '../components/ActivityCard/ActivityCard';
import styles from './Events.module.css';
import { 
  Calendar, 
  Filter, 
  Search, 
  X, 
  Zap, 
  Users, 
  Award, 
  TrendingUp,
  Sparkles,
  Clock,
  Grid, // Added for View Toggle
  List // Added for View Toggle
} from 'lucide-react';

const Events = () => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [feeFilter, setFeeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('grid'); // grid or list

  const now = new Date();

  // Enhanced filter logic with search
  const filteredActivities = useMemo(() => {
    return clubActivities.filter(activity => {
      // Search Filter
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            activity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Type Filter
      const matchesType = typeFilter === 'all' || activity.type === typeFilter;
      
      // Status Filter
      const isUpcoming = new Date(activity.date) > now;
      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'active' && isUpcoming) ||
        (statusFilter === 'completed' && !isUpcoming);
          
      // Fee Filter
      const isFree = activity.fee.toLowerCase() === 'free';
      const matchesFee = feeFilter === 'all' || (feeFilter === 'free' && isFree);

      return matchesSearch && matchesType && matchesStatus && matchesFee;
    });
  }, [typeFilter, statusFilter, feeFilter, searchTerm, now]);

  // Sort with upcoming first (most recent upcoming first)
  const sortedActivities = filteredActivities.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    const aIsUpcoming = aDate > now;
    const bIsUpcoming = bDate > now;

    if (aIsUpcoming && !bIsUpcoming) return -1;
    if (!aIsUpcoming && bIsUpcoming) return 1;
    if (aIsUpcoming && bIsUpcoming) return aDate - bDate; // Soonest first
    return bDate - aDate; // Most recent first
  });


  // Statistics
  const stats = useMemo(() => {
    const total = clubActivities.length;
    const upcoming = clubActivities.filter(a => new Date(a.date) > now).length;
    const completed = clubActivities.filter(a => new Date(a.date) <= now).length;
    const freeEvents = clubActivities.filter(a => a.fee.toLowerCase() === 'free').length;
    
    return { total, upcoming, completed, freeEvents };
  }, [clubActivities, now]); // Added dependency

  const resetFilters = () => {
    setTypeFilter('all');
    setStatusFilter('all');
    setFeeFilter('all');
    setSearchTerm('');
  };

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

  return (
    <motion.div 
      className={styles.eventsPage}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background */}
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
            Events & <span className={styles.gradientText}>Workshops</span>
          </h1>
          <motion.div
            className={styles.sparkleContainer}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className={styles.sparkle} size={32} />
          </motion.div>
        </motion.div>
        <p className={styles.subtitle}>
          Discover all our technical workshops, cultural events, and innovation sessions
        </p>
        
        {/* Statistics Overview */}
        <motion.div 
          className={styles.statsOverview}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className={styles.statItem}>
            <Calendar className={styles.statIcon} size={24} />
            <span className={styles.statNumber}>{stats.total}</span>
            <span className={styles.statLabel}>Total Activities</span>
          </div>
          <div className={styles.statItem}>
            <Zap className={styles.statIcon} size={24} />
            <span className={styles.statNumber}>{stats.upcoming}</span>
            <span className={styles.statLabel}>Upcoming</span>
          </div>
          <div className={styles.statItem}>
            <Award className={styles.statIcon} size={24} />
            <span className={styles.statNumber}>{stats.completed}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
          <div className={styles.statItem}>
            <Users className={styles.statIcon} size={24} />
            <span className={styles.statNumber}>{stats.freeEvents}</span>
            <span className={styles.statLabel}>Free Events</span>
          </div>
        </motion.div>
      </motion.header>

      {/* Enhanced Filter Bar */}
      <motion.div className={styles.filterBar} variants={itemVariants}>
        {/* Search Section */}
        <div className={styles.searchSection}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search events, workshops, tags..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <motion.button
                className={styles.clearSearch}
                onClick={() => setSearchTerm('')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className={styles.filterControls}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              <Filter size={16} />
              Type
            </label>
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Types</option>
              <option value="event">Events</option>
              <option value="workshop">Workshops</option>
              <option value="hackathon">Hackathons</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              <Clock size={16} />
              Status
            </label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="active">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>
              <TrendingUp size={16} />
              Fee
            </label>
            <select 
              value={feeFilter} 
              onChange={(e) => setFeeFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Fees</option>
              <option value="free">Free Only</option>
            </select>
          </div>
        </div>

        {/* View Toggle and Reset */}
        <div className={styles.viewControls}>
          <div className={styles.viewToggle}>
            <motion.button
              className={`${styles.viewButton} ${activeView === 'grid' ? styles.active : ''}`}
              onClick={() => setActiveView('grid')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid size={16} />
            </motion.button>
            <motion.button
              className={`${styles.viewButton} ${activeView === 'list' ? styles.active : ''}`}
              onClick={() => setActiveView('list')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <List size={16} />
            </motion.button>
          </div>

          <motion.button 
            className={styles.resetButton} 
            onClick={resetFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={16} /> Reset All
          </motion.button>
        </div>
      </motion.div>

      {/* ... (Active Filters Display - no changes) ... */}
      {(searchTerm || typeFilter !== 'all' || statusFilter !== 'all' || feeFilter !== 'all') && (
        <motion.div 
          className={styles.activeFilters}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={styles.activeFiltersLabel}>Active Filters:</span>
          {searchTerm && (
            <span className={styles.activeFilterTag}>
              Search: "{searchTerm}"
            </span>
          )}
          {typeFilter !== 'all' && (
            <span className={styles.activeFilterTag}>
              Type: {typeFilter}
            </span>
          )}
          {statusFilter !== 'all' && (
            <span className={styles.activeFilterTag}>
              Status: {statusFilter}
            </span>
          )}
          {feeFilter !== 'all' && (
            <span className={styles.activeFilterTag}>
              Fee: {feeFilter}
            </span>
          )}
        </motion.div>
      )}

      {/* Results Info */}
      <motion.div className={styles.resultsInfo} variants={itemVariants}>
        <span className={styles.resultsCount}>
          Showing {filteredActivities.length} of {clubActivities.length} activities
        </span>
        {filteredActivities.length > 0 && (
          <span className={styles.resultsHint}>
            {filteredActivities.filter(a => new Date(a.date) > now).length} upcoming
          </span>
        )}
      </motion.div>

      {/* Activity Grid/List */}
      <motion.div 
        className={`${styles.activityContainer} ${styles[activeView]}`}
        variants={containerVariants}
        layout // Add layout prop for smooth transitions
      >
        {/* ✅ FIX: Removed mode="wait" to fix the filtering bug.
        */}
        <AnimatePresence>
          {sortedActivities.length > 0 ? (
            sortedActivities.map((activity) => ( // Removed index
              <motion.div
                key={activity.id} // Key is on the motion component
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8 }}
                layout // This makes the item animate to its new position
              >
                <ActivityCard 
                  activity={activity} 
                  view={activeView}
                />
              </motion.div>
            ))
          ) : (
            <motion.div 
              className={styles.noResults}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} // This exit is fine
            >
              <Calendar size={64} className={styles.noResultsIcon} />
              <h3>No events found</h3>
              <p>Try adjusting your search criteria or filters</p>
              <motion.button 
                className={styles.resetAllButton}
                onClick={resetFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ... (Upcoming Events Highlight - no changes) ... */}
      {sortedActivities.filter(a => new Date(a.date) > now).length > 0 && (
        <motion.section 
          className={styles.upcomingHighlight}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.highlightTitle}>
            <Zap className={styles.highlightIcon} />
            Don't Miss These Upcoming Events!
          </h2>
          <div className={styles.upcomingGrid}>
            {sortedActivities
              .filter(a => new Date(a.date) > now)
              .slice(0, 3)
              .map((activity, index) => (
                <motion.a // Changed to an 'a' tag
                  key={activity.id}
                  href="#" // Add link to event page later
                  className={styles.highlightCard}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <img src={activity.thumbnail} alt={activity.title} />
                  <div className={styles.highlightContent}>
                    <h4>{activity.title}</h4>
                    <p>{new Date(activity.date).toLocaleDateString()}</p>
                  </div>
                </motion.a>
              ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default Events;