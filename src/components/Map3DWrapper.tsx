'use client';

import React, { useState, useMemo } from 'react';
import Map3D from './Map3D';
import ControlPanel from './ControlPanel';
import Tooltip from './ToolTip/Tooltip';
import LatencyChart from './LatencyChart';
import StatusPanel from './StatusPanel';
// Replace hook
import { useRealTimeMockLatency } from '../hooks/useLiveLatency';
import { MarkerData } from '../types/marker';
import { FilterState } from '../types/filter';
import { Exchange } from '../types/exchange';
import { Region } from '../types/Regions';
import exchanges from '../data/exchanges.json';
import regions from '../data/regions.json';

export default function Map3DWrapper() {
  const [hovered, setHovered] = useState<MarkerData | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<{
    exchange: string | null;
    region: string | null;
  }>({ exchange: null, region: null });

  const initialFilters: FilterState = {
    provider: 'All',
    exchange: '',
    latency: 'all',
    search: '',
    showMarkers: true,
    showConnections: true,
    showClusters: true,
  }

  const [filters, setFilters] = useState(initialFilters);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const setState = (partial: Partial<FilterState>) => {
    setFilters((prev: FilterState) => ({ ...prev, ...partial }));
  };

  // Simulated mock latency feed
  const { history, loading } = useRealTimeMockLatency(1000);

  const handleConnectionSelect = (exchange: string, region: string) => {
    setSelectedConnection({ exchange, region })
  }

  const filteredExchanges = useMemo(
    () =>
      exchanges.filter(
        (ex: Exchange) =>
          (filters.provider === 'All' || ex.provider === filters.provider) &&
          (filters.exchange || ex.name === filters.exchange) &&
          (filters.search === "" ||
            ex.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            ex.location.toLowerCase().includes(filters.search.toLowerCase()))
      ),
    [filters.provider, filters.exchange, filters.search]
  );

  const filteredRegions = useMemo(
    () =>
      regions.filter(
        (region: Region) =>
          (filters.provider === 'All' || region.provider === filters.provider) &&
          (filters.search === "" ||
            region.location.toLowerCase().includes(filters.search.toLowerCase()) ||
            region.code.toLowerCase().includes(filters.search.toLowerCase()))
      ),
    [filters.provider, filters.search]
  );

  const markerCount = filteredExchanges.length + filteredRegions.length;

  const connectionCount = history.filter((conn) => {
    if (filters.latency === "low" && !(conn.latency < 50)) return false;
    if (filters.latency === "medium" && !(conn.latency >= 50 && conn.latency <= 100)) return false;
    if (filters.latency === "high" && !(conn.latency > 100)) return false;
    return true;
  }).length;

  return (
    <div className='flex flex-col md:flex-row h-screen w-full overflow-hidden p-1'>
      <div className='w-full md:w-[300px] flex-shrink-0 bg-[#092E42] text-white overflow-y-auto'>
        <StatusPanel 
          markerCount={markerCount}
          connectionCount={connectionCount}
          apiHealthy={!loading}
          lastUpdated={new Date()}
        />

        <ControlPanel state={filters} setState={setState} />

        <LatencyChart
          history={history}
          loading={loading}
          selectedExchange={selectedConnection.exchange}
          selectedRegion={selectedConnection.region}
        />
      </div>

      <main
        style={{ flexGrow: 1, position: 'relative' }}
        onMouseMove={e => setCoords({ x: e.clientX, y: e.clientY })}
      >
        <Map3D 
          filters={filters}
          setHovered={setHovered}
          selectedConnection={selectedConnection}
          onConnectionSelect={handleConnectionSelect}
        />
        {hovered && (
          <Tooltip data={hovered} x={coords.x} y={coords.y} />
        )}
      </main>
    </div>
  );
}