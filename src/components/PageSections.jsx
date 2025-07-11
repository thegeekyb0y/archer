import React, { useEffect } from 'react';

const PageSections = ({ pageSectionsRef, onBack }) => {
  useEffect(() => {
    // Get all page sections and store them in the ref
    const pageSections = document.querySelectorAll('.page-section');
    pageSectionsRef.current = Array.from(pageSections);
  }, [pageSectionsRef]);

  return (
    <>
      <div className="page-section" id="projectsPage">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>Projects</h1>
        <div className="content">
          <p>Welcome to my projects portfolio. Here you'll find a collection of my work, including web applications, mobile apps, and creative experiments.</p>
          <p>Each project showcases different skills and technologies, from frontend frameworks to backend systems and everything in between.</p>
          <p>Explore the interactive demos and dive into the code repositories to see how each project was built.</p>
        </div>
      </div>
      
      <div className="page-section" id="resumePage">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>Resume</h1>
        <div className="content">
          <p>Professional experience and qualifications at a glance. Download my full resume or browse through my career highlights.</p>
          <p>With expertise in modern web technologies, I've worked on projects ranging from small business websites to enterprise applications.</p>
          <p>Let's connect and discuss how my skills can contribute to your next project.</p>
        </div>
      </div>
      
      <div className="page-section" id="aboutPage">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>About Me</h1>
        <div className="content">
          <p>I'm a passionate developer who loves creating interactive and engaging digital experiences.</p>
          <p>When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or working on creative side projects.</p>
          <p>I believe in the power of good design and clean code to make the web a more beautiful and functional place.</p>
        </div>
      </div>
    </>
  );
};

export default PageSections; 