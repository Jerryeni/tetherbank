'use client';

import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Copy, ArrowDown, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

export default function Home() {
  const { user } = useUser();
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: api.transactions.getAll,
  });

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`t.me/tetherbankbot/app?ref=${user?.referralId}`);
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="bg-[#1A1B2E] rounded-xl p-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-400">Available bal.</p>
            <p className="text-xl font-semibold">{formatCurrency(user?.balance || 0)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Invested</p>
            <p className="text-xl font-semibold">{formatCurrency(user?.invested || 0)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total earnings</p>
            <p className="text-xl font-semibold">{formatCurrency(user?.totalEarnings || 0)}</p>
          </div>
        </div>
      </div>

      {/* Investment CTA */}
      <div className="bg-[#1A1B2E] rounded-xl p-6">
        <div className="flex justify-between items-center">
          <p className="text-lg">Grab a new plan, or upgrade before slots are full</p>
          <Link href="/investment">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Invest now
            </Button>
          </Link>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-[#1A1B2E] rounded-xl p-6 space-y-2">
        <p className="text-sm text-gray-400">Referral link</p>
        <div className="flex items-center gap-2 bg-[#0A0B1E] rounded-lg p-3">
          <p className="flex-1 text-sm truncate">
            t.me/tetherbankbot/app?ref={user?.referralId}
          </p>
          <Button variant="ghost" size="sm" onClick={copyReferralLink}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#1A1B2E] rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Recent transactions</p>
          <Button variant="ghost" size="sm">All type</Button>
        </div>
        <div className="space-y-4">
          {transactions?.slice(0, 4).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'investment' ? 'bg-yellow-500/20' :
                  tx.type === 'earning' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {tx.type === 'investment' ? <ArrowDown className="w-5 h-5 text-yellow-500" /> :
                   tx.type === 'earning' ? <ArrowUp className="w-5 h-5 text-green-500" /> :
                   <ArrowUp className="w-5 h-5 text-red-500" />}
                </div>
                <div>
                  <p className="capitalize">{tx.type}</p>
                  <p className="text-sm text-gray-400">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`${
                  tx.type === 'investment' ? 'text-yellow-500' :
                  tx.type === 'earning' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {tx.type === 'investment' ? '-' : '+'}{formatCurrency(tx.amount)}
                </p>
                <p className={`text-sm ${
                  tx.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                }`}>
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}