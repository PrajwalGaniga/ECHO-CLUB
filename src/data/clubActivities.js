export const clubActivities = [
    {
        id: 4, 
        title: 'Smart India Hackathon 2025', 
        description: 'A national-level event focused on solving real-world problems using technology. Open to all students.', 
        thumbnail: '/assets/images/events/event/sih.jpg',
        location: 'SIT College',
        date: '2025-11-22', 
        time: '10:00 AM', 
        fee: 'Free', 
        status: 'Active',
        category: 'technical',
        type: 'hackathon', // <-- FIX: Changed to 'hackathon' for the filter
        tags: ['SIH', 'National', 'Competition', 'Software'] // <-- FIX: Added tags
    },
    {
        id: 3, 
        title: 'Introduction to AI & Machine Learning', 
        description: 'A beginner-friendly workshop covering the fundamentals of AI, ML, and how to build your first predictive model.', 
        thumbnail: '/assets/images/events/workshop/dhaarini.jpg',
        location: 'ECHO University - Lab 3', 
        date: '2025-10-10',
        time: '1:00 PM', 
        fee: '250', // Assuming 250, not 2500
        status: 'Completed',
        category: 'technical',
        type: 'workshop',
        tags: ['AI', 'ML', 'Python', 'Data Science'] // <-- FIX: Added tags
    },
    {
        id: 2, 
        title: 'Intro to React Workshop', 
        description: 'Join us for a hands-on workshop covering the fundamentals of React and modern web development.', 
        thumbnail: '/assets/images/events/react-workshop.jpg',
        location: 'CSD/ISE Seminar Hall', 
        date: '2025-12-02',
        time: '2:00 PM',
        fee: 'Free', 
        status: 'Active',
        category: 'technical',
        type: 'workshop',
        tags: ['React', 'Web Development', 'JavaScript', 'Frontend'] // <-- FIX: Added tags
    },
    {
        id: 1, 
        title: 'Club Inauguration', 
        description: 'The official inauguration of the ECHO club and the grand reveal of our new logo.', 
        thumbnail: '/assets/images/events/inauguration.jpg',
        location: 'SIT, Main Auditorium', 
        date: '2025-09-10',
        time: '11:00 AM',
        fee: 'Free', 
        status: 'Completed',
        category: 'cultural',
        type: 'event',
        tags: ['Inauguration', 'Launch', 'Cultural'] // <-- FIX: Added tags
    }
];