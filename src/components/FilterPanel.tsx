'use client';

import React from 'react';
import { cn } from '../utils/index';

interface FilterPanelProps {
    isVisible: boolean;
    onClose: () => void;
    filters: {
        search?: string;
        exchange?: string;
        cloud?: string;
        latency?: string;
        showMarkers?: boolean;
        showLatencyLines?: boolean;
        showClusters?: boolean;
    };
    onFilterChange?: (filters: Partial<FilterPanelProps['filters']>) => void;
}

const EXCHANGES = [
    'All', 'Binance', 'Coinbase', 'Kraken', 'Bitfinex', 'Bittrex', 'Deribit', 'Bybit', 'OKX', 'Huobi', 'Bitstamp', 'Gate.io', 'Bitmex', 'KuCoin', 'Poloniex', 'Cypto.com', 'Upbit', 'WazirX', 'Coincheck', 'Bitso', 'Bithumb', 'Luno', 'Rain', 'Liquid', 'Bitbank', 'EXMO', 'Indodax', 'BitFlyer', 'UnoCoin', 'CoinDCX', 'Paxful'
];

const CLOUD_PROVIDERS = ['All', 'AWS', 'GCP', 'Azure'];
const LATENCY_OPTIONS = ['All', 'Low', 'Medium', 'High'];

export const FilterPanel: React.FC<FilterPanelProps> = ({
    isVisible,
    onClose,
    filters = {},
    onFilterChange,
}) => {
    const handleChange = (key: string, value: string | boolean) => {
        onFilterChange?.({ [key]: value });
    };

    return (
        <>
            <aside
                className={cn(
                    'fixed top-0 left-0 z-50 h-full w-72 bg-cyan-900 text-white p-4 overflow-y-auto transition-transform duration-300 ease-in-out shadow-lg',
                    isVisible ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-x1 font-bold'>Filters</h2>
                    <button
                        onClick={onClose}
                        className='text-white hover:text-red-400 transition-colors'
                        aria-label='Close Filter Panel'
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#ff0000"
                            className="w-5 h-5"
                        >
                            <path
                                d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                                fill="#0F0F0F"
                            />
                        </svg>
                    </button>
                </div>

                <div className='mb-4'>
                    <label htmlFor='search' className='block mb-1 font-semibold'>Search:</label>
                    <input
                        id='search'
                        type="text"
                        placeholder='Exchange or Region'
                        className='w-full px-2 py-1 rounded bg-gray-900 text-white'
                        value={filters.search || ''}
                        onChange={(e) => handleChange('search', e.target.value)}
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor='exchange' className='block mb-1 font-semibold'>Exchange:</label>
                    <select
                        id='exchange'
                        className='w-full px-2 py-1 rounded bg-gray-900 text-white'
                        value={filters.exchange || 'All'}
                        onChange={(e) => handleChange('exchange', e.target.value)}
                    >
                        {EXCHANGES.map((exchange) => (
                            <option key={exchange} value={exchange}>{exchange}</option>
                        ))}
                    </select>
                </div>

                <div className='mb-4'>
                    <label htmlFor='cloud' className='block mb-1 font-semibold'>Cloud Provider:</label>
                    <select
                        id='cloud'
                        className='w-full px-2 py-1 rounded bg-gray-900 text-white'
                        value={filters.cloud || 'All'}
                        onChange={(e) => handleChange('cloud', e.target.value)}
                    >
                        {CLOUD_PROVIDERS.map((cloud) => (
                            <option key={cloud} value="{cloud}">{cloud}</option>
                        ))}
                    </select>
                </div>

                <div className='mb-4'>
                    <label htmlFor='latency' className='block mb-1 font-semibold'>Latency:</label>
                    <select
                        id='latency'
                        className='w-full px-2 py-1 rounded bg-gray-900 text-white'
                        value={filters.latency || 'All'}
                        onChange={(e) => handleChange('latency', e.target.value)}
                    >
                        {LATENCY_OPTIONS.map((latency) => (
                            <option key={latency} value={latency}>{latency}</option>
                        ))}
                    </select>
                </div>

                <div className='space-y-2'>
                    <label className='flex items-center'>
                        <input
                            type="checkbox"
                            className='mr-2'
                            checked={filters.showMarkers ?? true}
                            onChange={(e) => handleChange('showMarkers', e.target.checked)}
                        />
                        Show Markers
                    </label>
                    <label className='flex items-center'>
                        <input
                            type="checkbox"
                            className='mr-2'
                            checked={filters.showLatencyLines ?? true}
                            onChange={(e) => handleChange('showLatencyLines', e.target.checked)}
                        />
                        Show Latency Lines
                    </label>
                    <label className='flex items-center'>
                        <input
                            type="checkbox"
                            className='mr-2'
                            checked={filters.showClusters ?? true}
                            onChange={(e) => handleChange('showClusters', e.target.checked)}
                        />
                        Show Cloud Region Clusters
                    </label>
                </div>
            </aside>

            <div className='text-green-400 mt-4 text-sm md:hidden'>
                Please select an exchange or region to view latency trends.
            </div>
        </>
    )
}