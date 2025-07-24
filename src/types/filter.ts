export type Provider = "AWS" | "GCP" | "Azure" | "All";
export type LatencyRange = "all" | "low" | "medium" | "high";

export interface FilterState {
    provider: Provider;
    exchange: string;
    latency: LatencyRange;
    search: string;
    showMarkers: boolean;
    showConnections: boolean;
    showClusters: boolean;
}