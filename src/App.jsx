import React, { useState, useEffect, useRef } from 'react';
import BowAndArrow from './components/BowAndArrow';
import NavigationTargets from './components/NavigationTargets';
import ReleaseZone from './components/ReleaseZone';
import PageSections from './components/PageSections';

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [arrowCenterX, setArrowCenterX] = useState(0);
  const [arrowCenterY, setArrowCenterY] = useState(0);
  const [activeTarget, setActiveTarget] = useState(null);
  const [inReleaseZone, setInReleaseZone] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [explosion, setExplosion] = useState(false);
  const [shake, setShake] = useState(false);
  const [stretchAmount, setStretchAmount] = useState(0);

  const arrowRef = useRef(null);
  const bowRef = useRef(null);
  const releaseZoneRef = useRef(null);
  const navBoxesRef = useRef([]);
  const pageSectionsRef = useRef([]);

  // Get arrow center position
  const getArrowCenter = () => {
    if (!arrowRef.current) return { x: 0, y: 0 };
    const rect = arrowRef.current.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  };

  // Get arrow head position accurately
  const getArrowHeadPosition = () => {
    if (!arrowRef.current) return { x: 0, y: 0 };
    const arrowRect = arrowRef.current.getBoundingClientRect();
    const arrowCenterX = arrowRect.left + arrowRect.width / 2;
    const arrowCenterY = arrowRect.top + arrowRect.height / 2;
    
    // Get current arrow rotation from transform
    const transform = window.getComputedStyle(arrowRef.current).transform;
    let rotationAngle = 0;
    
    if (transform !== 'none') {
      const matrix = transform.match(/matrix\(([^)]+)\)/);
      if (matrix) {
        const values = matrix[1].split(',');
        rotationAngle = Math.atan2(parseFloat(values[1]), parseFloat(values[0]));
      }
    }
    
    // Calculate arrow head position (arrow is 180px tall, head is at top)
    // The arrow head is 90px from center towards the top of the arrow
    const headDistance = 90;
    const headX = arrowCenterX + Math.sin(rotationAngle) * headDistance;
    const headY = arrowCenterY - Math.cos(rotationAngle) * headDistance;
    
    return { x: headX, y: headY };
  };

  // Check if mouse is in release zone
  const isInReleaseZone = (mouseX, mouseY) => {
    if (!releaseZoneRef.current) return false;
    const releaseRect = releaseZoneRef.current.getBoundingClientRect();
    return mouseX >= releaseRect.left && 
           mouseX <= releaseRect.right && 
           mouseY >= releaseRect.top && 
           mouseY <= releaseRect.bottom;
  };

  // Check if line from arrow head intersects with target box
  const getIntersectingTarget = (fromX, fromY, toX, toY) => {
    const direction = {
      x: toX - fromX,
      y: toY - fromY
    };
    
    // Normalize direction
    const length = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
    if (length === 0) return null;
    
    direction.x /= length;
    direction.y /= length;
    
    // Check intersection with each target box
    for (let box of navBoxesRef.current) {
      if (!box) continue;
      const rect = box.getBoundingClientRect();
      const boxCenterX = rect.left + rect.width / 2;
      const boxCenterY = rect.top + rect.height / 2;
      
      // Check if direction points towards this box
      const toBoxX = boxCenterX - fromX;
      const toBoxY = boxCenterY - fromY;
      const dotProduct = direction.x * toBoxX + direction.y * toBoxY;
      
      if (dotProduct > 0) {
        // Calculate distance from box center to line
        const distanceToLine = Math.abs(
          (toBoxY * direction.x - toBoxX * direction.y)
        );
        
        // If line passes close to box center, consider it intersecting
        if (distanceToLine < 100) {
          return box;
        }
      }
    }
    
    return null;
  };

  // Mouse/touch event handlers
  const handleStart = (e) => {
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    if (!arrowRef.current) return;
    
    const nockElement = arrowRef.current.querySelector('.arrow-nock');
    if (!nockElement) return;
    
    const nockRect = nockElement.getBoundingClientRect();
    const nockCenterX = nockRect.left + nockRect.width / 2;
    const nockCenterY = nockRect.top + nockRect.height / 2;
    
    // Check if click/touch is on the arrow nock
    const distance = Math.sqrt(
      Math.pow(clientX - nockCenterX, 2) + 
      Math.pow(clientY - nockCenterY, 2)
    );
    
    if (distance <= 20) { // 20px radius around nock
      setIsDragging(true);
      const arrowCenter = getArrowCenter();
      setArrowCenterX(arrowCenter.x);
      setArrowCenterY(arrowCenter.y);
      
      if (bowRef.current) {
        bowRef.current.classList.add('dragging');
      }
      
      e.preventDefault();
    }
  };

  const handleMove = (e) => {
    if (!isDragging || !arrowRef.current) return;
    
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    // Calculate vector from arrow center to mouse (pull direction)
    const pullDeltaX = clientX - arrowCenterX;
    const pullDeltaY = clientY - arrowCenterY;
    
    // Arrow should point in OPPOSITE direction of pull
    const aimDeltaX = -pullDeltaX;
    const aimDeltaY = -pullDeltaY;
    
    // Calculate angle for arrow rotation (opposite of pull direction)
    const angle = Math.atan2(aimDeltaX, -aimDeltaY) * 180 / Math.PI;
    
    // Calculate stretch amount based on distance
    const distance = Math.sqrt(pullDeltaX * pullDeltaX + pullDeltaY * pullDeltaY);
    const stretch = Math.min(distance / 4, 80); // Increased sensitivity and max stretch
    setStretchAmount(stretch);
    
    // Update arrow rotation and position
    arrowRef.current.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(${stretch}px)`;
    
    // Get arrow head position after transformation
    setTimeout(() => {
      const arrowHeadPos = getArrowHeadPosition();
      
      // Create normalized direction vector from arrow head
      const aimLength = Math.sqrt(aimDeltaX * aimDeltaX + aimDeltaY * aimDeltaY);
      if (aimLength > 0) {
        const normalizedAimX = aimDeltaX / aimLength;
        const normalizedAimY = aimDeltaY / aimLength;
        
        // Extend the line far in the aim direction (like a laser)
        const laserDistance = 2000;
        const laserEndX = arrowHeadPos.x + normalizedAimX * laserDistance;
        const laserEndY = arrowHeadPos.y + normalizedAimY * laserDistance;
        
        // Check which target is being aimed at using the laser line
        const targetBox = getIntersectingTarget(arrowHeadPos.x, arrowHeadPos.y, laserEndX, laserEndY);
        
        // Update active target
        if (activeTarget !== targetBox) {
          if (activeTarget) {
            activeTarget.classList.remove('active');
          }
          setActiveTarget(targetBox);
          if (targetBox) {
            targetBox.classList.add('active');
          }
        }
      }
    }, 10);
    
    // Check if in release zone
    const wasInReleaseZone = inReleaseZone;
    const newInReleaseZone = isInReleaseZone(clientX, clientY);
    setInReleaseZone(newInReleaseZone);
    
    if (newInReleaseZone !== wasInReleaseZone) {
      if (newInReleaseZone) {
        if (releaseZoneRef.current) {
          releaseZoneRef.current.classList.add('active');
        }
      } else {
        if (releaseZoneRef.current) {
          releaseZoneRef.current.classList.remove('active');
        }
      }
    }
    
    // Show/hide release zone when dragging
    if (releaseZoneRef.current && !releaseZoneRef.current.classList.contains('visible')) {
      releaseZoneRef.current.classList.add('visible');
    }
    
    // Screen shake logic
    if (stretch > 10) {
      setShake(true);
    } else {
      setShake(false);
    }
    
    e.preventDefault();
  };

  const handleEnd = (e) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setShake(false);
    setStretchAmount(0);
    if (bowRef.current) {
      bowRef.current.classList.remove('dragging');
    }
    
    if (releaseZoneRef.current) {
      releaseZoneRef.current.classList.remove('visible');
      releaseZoneRef.current.classList.remove('active');
    }
    
    // Check if released in release zone with an active target
    if (inReleaseZone && activeTarget && arrowRef.current) {
      const targetName = activeTarget.dataset.target;
      const targetPage = pageSectionsRef.current.find(section => 
        section && section.id === targetName + 'Page'
      );
      
      if (targetPage) {
        // Get target box center
        const targetRect = activeTarget.getBoundingClientRect();
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;
        
        // Get current arrow head position
        const arrowHeadPos = getArrowHeadPosition();
        
        // Calculate final angle from arrow head to target
        const finalDeltaX = targetCenterX - arrowHeadPos.x;
        const finalDeltaY = targetCenterY - arrowHeadPos.y;
        const finalAngle = Math.atan2(finalDeltaX, -finalDeltaY) * 180 / Math.PI;
        
        // Animate arrow to target
        arrowRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        arrowRef.current.style.transform = `translate(-50%, -50%) rotate(${finalAngle}deg) translateY(-200px) scale(0.3)`;
        
        setTimeout(() => {
          targetPage.classList.add('active');
          setCurrentPage(targetName);
          if (arrowRef.current) {
            arrowRef.current.style.transition = '';
            arrowRef.current.style.transform = 'translate(-50%, -50%)';
          }
          // Explosion effect
          setExplosion(true);
          setTimeout(() => setExplosion(false), 400);
        }, 800);
      }
    } else {
      // Return arrow to original position
      if (arrowRef.current) {
        arrowRef.current.style.transform = 'translate(-50%, -50%)';
      }
    }
    
    // Remove active state from all targets
    navBoxesRef.current.forEach(box => {
      if (box) box.classList.remove('active');
    });
    setActiveTarget(null);
    setInReleaseZone(false);
    
    e.preventDefault();
  };

  // Back button functionality
  const goBack = () => {
    pageSectionsRef.current.forEach(section => {
      if (section) section.classList.remove('active');
    });
    setCurrentPage(null);
  };

  useEffect(() => {
    // Add event listeners
    const handleMouseMove = (e) => handleMove(e);
    const handleMouseUp = (e) => handleEnd(e);
    const handleTouchMove = (e) => handleMove(e);
    const handleTouchEnd = (e) => handleEnd(e);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, arrowCenterX, arrowCenterY, activeTarget, inReleaseZone, stretchAmount]);

  return (
    <div className={`hero-section${shake ? ' shake' : ''}`}> {/* Add shake class */}
      {explosion && <div className="explosion-overlay"></div>}
      <NavigationTargets 
        navBoxesRef={navBoxesRef}
        onStart={handleStart}
      />
      <ReleaseZone releaseZoneRef={releaseZoneRef} />
      <BowAndArrow 
        arrowRef={arrowRef}
        bowRef={bowRef}
        onStart={handleStart}
        stretchAmount={stretchAmount}
      />
      <PageSections 
        pageSectionsRef={pageSectionsRef}
        onBack={goBack}
      />
    </div>
  );
}

export default App; 