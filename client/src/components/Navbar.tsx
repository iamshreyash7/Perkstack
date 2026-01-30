"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const { user, logout, loading } = useAuth();

    if (loading) return null;

    return (
        <nav className="fixed top-0 w-full z-50 bg-zinc-900 border-b border-zinc-800 h-16 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
                <Link href="/" className="text-lg font-bold text-white">
                    PerkStack
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/deals" className="text-sm text-zinc-400 hover:text-white">
                        Deals
                    </Link>

                    {user ? (
                        <>
                            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white">
                                Dashboard
                            </Link>
                            <button
                                onClick={logout}
                                className="text-sm text-red-400 hover:underline"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm text-zinc-400 hover:text-white">
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-white text-black px-4 py-2 rounded text-sm font-bold"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
