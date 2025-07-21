'use client';

import React, { useState } from 'react';
import Map3D from './Map3D';
import { MarkerData } from '../types/marker';

const Map3DWrapper = () => {
  const [hovered, setHovered] = useState<MarkerData | null>(null);

  return (
    <>
      <Map3D setHovered={setHovered} />
      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            background: '#111',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '6px',
            zIndex: 1000
          }}
        >
          <div><strong>{hovered.name}</strong></div>
          <div>{hovered.location}</div>
          <div>{hovered.provider}</div>
          <div>{hovered.type}</div>
        </div>
      )}
    </>
  );
};

export default Map3DWrapper;