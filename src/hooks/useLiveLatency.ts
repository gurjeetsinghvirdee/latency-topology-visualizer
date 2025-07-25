import { useEffect, useState, useRef } from "react";
import mockLatency from "../data/mockLatency.json"; // Your local JSON file

// Update interface to match your structure
export interface LatencyPoint {
  timestamp: number;
  latency: number;
  exchange: string;
  region: string;
}

export function useRealTimeMockLatency(
  intervalMs = 10000,
  loop = false
): { history: LatencyPoint[]; latest: LatencyPoint | null; loading: boolean } {
  const [history, setHistory] = useState<LatencyPoint[]>([]);
  const [latest, setLatest] = useState<LatencyPoint | null>(null);
  const [loading, setLoading] = useState(true);
  const indexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoading(false);

    function streamNext() {
      if (indexRef.current >= mockLatency.length) {
        if (loop) {
          indexRef.current = 0;
          setHistory([]);
        } else {
          clearInterval(intervalRef.current!);
          return;
        }
      }

      const raw = mockLatency[indexRef.current];

      // Add `timestamp` to match LatencyPoint type
      const point: LatencyPoint = {
        ...raw, // Convert to milliseconds if needed
        timestamp: Date.now(),
      };

      setLatest(point);
      setHistory((prev) => [...prev, point]);
      indexRef.current++;
    }

    intervalRef.current = setInterval(streamNext, intervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [intervalMs, loop]);

  return { history, latest, loading };
}