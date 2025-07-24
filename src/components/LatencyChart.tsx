'use client';

import React from "react";
import { CartesianGrid, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line } from "recharts";

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
  return d.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' });
}

export default function LatencyChart({
  history,
  loading,
  selectedExchange,
  selectedRegion
}: LatencyChartProps) {
  if (!selectedExchange || !selectedRegion) {
    return (
      <section className="bg-cyan-900 p-4 mb-8 shadow-lg w-full min-h-[250px] flex items-center justify-center text-green-300 select-none">
        Please select an exchange and region to view latency trends.
      </section>
    );
  }

  if (loading) {
    return (
      <section className="bg-cyan-900 p-6 mb-8 shadow-lg w-full min-h-[250px] flex items-center justify-center text-white select-none">
        Loading data...
      </section>
    );
  }

  if (!history.length) {
    return (
      <section className="p-6 mb-8 shadow-lg w-full min-h-[250px] flex items-center justify-center text-green-300 select-none">
        No latency data available for {selectedExchange} in {selectedRegion}
      </section>
    );
  }

  const latencies = history.map((p) => p.latency);
  const min = Math.min(...latencies);
  const max = Math.max(...latencies)
  const avg = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);

  return (
    <section className="bg-cyan-900 bg-opacity-90 rounded-lg mb-8 shadow-lg w-full p-5 max-w-md text-white font-medium font-inter select-none">
      <h2 className="text-xl font-semibold mb-2">
        Latency Trends: <span className="text-white">{selectedExchange}</span>
      </h2>
      <p className="mb-4">
        <strong className="text-green-400">Min:</strong> {min} ms &nbsp;|&nbsp;
        <strong className="text-red-400">Max:</strong> {max} ms &nbsp;|&nbsp;
        <strong>Avg:</strong> {avg} ms
      </p>
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
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
              width={40}
            />
            <Tooltip
              labelFormatter={(label) => 
                new Date(label * 1000).toLocaleString()
              }
              contentStyle={{ backgroundColor: '#1e293b', borderRadius: 6 }}
              labelStyle={{ color: '#e0e7ff' }}
              itemStyle={{ color: '#e0e7ff' }}
            />
            <Line 
              type="monotone"
              dataKey="latency"
              stroke="#ffb400"
              strokeWidth={3}
              dot={false}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

