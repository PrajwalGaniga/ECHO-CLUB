import React, { useEffect } from 'react'; // Import useEffect
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import styles from './App.module.css';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import JoinUs from './pages/JoinUs';

function App() {
  
  // --- Custom Cursor Logic ---
  useEffect(() => {
    const cursorDot = document.querySelector('.cursorDot');
    const cursorOutline = document.querySelector('.cursorOutline');

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      cursorDot.style.left = `${x}px`;
      cursorDot.style.top = `${y}px`;
      cursorOutline.style.left = `${x}px`;
      cursorOutline.style.top = `${y}px`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);
  // --- End Custom Cursor Logic ---

  return (
    <div className={styles.app}>
      {/* --- Custom Cursor Elements --- */}
      <div className="cursorDot"></div>
      <div className="cursorOutline"></div>
    
      <Navbar /> 
      
      <main className={styles.mainContent}>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/join" element={<JoinUs />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;