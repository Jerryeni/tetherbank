'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already onboarded
    const isOnboarded = localStorage.getItem('isOnboarded');
    if (isOnboarded) {
      router.push('/');
    }
  }, [router]);

  return (
    <div className="min-h-screen z-50 bg-[#EBF8FF] absolute flex flex-col max-w-md mx-auto">
    <main className="flex-1 ">
      {children}
    </main>
  </div>
  );
}