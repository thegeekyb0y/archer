import React, { useEffect } from 'react';

const NavigationTargets = ({ navBoxesRef, onStart }) => {
  useEffect(() => {
    // Get all nav boxes and store them in the ref
    const navBoxes = document.querySelectorAll('.nav-box');
    navBoxesRef.current = Array.from(navBoxes);
  }, [navBoxesRef]);

  return (
    <div className="nav-targets">
      <div className="nav-box projects" data-target="projects" style={{ left: 120, top: 50 }}>Projects</div>
      <div className="nav-box resume" data-target="resume" style={{ right: 120, top: 50 }}>Resume</div>
      <div className="nav-box about" data-target="about" style={{ left: '50%', transform: 'translateX(-50%)', top: 50 }}>About Me</div>
    </div>
  );
};

export default NavigationTargets; 