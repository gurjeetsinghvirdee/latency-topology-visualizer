'use client';

import { useRef, useMemo } from "react";
import { useFrame } from '@react-three/fiber';
import * as THREE from "three";

interface LatencyLineProps {
  start: [number, number, number];
  end: [number, number, number];
  latency: number;
  onPointerDown?: (e: THREE.Event) => void; // Fixed here
}

function getColor(latency: number): string {
  if (latency < 50) return "#32CD32"; // lime green
  if (latency < 100) return "#FFD700"; // gold/yellow
  return "#FF4500"; // orange red
}

export default function LatencyConnection({ 
  start, 
  end, 
  latency, 
  onPointerDown, 
}: LatencyLineProps) {
  const materialRef = useRef<THREE.LineBasicMaterial | null>(null);

  const positions = useMemo(() => new Float32Array([...start, ...end]), [start, end]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.opacity =
        0.4 + 0.6 * Math.abs(Math.sin(clock.getElapsedTime() * (0.5 + latency / 100)));
    }
  });

  return (
    <line onPointerDown={onPointerDown}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={2}
        />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        color={getColor(latency)}
        linewidth={2}
        opacity={1}
        transparent
      />
    </line>
  );
}