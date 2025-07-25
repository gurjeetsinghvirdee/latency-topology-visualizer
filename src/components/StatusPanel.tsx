import React from "react";
import { div } from "three/tsl";

interface StatusPanelProps {
    markerCount: number;
    connectionCount: number;
    apiHealthy: boolean;
    lastUpdated?: Date;
}

export default function StatusPanel({
    markerCount,
    connectionCount,
    apiHealthy,
    lastUpdated
}: StatusPanelProps) {
    return (
        <div className="bg-cyan-900 text-xs rounded p-3 my-2 flex flex-col gap-1 font-mono text-white">
            <div>
                Markers: <span className="font-semibold">{markerCount}</span>
            </div>
            <div>
                Connections: <span className="font-semibold">{connectionCount}</span>
            </div>
            <div>
                Status:{" "}
                <span className={apiHealthy ? "text-green-400" : "text-red-400"}>
                    {apiHealthy ? "LIVE" : "OFFLINE"}
                </span>
            </div>
            {lastUpdated && (
                <div className="text-white text-xs">
                    Updated: {lastUpdated.toLocaleTimeString()}
                </div>
            )}
        </div>    
    );
}