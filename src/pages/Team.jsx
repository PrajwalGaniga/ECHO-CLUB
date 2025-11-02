import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { members } from '../data/members';
import { coreTeam } from '../data/coreTeam';
import MemberCard from '../components/MemberCard/MemberCard';
import styles from './Team.module.css';
import { Search, X, Users, Crown, Zap, Star, Award } from 'lucide-react';

const coreTeamMap = new Map(coreTeam.map(m => [m.name, m]));

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const allSkills = useMemo(() => {
    const skillSet = new Set();
    members.forEach(m => (m.skills || []).forEach(s => skillSet.add(s)));
    return Array.from(skillSet).sort();
  }, []);

  const allCategories = useMemo(() => {
    const cat = new Set();
    coreTeam.forEach(m => cat.add(m.category));
    return Array.from(cat).sort();
  }, []);

  const filteredMembers = useMemo(() => {
    const filtered = members.filter(member => {
      const coreInfo = coreTeamMap.get(member.name);
      const matchesSearch =
        (member.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.usn || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSkill =
        selectedSkill === '' || (member.skills || []).includes(selectedSkill);
      const matchesCategory =
        selectedCategory === '' ||
        (coreInfo && coreInfo.category === selectedCategory);
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'core' && coreInfo !== undefined) ||
        (activeFilter === 'general' && coreInfo === undefined);
      return matchesSearch && matchesSkill && matchesCategory && matchesFilter;
    });

    console.log(
      `[Team.jsx] Filtered ${filtered.length} members:`,
      filtered.map(m => m.name)
    );

    return filtered;
  }, [searchTerm, selectedSkill, selectedCategory, activeFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSkill('');
    setSelectedCategory('');
    setActiveFilter('all');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
  };

  return (
    <div className={styles.teamPage}>
      <div className={styles.backgroundElements}>
        <div className={styles.floatingOrb1} />
        <div className={styles.floatingOrb2} />
      </div>

      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Meet the <span className={styles.gradientText}>Team</span>
          </h1>
        </div>
        <p className={styles.subtitle}>
          The brilliant minds building, creating, and innovating at ECHO
        </p>
      </header>

      <section className={styles.statsOverview}>
        <div className={styles.statItem}>
          <Users className={styles.statIcon} />
          <div className={styles.statNumber}>{members.length}</div>
          <div className={styles.statLabel}>Total Members</div>
        </div>
        <div className={styles.statItem}>
          <Crown className={styles.statIcon} />
          <div className={styles.statNumber}>{coreTeam.length}</div>
          <div className={styles.statLabel}>Core Team</div>
        </div>
        <div className={styles.statItem}>
          <Zap className={styles.statIcon} />
          <div className={styles.statNumber}>{allSkills.length}</div>
          <div className={styles.statLabel}>Skills</div>
        </div>
        <div className={styles.statItem}>
          <Star className={styles.statIcon} />
          <div className={styles.statNumber}>
            {members.reduce(
              (t, m) => t + (m.eventsJoined || 0) + (m.workshopsJoined || 0),
              0
            )}
          </div>
          <div className={styles.statLabel}>Activities</div>
        </div>
      </section>

      <section className={styles.filterBar}>
        <div className={styles.filterSection}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input
              className={styles.searchInput}
              placeholder="Search by name or USN"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                aria-label="Clear search"
                onClick={() => setSearchTerm('')}
                className={styles.resetButton}
                style={{ position: 'absolute', right: 8, top: 8, padding: '0.35rem 0.6rem' }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className={styles.filterSection}>
          <select
            className={styles.filterSelect}
            value={selectedSkill}
            onChange={e => setSelectedSkill(e.target.value)}
          >
            <option value="">All Skills</option>
            {allSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterSection}>
          <select
            className={styles.filterSelect}
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterButtons}>
          {[
            { key: 'all', label: 'All', icon: Users },
            { key: 'core', label: 'Core', icon: Crown },
            { key: 'general', label: 'General', icon: Users }
          ].map(f => {
            const Icon = f.icon;
            return (
              <button
                key={f.key}
                className={`${styles.filterButton} ${activeFilter === f.key ? styles.active : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                <Icon size={16} />
                {f.label}
              </button>
            );
          })}
        </div>

        <button className={styles.resetButton} onClick={resetFilters}>
          Reset
        </button>
      </section>

      {(searchTerm || selectedSkill || selectedCategory || activeFilter !== 'all') && (
        <div className={styles.activeFilters}>
          <span className={styles.activeFiltersLabel}>Active Filters:</span>
          {searchTerm && <span className={styles.activeFilterTag}>Search: “{searchTerm}”</span>}
          {selectedSkill && <span className={styles.activeFilterTag}>Skill: {selectedSkill}</span>}
          {selectedCategory && (
            <span className={styles.activeFilterTag}>Category: {selectedCategory}</span>
          )}
          {activeFilter !== 'all' && (
            <span className={styles.activeFilterTag}>
              Type: {activeFilter === 'core' ? 'Core Members' : 'General Members'}
            </span>
          )}
        </div>
      )}

      <div className={styles.resultsInfo}>
        <div className={styles.resultsCount}>
          Showing {filteredMembers.length} of {members.length} members
        </div>
      </div>

      <motion.div
        className={styles.membersGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredMembers.map(member => {
            const coreInfo = coreTeamMap.get(member.name);
            const stableKey = member.id || member.usn || member.name;
            return (
              <motion.div
                key={stableKey}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <MemberCard member={member} coreInfo={coreInfo} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredMembers.length === 0 && (
        <div className={styles.noResults}>
          <Award className={styles.noResultsIcon} size={42} />
          <h3>No members found</h3>
          <p>Try adjusting your search criteria or filters</p>
          <button className={styles.resetAllButton} onClick={resetFilters}>
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Team;
