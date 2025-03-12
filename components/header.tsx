'use client';

import { useUser } from '@/hooks/useUser';
import { useTelegramUser } from '@/lib/telegram';
import { CheckCircle } from 'lucide-react';

export function Header() {
  const { user } = useUser();
  const { user: tgUser } = useTelegramUser();
  
  return (
    <header className="bg-[#0D102D] border-b border-[#1a1b2e] pb-12">
      <div className="px-4 h-14 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-white">TethBank</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#1a1b2e] px-2 py-1 rounded-full">
            <CheckCircle className="w-3 h-3 text-green-500" />
            <span className="text-xs text-green-500">Connected</span>
          </div>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {tgUser?.firstName?.charAt(0) || user?.id?.slice(0, 2).toUpperCase() || 'DS'}
            </span>
          </div>
        </div>
      </div>
      {tgUser && (
        <div className="px-4 py-2 bg-[#1a1b2e] text-sm">
          <p className="text-gray-400">Welcome, {tgUser.firstName} {tgUser.lastName}</p>
          {tgUser.username && (
            <p className="text-gray-500 text-xs">@{tgUser.username}</p>
          )}
        </div>
      )}
    </header>
  );
}