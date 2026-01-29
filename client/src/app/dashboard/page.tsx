"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';

interface Claim {
    _id: string;
    dealId: {
        title: string;
        logoUrl: string;
        discountDetails: string;
    };
    status: string;
    redemptionCode: string;
    claimDate: string;
}

const DashboardPage = () => {
    const { user } = useAuth();
    const [claims, setClaims] = useState<Claim[]>([]);
    const [loading, setLoading] = useState(true);

    // Load user's claims when page loads
    useEffect(() => {
        if (user) {
            console.log('Loading claims for user:', user.email);
            api.get('/claims/my-claims')
                .then(res => {
                    console.log('Claims loaded:', res.data.length);
                    setClaims(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error loading claims:', err);
                    setLoading(false);
                });
        }
    }, [user]);

    // Don't show anything if not logged in
    if (!user) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-white">My Dashboard</h1>

            {/* Loading state */}
            {loading ? (
                <p className="text-zinc-500">Loading...</p>
            ) : claims.length === 0 ? (
                // No claims state
                <div className="bg-zinc-900 border border-zinc-700 p-8 rounded text-center">
                    <p className="text-zinc-400 mb-4">You have no claims.</p>
                    <Link href="/deals" className="text-blue-400 underline">Browse Deals</Link>
                </div>
            ) : (
                // Claims table
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-zinc-700 bg-zinc-900">
                        <thead>
                            <tr className="bg-zinc-800 text-white">
                                <th className="p-4 border-b border-zinc-700">Deal</th>
                                <th className="p-4 border-b border-zinc-700">Benefit</th>
                                <th className="p-4 border-b border-zinc-700">Status</th>
                                <th className="p-4 border-b border-zinc-700">Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Loop through claims */}
                            {claims.map((claim) => (
                                <tr key={claim._id} className="text-zinc-300">
                                    <td className="p-4 border-b border-zinc-700">{claim.dealId.title}</td>
                                    <td className="p-4 border-b border-zinc-700">{claim.dealId.discountDetails}</td>
                                    <td className="p-4 border-b border-zinc-700">
                                        {claim.status}
                                    </td>
                                    <td className="p-4 border-b border-zinc-700 font-mono">
                                        {/* Only show code if approved */}
                                        {claim.status === 'approved' ? claim.redemptionCode : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
