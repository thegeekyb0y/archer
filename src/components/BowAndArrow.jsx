import React from "react";

const BowAndArrow = ({
  arrowRef,
  bowRef,
  onStart,
  stretchAmount = 0,
  visible = true,
}) => {
  // Calculate the string's control points for the lower thread
  // The bow is 600px wide, 300px tall. The string is at y = 50% + 60px (below center)
  const bowWidth = 600;
  const bowHeight = 300;
  const stringY = bowHeight / 2 + 60;
  const leftX = 50;
  const rightX = bowWidth - 50;
  // The nock moves with stretchAmount
  const nockX = bowWidth / 2;
  const nockY = stringY + stretchAmount * 1.2;

  // For the main string (behind arrow), stretch visually with stretchAmount
  const stringTopY = bowHeight / 2 - 80;
  const stringBottomY = bowHeight / 2 + 80;
  const stringNockY = bowHeight / 2 + stretchAmount;

  return (
    <div className="bow-container" style={{ overflow: "visible" }}>
      <div className="bow" ref={bowRef}>
        {/* Left limb - proper recurve design */}
        <div className="bow-limb-left"></div>
        <div className="bow-limb-right"></div>
        {/* Bow grip/riser (center) */}
        <div className="bow-grip"></div>
        {/* Arrow rest */}
        <div className="arrow-rest"></div>
        {/* Bow string (main, behind arrow) */}
        <svg
          className="absolute left-0 top-0 pointer-events-none"
          width={bowWidth}
          height={bowHeight}
          style={{ zIndex: 2, position: "absolute" }}
        >
          {/* Main string (vertical, behind arrow) */}
          <polyline
            points={`50,${stringTopY} ${bowWidth / 2},${stringNockY} ${
              bowWidth - 50
            },${stringTopY}`}
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 4px #fff8)" }}
          />
        </svg>
        {/* Lower thread (white, below arrow) */}
        <svg
          className="absolute left-0 top-0 pointer-events-none"
          width={bowWidth}
          height={bowHeight}
          style={{ zIndex: 3, position: "absolute" }}
        >
          <polyline
            points={`${leftX},${stringY} ${nockX},${nockY} ${rightX},${stringY}`}
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.8"
            style={{ filter: "drop-shadow(0 0 6px #fff)" }}
          />
        </svg>
        {/* Bow string (original, for visual) */}
        <div className="bow-string"></div>
        {/* Vertical arrow pointing upward */}
        {visible && (
          <div className="arrow" ref={arrowRef} style={{ zIndex: 15 }}>
            <div className="arrow-head"></div>
            <div className="arrow-fletching"></div>
            <div
              className="arrow-nock"
              onMouseDown={onStart}
              onTouchStart={onStart}
              onDragStart={(e) => e.preventDefault()}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BowAndArrow;
