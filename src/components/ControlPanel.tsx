'use client';

import React from "react";
import { Provider, LatencyRange, FilterState } from "../types/filter";
import exchanges from "../data/exchanges.json";
import { Exchange } from "../types/exchange";

interface ControlPanelProps {
  state: FilterState;
  setState: (f: Partial<FilterState>) => void;
}

const allExchanges = exchanges as Exchange[];

const providers: Provider[] = ["All", "AWS", "GCP", "Azure"];
const latencyRanges: LatencyRange[] = ["all", "low", "medium", "high"];

export default function ControlPanel({ state, setState }: ControlPanelProps) {
  return (
    <div className="md:left-4 bg-cyan-900 bg-opacity-90 rounded text-white p-4 w-80 max-w-full z-20 font-sans">
      {/* Search */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold text-gray-100">
          Search:
        </label>
        <input
          type="text"
          value={state.search}
          onChange={e => setState({ search: e.target.value })}
          placeholder="Exchange or Region"
          className="w-full bg-gray-900 text-white border border-cyan-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-gray-500"
          spellCheck={false}
        />
      </div>

      {/* Exchange Select */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold text-gray-100">
          Exchange:
        </label>
        <select
          value={state.exchange}
          onChange={e => setState({ exchange: e.target.value })}
          className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="" className="bg-gray-900">All</option>
          {allExchanges.map((ex) => (
            <option key={ex.name} value={ex.name} className="bg-gray-900">
              {ex.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cloud Provider Select */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold text-gray-100">
          Cloud Provider:
        </label>
        <select
          value={state.provider}
          onChange={e => setState({ provider: e.target.value as Provider })}
          className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          {providers.map((provider) => (
            <option key={provider} value={provider} className="bg-gray-900">
              {provider}
            </option>
          ))}
        </select>
      </div>

      {/* Latency Range Select */}
      <div className="mb-5">
        <label className="block mb-2 font-semibold text-gray-100">
          Latency:
        </label>
        <select
          value={state.latency}
          onChange={e => setState({ latency: e.target.value as LatencyRange })}
          className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          {latencyRanges.map((l) => (
            <option key={l} value={l} className="bg-gray-900">
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Toggles */}
      <div className="mb-1 space-y-3">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={state.showMarkers}
            onChange={e => setState({ showMarkers: e.target.checked })}
            className="w-5 h-5 text-yellow-400 bg-gray-900 border-gray-700 rounded focus:ring-yellow-400"
          />
          <span className="text-gray-100 font-medium">Show Markers</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={state.showConnections}
            onChange={e => setState({ showConnections: e.target.checked })}
            className="w-5 h-5 text-yellow-400 bg-gray-900 border-gray-700 rounded focus:ring-yellow-400"
          />
          <span className="text-gray-100 font-medium">Show Latency Lines</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={state.showClusters}
            onChange={e => setState({ showClusters: e.target.checked })}
            className="w-5 h-5 text-yellow-400 bg-gray-900 border-gray-700 rounded focus:ring-yellow-400"
          />
          <span className="text-gray-100 font-medium">Show Cloud Region Clusters</span>
        </label>
      </div>
    </div>
  );
}