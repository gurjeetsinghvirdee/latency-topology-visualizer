/**
 * Converts latitude and longitude to 3D coordinates on sphere.
 * 
 * @param lat - Latitude in degrees
 * @param lng - Longitude in degrees
 * @param radius - Radius of the sphere (default is 1.5)
 * @return [x, y, z] coordinates in 3D space
 */

export function latLngToXYZ(lat: number, lng: number, radius = 1.5): [number, number, number] {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return [x, y, z];
}