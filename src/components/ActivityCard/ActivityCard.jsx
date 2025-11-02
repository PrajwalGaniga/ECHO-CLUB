import React from 'react';
import styles from './ActivityCard.module.css';
import { Calendar, MapPin, Tag, Clock, Zap, CheckCircle } from 'lucide-react';

const ActivityCard = ({ activity }) => {
  const isFree = activity.fee.toLowerCase() === 'free';
  const isUpcoming = new Date(activity.date) > new Date();

  // Format the date
  const formattedDate = new Date(activity.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={activity.thumbnail} alt={activity.title} className={styles.cardImage} />
        <span className={`${styles.statusBadge} ${isUpcoming ? styles.active : styles.completed}`}>
          {isUpcoming ? <Zap size={14} /> : <CheckCircle size={14} />}
          {isUpcoming ? 'Active' : 'Completed'}
        </span>
        <span className={styles.typeBadge}>{activity.type}</span>
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{activity.title}</h3>
        
        <div className={styles.infoGrid}>
          <span><Calendar size={14} /> {formattedDate}</span>
          <span><Clock size={14} /> {activity.time}</span>
          <span><MapPin size={14} /> {activity.location}</span>
        </div>
        
        <p className={styles.description}>{activity.description}</p>
        
        <div className={styles.footer}>
          <span className={`${styles.feeBadge} ${isFree ? styles.free : styles.paid}`}>
            <Tag size={14} /> {activity.fee}
          </span>
          <button className={styles.registerButton} disabled={!isUpcoming}>
            {isUpcoming ? 'Register Now' : 'View Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;