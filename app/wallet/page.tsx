'use client';

import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import RecentTransactions from '@/components/ui/recent-transactions';

export default function Wallet() {
  const { user } = useUser();
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: api.transactions.getAll,
  });

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

  return (
    <div className="space-y-4 mx-3  ">
      {/* Balance Card */}
      <div className="bg-card rounded-xl p-4 -mt-10">
        <p className=" text-secondary font-light">Available balance</p>
        <div className="flex items-baseline gap-1 mt-1">
          <p className="text-2xl font-semibold text-primary">{user?.balance || '12,050'}</p>
          <p className="text-sm text-gray-400">USDT</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm w-1/3 text-secondary mt-1">= ${user?.balance || '12,000'}</p>
          <div className="flex gap-2 w-2/3">
          <Link href="/wallet/send" className="flex-1">
            <Button variant="outline" className="w-full text-primary rounded-full bg-transparent shadow-3xl">
              Send
            </Button>
          </Link>
          <Link href="/wallet/receive" className="flex-1">
            <Button className="w-full bg-primary text-white rounded-full shadow-md hover:bg-blue-700">
              Receive
            </Button>
          </Link>
        </div>
        </div>
        
        
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactionsData} />
    </div>
  );
}