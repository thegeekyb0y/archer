import React, { useEffect } from 'react';

const NavigationTargets = ({ navBoxesRef, onStart }) => {
  useEffect(() => {
    // Get all nav boxes and store them in the ref
    const navBoxes = document.querySelectorAll('.nav-box');
    navBoxesRef.current = Array.from(navBoxes);
  }, [navBoxesRef]);

  return (
    <div className="nav-targets">
      <div className="nav-box projects" data-target="projects">Projects</div>
      <div className="nav-box resume" data-target="resume">Resume</div>
      <div className="nav-box about" data-target="about">About Me</div>
    </div>
  );
};

export default NavigationTargets; 