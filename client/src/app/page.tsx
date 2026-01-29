"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[70vh] bg-zinc-950 border-b border-zinc-800 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Startup Deals Platform
        </h1>
        <p className="text-lg text-zinc-400 mb-8 max-w-xl">
          Get discounts on SaaS tools like AWS and Notion.
          Simple, effective savings for your business.
        </p>

        <div className="flex gap-4">
          <Link
            href="/deals"
            className="bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200"
          >
            Browse Deals
          </Link>
          <Link
            href="/register"
            className="border border-white text-white px-6 py-3 rounded font-bold hover:bg-white/10"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-zinc-900 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-800 p-6 rounded">
            <h3 className="text-xl font-bold mb-2 text-white">Software Deals</h3>
            <p className="text-zinc-400">We have partnered with top companies to bring you discounts.</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded">
            <h3 className="text-xl font-bold mb-2 text-white">Startup Focused</h3>
            <p className="text-zinc-400">Deals curated specifically for early-stage founders.</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded">
            <h3 className="text-xl font-bold mb-2 text-white">Easy Claims</h3>
            <p className="text-zinc-400">Just click a button to get your redemption code.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
