"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

interface Deal {
    _id: string;
    title: string;
    description: string;
    category: string;
    discountDetails: string;
    logoUrl: string;
    isLocked: boolean;
}

const DealsPage = () => {
    // State variables
    const [deals, setDeals] = useState<Deal[]>([]);
    const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    // Fetch deals when component loads
    useEffect(() => {
        console.log('Fetching deals...');
        api.get('/deals')
            .then(res => {
                console.log('Got deals:', res.data.length);
                setDeals(res.data);
                setFilteredDeals(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching deals:', err);
                setLoading(false);
            });
    }, []);

    // Filter deals when search or category changes
    useEffect(() => {
        let result = deals;

        // Filter by search term
        if (search) {
            result = result.filter(deal =>
                deal.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filter by category
        if (category !== 'All') {
            result = result.filter(deal => deal.category === category);
        }

        console.log('Filtered to', result.length, 'deals');
        setFilteredDeals(result);
    }, [search, category, deals]);

    // Get unique categories
    const categories = ['All', ...Array.from(new Set(deals.map(d => d.category)))];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-white border-b border-zinc-800 pb-4">Deals</h1>

            {/* Filters section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 bg-zinc-900 p-4 rounded">
                {/* Search input */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-zinc-700 bg-zinc-800 text-white px-4 py-2 rounded md:w-1/3"
                />

                {/* Category dropdown */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-zinc-700 bg-zinc-800 text-white px-4 py-2 rounded md:w-1/4"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Loading state */}
            {loading ? (
                <p className="text-zinc-500">Loading...</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Map through filtered deals */}
                    {filteredDeals.map((deal) => (
                        <div
                            key={deal._id}
                            className="bg-zinc-900 border border-zinc-700 p-4 rounded hover:border-zinc-500"
                        >
                            <div className="flex justify-between mb-4">
                                <img src={deal.logoUrl} alt={deal.title} className="w-10 h-10 object-contain bg-white rounded p-1" />
                                {/* Show locked badge if deal is locked */}
                                {deal.isLocked && <span className="text-xs text-red-500 font-bold border border-red-500 px-2 py-1 rounded">LOCKED</span>}
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2">{deal.title}</h3>
                            <p className="text-zinc-400 text-sm mb-4 h-10 overflow-hidden">{deal.description}</p>

                            <div className="text-blue-400 text-sm font-bold mb-4">{deal.discountDetails}</div>

                            {/* Link to deal details */}
                            <Link
                                href={`/deals/${deal._id}`}
                                className="block text-center bg-zinc-800 text-white py-2 rounded hover:bg-zinc-700"
                            >
                                View
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DealsPage;
