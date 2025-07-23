import { useState, useEffect } from 'react';

export interface LatencyPoint {
    timestamp: number;
    latency: number;
}

export interface LatencyHistory {
    exchange: string;
    region: string;
    history: LatencyPoint[];
}

export function generateMockLatencyPoints(hours = 24, points = 50): LatencyPoint[] {
    const now = Math.floor(Date.now() / 1000);
    const interval = Math.floor((hours * 3600) / points);
    let lastLatency = 50;

    const data: LatencyPoint[] = [];

    for (let i = points - 1; i >= 0; i--) {
        const latency = Math.max(
            10, 
            Math.min(200, lastLatency + (Math.random() - 0.5) * 10)
        );
        data.push({
            timestamp: now - i * interval,
            latency: Math.round(latency),
        });
        lastLatency = latency;
    }
    return data;
}

export function useLatencyHistory(
    exchange: string | null,
    region: string | null,
    timeRangeHours: 24
): { history: LatencyPoint[]; loading: boolean } {
    const [history, setHistory] = useState<LatencyPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!exchange || !region) {
            setHistory([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const data = generateMockLatencyPoints(timeRangeHours);
            setHistory(data);
            setLoading(false);
        }, 500);
    }, [exchange, region, timeRangeHours]);

    return { history, loading };
}