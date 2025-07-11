import React from 'react';

const ReleaseZone = ({ releaseZoneRef }) => {
  return (
    <div
      className="release-zone"
      ref={releaseZoneRef}
      style={{
        width: '82.5vw', // 1.65x of 50vw (previous full width was 50vw, now 82.5vw)
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: 0,
        position: 'absolute',
        bottom: 0,
        height: '160px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',
      }}
    >
      Release Zone
    </div>
  );
};

export default ReleaseZone; 