"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

export default function Map3D() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.6} />
            <directionalLight intensity={0.8} position={[5, 5, 5]} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade />

            {/* Placeholder for the globe */}
            <mesh>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color="#1f2937" wireframe />
            </mesh>
        </Canvas>
    );
}