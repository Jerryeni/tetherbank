'use client';

import { useUser } from '@/hooks/useUser';
import { CheckCircle } from 'lucide-react';

export function Header() {
  const { user } = useUser();
  
  return (
    <header className="bg-[#0A0B1E] border-b border-gray-800">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold">TethBank</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#1A1B2E] px-3 py-1 rounded-full">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">Connected</span>
          </div>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {user?.id?.slice(0, 2).toUpperCase() || 'DS'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}