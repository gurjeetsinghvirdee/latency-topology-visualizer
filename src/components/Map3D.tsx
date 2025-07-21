'use client';

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import exchanges from "../data/exchanges.json";
import regions from "../data/regions.json";
import { latLngToXYZ } from "../utils/latLngToXYZ";
import { MarkerData } from "../types/marker";
import { FilterState } from "../types/filter";
import { offsetCloseMarkers } from "../utils/offsetCloseMarkers";

const providerColors: Record<string, string> = {
  AWS: "#FFB400",
  GCP: "#48C6EF",
  Azure: "#24FF47",
  Default: "#FFFFFF"
};

interface Map3DProps {
  setHovered: React.Dispatch<React.SetStateAction<MarkerData | null>>;
  hovered: MarkerData | null;
  filters: FilterState;
}

function Markers({
  setHovered,
  filters,
}: {
  setHovered: React.Dispatch<React.SetStateAction<MarkerData | null>>;
  filters: FilterState;
}) {
  const cameraDistance = useThree((state) => state.camera.position.length());
  const markerScale = Math.max(0.02, Math.min(0.06, 0.3 / cameraDistance));

  // Filter exchanges and regions
  const filteredExchanges = exchanges.filter(
    (ex) =>
      (filters.provider === "All" || ex.provider === filters.provider) &&
      (!filters.exchange || ex.name === filters.exchange) &&
      (filters.search === "" ||
        ex.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        ex.location.toLowerCase().includes(filters.search.toLowerCase()))
  );

  const filteredRegions = regions.filter(
    (region) =>
      (filters.provider === "All" || region.provider === filters.provider) &&
      (filters.search === "" ||
        region.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        region.code?.toLowerCase().includes(filters.search.toLowerCase()))
  );

  // Get original positions
  const exchangePositions = filteredExchanges.map((marker) =>
    latLngToXYZ(marker.lat, marker.lng)
  );
  const regionPositions = filteredRegions.map((marker) =>
    latLngToXYZ(marker.lat, marker.lng)
  );

  // Combine and offset both sets
  const combined = [...exchangePositions, ...regionPositions];
  const adjusted = offsetCloseMarkers(combined, 0.07);

  // Split adjusted positions back into two sets
  const adjustedExchangePos = adjusted.slice(0, exchangePositions.length);
  const adjustedRegionPos = adjusted.slice(exchangePositions.length);

  return (
    <>
      {/* Exchanges */}
      {filters.showMarkers &&
        filteredExchanges.map((exchange, idx) => {
          const [x, y, z] = adjustedExchangePos[idx];
          const color =
            providerColors[exchange.provider] || providerColors.Default;

          return (
            <group key={`exchange-${idx}`} position={[x, y, z]}>
              {/* Halo */}
              <mesh>
                <sphereGeometry args={[markerScale * 1.5, 16, 16]} />
                <meshBasicMaterial
                  color={color}
                  transparent
                  opacity={0.35}
                />
              </mesh>
              {/* Marker */}
              <mesh
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHovered({
                    type: "exchange",
                    name: exchange.name,
                    location: exchange.location,
                    provider: exchange.provider,
                    lat: exchange.lat,
                    lng: exchange.lng,
                  });
                }}
                onPointerOut={() => setHovered(null)}
                scale={[markerScale, markerScale, markerScale]}
              >
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.8}
                  metalness={0.9}
                  roughness={0.2}
                />
              </mesh>
            </group>
          );
        })}

      {/* Regions */}
      {filters.showMarkers &&
        filteredRegions.map((region, idx) => {
          const [x, y, z] = adjustedRegionPos[idx];
          const color =
            providerColors[region.provider] || providerColors.Default;

          return (
            <mesh
              key={`region-${idx}`}
              position={[x, y, z]}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered({
                  type: "region",
                  name: region.code,
                  location: region.location,
                  provider: region.provider,
                  lat: region.lat,
                  lng: region.lng,
                });
              }}
              onPointerOut={() => setHovered(null)}
              scale={[markerScale, markerScale, markerScale]}
            >
              <boxGeometry args={[0.04, 0.04, 0.04]} />
              <meshStandardMaterial color={color} />
            </mesh>
          );
        })}
    </>
  );
}

export default function Map3D({ setHovered, hovered, filters }: Map3DProps) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={1500} fade speed={1} />
      <OrbitControls enableZoom enableRotate />
      {/* Globe */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial color="#1a1a1a" wireframe />
      </mesh>
      <Markers setHovered={setHovered} filters={filters} />
    </Canvas>
  );
}