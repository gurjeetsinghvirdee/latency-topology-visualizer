'use client';

import React, { useState } from 'react';
import Map3D from './Map3D';
import ControlPanel from './ControlPanel';
import Tooltip from './ToolTip/Tooltip';
import LatencyChart from './LatencyChart';
import { useLatencyHistory } from '../hooks/useLatencyData';
import { MarkerData } from '../types/marker';
import { FilterState } from '../types/filter';

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
  }

  const [filters, setFilters] = useState(initialFilters);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const setState = (partial: Partial<FilterState>) => {
    setFilters((prev: FilterState) => ({ ...prev, ...partial }));
  };

  const { history, loading } = useLatencyHistory(
    selectedConnection.exchange,
    selectedConnection.region,
    24
  );

  const handleConnectionSelect = (
    exchange: string,
    region: string
  ) => {
    setSelectedConnection({ exchange, region });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <div
        style={{
          width: 360,
          backgroundColor: '#202435',
          color: '#eee',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          padding: 24,
          overflowY: 'auto'
        }}
      >
        <ControlPanel state={filters} setState={setState} />
        <LatencyChart 
          history={history}
          loading={loading}
          selectedExchange={selectedConnection.exchange}
          selectedRegion={selectedConnection.region}
        />
      </div>

      <div 
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
      </div>
    </div>
  );
}