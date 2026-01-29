"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface Deal {
    _id: string;
    title: string;
    description: string;
    category: string;
    discountDetails: string;
    logoUrl: string;
    isLocked: boolean;
    eligibilityCriteria: string;
}

const DealDetailsPage = () => {
    const { id } = useParams();
    const [deal, setDeal] = useState<Deal | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    // Load deal data
    useEffect(() => {
        if (id) {
            console.log('Loading deal:', id);
            api.get(`/deals/${id}`)
                .then(res => {
                    console.log('Deal loaded:', res.data.title);
                    setDeal(res.data);
                })
                .catch(err => console.error('Error loading deal:', err));
        }
    }, [id]);

    // Handle claim button click
    const handleClaim = () => {
        // Check if user is logged in
        if (!user) {
            console.log('User not logged in, redirecting...');
            router.push('/login');
            return;
        }

        console.log('Claiming deal...');
        api.post('/claims', { dealId: deal?._id })
            .then(() => {
                console.log('Claim successful!');
                alert('Deal Claimed! Check Dashboard.');
                router.push('/dashboard');
            })
            .catch(err => {
                console.error('Claim failed:', err);
                alert(err.response?.data?.message || 'Error');
            });
    };

    // Show loading state
    if (!deal) return <div className="p-8">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Back button */}
            <Link href="/deals" className="text-blue-400 hover:underline mb-4 block">Back</Link>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded">
                {/* Deal header */}
                <div className="flex gap-6 mb-6">
                    <img src={deal.logoUrl} alt={deal.title} className="w-20 h-20 bg-white p-2 rounded" />
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">{deal.title}</h1>
                        <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded text-sm">{deal.category}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-zinc-300 text-lg mb-8">{deal.description}</p>

                {/* Benefit box */}
                <div className="bg-zinc-950 p-4 rounded mb-8 border border-zinc-800">
                    <h3 className="text-zinc-500 text-sm uppercase mb-1">Benefit</h3>
                    <p className="text-xl font-bold text-white">{deal.discountDetails}</p>
                </div>

                {/* Check if deal is locked and user not logged in */}
                {deal.isLocked && !user ? (
                    <div className="border border-red-900 bg-red-900/10 p-4 rounded text-center">
                        <p className="text-red-400 font-bold mb-2">Locked Deal</p>
                        <Link href="/register" className="text-white bg-red-800 px-4 py-2 rounded inline-block">Unlock Access</Link>
                    </div>
                ) : (
                    <button
                        onClick={handleClaim}
                        className="w-full bg-white text-black font-bold py-3 rounded hover:bg-gray-200"
                    >
                        Claim Deal
                    </button>
                )}
            </div>
        </div>
    );
};

export default DealDetailsPage;
