'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Wallet } from 'lucide-react';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
        <Wallet className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-white">Tether Bank</h1>
    </div>
  );
}