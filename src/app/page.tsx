"use client"
import dynamic from 'next/dynamic';

// Dynamically import HomePage with SSR disabled
const HomePage = dynamic(() => import('@/components/containers/home-page'), { ssr: false });

export default function Home() {
  return <HomePage />;
}