'use client';

import React, { useState } from 'react';
import Tooltip from './ToolTip/Tooltip';
import Map3D from './Map3D';
import { MarkerData } from '../types/marker';
import ControlPanel from './ControlPanel';
import { FilterState } from '../types/filter';

const initialFilters: FilterState = {
  provider: 'All',
  exchange: '',
  latency: 'all',
  search: '',
  showMarkers: true,
  showConnections: true
};

const Map3DWrapper = () => {
  const [hovered, setHovered] = useState<MarkerData | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [filters, setFilters] = useState(initialFilters);

  // Merging filter state updates
  const setState = (partial: Partial<FilterState>) =>
    setFilters(prev => ({ ...prev, ...partial }));

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#101622',
        overflow: 'hidden'
      }}
      onMouseMove={e => setCoords({ x: e.clientX, y: e.clientY })}
    >
      {/* 3D Map Area */}
      <Map3D setHovered={setHovered} hovered={hovered} filters={filters} />

      <ControlPanel state={filters} setState={setState} />

      {/* Show tooltip only when hovering */}
      {hovered && <Tooltip data={hovered} x={coords.x} y={coords.y} />}
    </div>
  );
};

export default Map3DWrapper;