'use client';

import React from 'react';
import './Tooltip.css';

interface TooltipProps {
    data: {
        name: string;
        location: string;
        provider: string;
        type: string;
    } | null;
    x: number;
    y: number;
}

export default function Tooltip({ data, x, y}: TooltipProps) {
    if (!data) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: y + 10,
                left: x + 10,
                backgroundColor: '#111827cc',
                padding: '8px 12px',
                borderRadius: 6,
                color: 'white',
                fontSize: 14,
                pointerEvents: 'none',
                zIndex: 1000,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
        >
            <strong>{data.name}</strong>
            <br />
            Location: {data.location}
            <br />
            Provider: {data.provider}
            <br />
            Type: {data.type}
        </div>
    );
}