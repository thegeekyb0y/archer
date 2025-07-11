import React from 'react';

const ReleaseZone = ({ releaseZoneRef }) => {
  return (
    <div
      className="release-zone w-full left-0 right-0 bottom-0 h-40 flex items-center justify-center text-xl"
      ref={releaseZoneRef}
      style={{ borderRadius: 0 }}
    >
      Release Zone
    </div>
  );
};

export default ReleaseZone; 