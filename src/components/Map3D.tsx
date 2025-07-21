'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import exchanges from '../data/exchanges.json';
import regions from '../data/regions.json';
import { MarkerData } from '../types/marker';
import { latLngToXYZ } from '../utils/latLngToXYZ';

interface Map3DProps {
  setHovered: (marker: MarkerData | null) => void;
}

const Map3D: React.FC<Map3DProps> = ({ setHovered }) => {
  const [hoveredMarker, setHoveredMarker] = useState<MarkerData | null>(null);

  const exchangeMarkers: MarkerData[] = exchanges.map((exchange) => ({
    name: exchange.name,
    location: exchange.location,
    lat: exchange.lat,
    lng: exchange.lng,
    provider: exchange.provider,
    type: 'exchange',
  }));

  const regionMarkers: MarkerData[] = regions.map((region) => ({
    name: region.code,
    location: region.location,
    lat: region.lat,
    lng: region.lng,
    provider: region.provider,
    type: 'region',
  }));

  const allMarkers: MarkerData[] = [...exchangeMarkers, ...regionMarkers];

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 3] }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        {/* Earth Sphere */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color="#1e90ff" wireframe />
        </mesh>

        {/* Markers */}
        {allMarkers.map((marker, index) => {
          const pos = latLngToXYZ(marker.lat, marker.lng, 1.01);
          return (
            <mesh
              key={index}
              position={pos}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(marker);
                setHoveredMarker(marker);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHovered(null);
                setHoveredMarker(null);
              }}
            >
              <sphereGeometry args={[0.015, 16, 16]} />
              <meshStandardMaterial color={marker.type === 'exchange' ? 'orange' : 'lime'} />
            </mesh>
          );
        })}

        <OrbitControls enableZoom enablePan />
      </Canvas>
    </div>
  );
};

export default Map3D;