'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Copy, ArrowDown, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import RecentTransactions from '@/components/ui/recent-transactions';

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  // const { data: transactions } = useQuery({
  //   queryKey: ['transactions'],
  //   queryFn: api.transactions.getAll,
  // });

  interface Transaction {
    id: number;
    type: 'investment' | 'earning' | 'withdrawal';
    amount: number;
    status: 'completed' | 'pending';
    date: string;
  }

  const transactionsData: Transaction[] = [
    { id: 1, type: 'investment', amount: 2000, status: 'completed', date: '1/02/2024' },
    { id: 2, type: 'earning', amount: 2000, status: 'completed', date: '1/02/2024' },
    { id: 3, type: 'withdrawal', amount: 2000, status: 'pending', date: '1/02/2024' },
    { id: 4, type: 'earning', amount: 200, status: 'completed', date: '1/02/2024' },
  ];

  useEffect(() => {
    const isOnboarded = localStorage.getItem('isOnboarded');
    if (!isOnboarded) {
      router.push('/welcome');
    }
  }, [router]);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`t.me/tetherbankbot/app?ref=${user?.referralId}`);
  };

  return (
    <div className="space-y-4 px-6 mb-20">
      {/* Balance Card */}
      <div className="bg-card rounded-xl p-4 -mt-8">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-lg font-semibold text-primary">{formatCurrency(user?.balance || 12000)}</p>
            <p className="text-xs text-secondary">Available bal.</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-primary">{formatCurrency(user?.invested || 30000)}</p>
            <p className="text-xs text-secondary">Invested</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-primary">{formatCurrency(user?.totalEarnings || 12000)}</p>
            <p className="text-xs text-secondary">Total earnings</p>
          </div>
        </div>
      </div>

      {/* Investment CTA */}
      <div className="bg-black text-card rounded-xl p-4">
        <div className="flex justify-between items-center">
          <p className="text-xs">Grab a new plan, or upgrade before slots are full</p>
          <Link href="/investment">
            <Button className="bg-primary-foreground hover:bg-yellow-600 font-normal text-black text-sm px-3 py-1 h-auto rounded-full">
              Invest now
            </Button>
          </Link>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-card rounded-xl p-4">
        <p className="text-xs text-secondary mb-4 border-b border-b-input">Referral link</p>
        <div className="flex items-center gap-2 rounded-lg">
          <p className="flex-1 text-sm truncate p-3 rounded-full bg-input">
            t.me/tetherbankbot/app?ref={user?.referralId || '123456'}
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={copyReferralLink}
            className="bg-primary hover:bg-blue-700 text-white h-7 py-4 rounded-full px-4"
          >
            Copy
          </Button>
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactionsData} />
    </div>
  );
}