export function offsetCloseMarkers(
    positions: [number, number, number][],
    minDistance: 0.07
): [number, number, number][] {
    const adjusted = positions.map(pos => [...pos] as [number, number, number]);
    const n = adjusted.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const dx = adjusted[i][0] - adjusted[j][0];
            const dy = adjusted[i][1] - adjusted[j][1];
            const dz = adjusted[i][2] - adjusted[j][2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist > 0 && dist < minDistance) {
                const unit = [dx / dist, dy / dist, dz / dist];
                const offset = (minDistance - dist) / 2;
                for (let k = 0; k < 3; k++) {
                    adjusted[i][k] =+ offset * unit[k];
                    adjusted[j][k] -= offset * unit[k];
                }
            }
        }
    }
    return adjusted;
}