'use client';

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
  const inputStyle = {
    backgroundColor: "#23242a",
    color: "#fff",
    border: "1px solid #444",
  };

  const selectStyle = {
    ...inputStyle,
    borderRadius: 5,
    padding: "6px 8px",
    marginLeft: 8,
    appearance: "none" as const,
  };

  return (
    <aside
      style={{
        position: "absolute",
        top: 24,
        left: 24,
        background: "#212736e6",
        color: "#fff",
        padding: 20,
        borderRadius: 15,
        zIndex: 20,
        width: 320,
        fontFamily: "sans-serif",
        boxShadow: "0 2px 20px rgba(0,0,0,0.14)",
      }}
    >
      <div style={{ marginBottom: 18 }}>
        <label>
          <b>Search:</b>
          <input
            type="text"
            value={state.search}
            onChange={e => setState({ search: e.target.value })}
            style={{ ...inputStyle, marginLeft: 8, borderRadius: 6, padding: "6px 10px", width: 160 }}
            placeholder="Exchange or region"
          />
        </label>
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>Exchange:</b>
        <select
          value={state.exchange}
          onChange={e => setState({ exchange: e.target.value })}
          style={selectStyle}
        >
          <option value="" style={inputStyle}>All</option>
          {allExchanges.map((ex) => (
            <option
              key={ex.name}
              value={ex.name}
              style={inputStyle}
            >
              {ex.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>Cloud Provider:</b>
        <select
          value={state.provider}
          onChange={e => setState({ provider: e.target.value as Provider })}
          style={selectStyle}
        >
          {providers.map(provider => (
            <option key={provider} value={provider} style={inputStyle}>
              {provider}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <b>Latency:</b>
        <select
          value={state.latency}
          onChange={e => setState({ latency: e.target.value as LatencyRange })}
          style={selectStyle}
        >
          {latencyRanges.map(l => (
            <option key={l} value={l} style={inputStyle}>
              {l[0].toUpperCase() + l.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={state.showMarkers}
            onChange={e => setState({ showMarkers: e.target.checked })}
          />
          <span style={{ marginLeft: 8 }}>Show Markers</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={state.showConnections}
            onChange={e => setState({ showConnections: e.target.checked })}
          />
          <span style={{ marginLeft: 8 }}>Show Latency Lines</span>
        </label>
      </div>
    </aside>
  );
}