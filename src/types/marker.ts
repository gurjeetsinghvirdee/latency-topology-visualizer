export interface MarkerData {
    name: string;
    location: string;
    lat: number;
    lng: number;
    provider: string;
    type: 'exchange' | 'region';
};