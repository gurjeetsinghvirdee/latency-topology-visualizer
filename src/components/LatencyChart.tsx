'use client';

import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface LatencyPoint {
  timestamp: number;
  latency: number;
}

interface LatencyChartProps {
  history: LatencyPoint[];
  loading: boolean;
  selectedExchange: string | null;
  selectedRegion: string | null;
}

function formatTime(ts: number) {
  const d = new Date(ts * 1000);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function LatencyChart({
  history,
  loading,
  selectedExchange,
  selectedRegion
}: LatencyChartProps) {
  if (!selectedExchange || !selectedRegion) {
    return (
      <div style={{ padding: 20, color: '#eee' }}>
        Please select an exchange and region to view latency trends.
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: 20, color: '#eee' }}>
        Loading data...
      </div>
    );
  }

  if (!history.length) {
    return (
      <div style={{ padding: 20, color: '#eee' }}>
        No latency data available.
      </div>
    );
  }

  const latencies = history.map((p) => p.latency);
  const min = Math.min(...latencies);
  const max = Math.max(...latencies);
  const avg = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);

  return (
    <aside
      style={{
        position: 'absolute',
        bottom: 95,
        left: 10,
        backgroundColor: '#555A6F',
        borderRadius: 5,
        padding: 24,
        width: 340,
        color: '#8ffffb',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        Latency Trends: {selectedExchange} - {selectedRegion}
      </h2>
      <p>
        <strong>Min:</strong> {min} ms | <strong>Max:</strong> {max} ms |{' '}
        <strong>Avg:</strong> {avg} ms
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={history}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTime}
            stroke="#8ffffb"
            minTickGap={20}
          />
          <YAxis
            domain={['dataMin - 10', 'dataMax + 10']}
            stroke="#8ffffb"
            allowDecimals={false}
          />
          <Tooltip
            labelFormatter={(label) =>
              new Date(label * 1000).toLocaleString()
            }
            contentStyle={{ backgroundColor: '#333', borderRadius: 6 }}
            labelStyle={{ color: '#eee' }}
            itemStyle={{ color: '#eee' }}
          />
          <Line
            type="monotone"
            dataKey="latency"
            stroke="#FFB400"
            strokeWidth={3}
            dot={false}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </aside>
  );
}