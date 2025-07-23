'use client';

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import exchanges from "../data/exchanges.json";
import regions from "../data/regions.json";
import latencyData from "../data/mockLatency.json";
import { latLngToXYZ } from "../utils/latLngToXYZ";
import { offsetCloseMarkers } from "../utils/offsetCloseMarkers";
import LatencyConnection from "./LatencyConnection";
import { MarkerData } from "../types/marker";
import { FilterState } from "../types/filter";

const providerColors: Record<string, string> = {
  AWS: "#FFB400",
  GCP: "#48C6EF",
  Azure: "#24FF47",
  Default: "#FFFFFF",
};

interface Map3DProps {
  setHovered: React.Dispatch<React.SetStateAction<MarkerData | null>>;
  filters: FilterState;
}

function Markers({
  setHovered,
  filters,
  exchangePositions,
  regionPositions,
}: {
  setHovered: React.Dispatch<React.SetStateAction<MarkerData | null>>;
  filters: FilterState;
  exchangePositions: [number, number, number][];
  regionPositions: [number, number, number][];
}) {
  const cameraDistance = useThree((state) => state.camera.position.length());
  const markerScale = Math.max(0.02, Math.min(0.06, 0.3 / cameraDistance));

  // Filtered Exchanges and Regions
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

  return (
    <>
      {/* Exchanges */}
      {filters.showMarkers &&
        filteredExchanges.map((exchange, idx) => {
          const [x, y, z] = exchangePositions[idx];
          const color =
            providerColors[exchange.provider] || providerColors.Default;
          return (
            <group key={`exchange-${exchange.name}`} position={[x, y, z]}>
              {/* Halo */}
              <mesh>
                <sphereGeometry args={[markerScale * 1.5, 16, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.35} />
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
          const [x, y, z] = regionPositions[idx];
          const color =
            providerColors[region.provider] || providerColors.Default;
          return (
            <mesh
              key={`region-${region.code || idx}`}
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

export default function Map3D({ setHovered, filters }: Map3DProps) {
  // Prepare filtered exchanges & regions for positions
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

  // Compute offset positions
  const exchangePositions = filteredExchanges.map((m) => latLngToXYZ(m.lat, m.lng));
  const regionPositions = filteredRegions.map((m) => latLngToXYZ(m.lat, m.lng));
  const combinedPositions = [...exchangePositions, ...regionPositions];
  const adjustedPositions = offsetCloseMarkers(combinedPositions, 0.07);
  const adjustedExchangePositions = adjustedPositions.slice(0, exchangePositions.length);
  const adjustedRegionPositions = adjustedPositions.slice(exchangePositions.length);

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

      {/* Draw Latency Connections */}
      {filters.showConnections &&
        latencyData.map((conn) => {
          // Find indexes of filtered markers
          const exchangeIndex = filteredExchanges.findIndex(ex => ex.name === conn.exchange);
          const regionIndex = filteredRegions.findIndex(r => r.code === conn.region);
          if (exchangeIndex === -1 || regionIndex === -1) return null;

          // Filter lines by latency range selection
          if (filters.latency === "low" && conn.latency >= 50) return null;
          if (filters.latency === "medium" && (conn.latency < 50 || conn.latency > 100)) return null;
          if (filters.latency === "high" && conn.latency <= 100) return null;

          return (
            <LatencyConnection
              key={`${conn.exchange}-${conn.region}`}
              start={adjustedExchangePositions[exchangeIndex]}
              end={adjustedRegionPositions[regionIndex]}
              latency={conn.latency}
            />
          );
        })
      }

      <Markers
        setHovered={setHovered}
        filters={filters}
        exchangePositions={adjustedExchangePositions}
        regionPositions={adjustedRegionPositions}
      />
    </Canvas>
  );
}