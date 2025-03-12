'use client';

import { ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

// Define the type for a transaction item
interface Transaction {
  id: number;
  type: 'investment' | 'earning' | 'withdrawal';
  amount: number;
  status: 'completed' | 'pending';
  date: string;
}

// Define props for the RecentTransactions component
interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="bg-card rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="font-medium">Recent transactions</p>
        <Button variant="ghost" size="sm" className="text-secondary h-auto p-0">
          All type
        </Button>
      </div>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'investment'
                    ? 'bg-primary-foreground/20'
                    : tx.type === 'earning'
                    ? 'bg-green-500/20'
                    : 'bg-red-500/20'
                }`}
              >
                {tx.type === 'investment' ? (
                  <ArrowDown className="w-5 h-5 text-yellow-500" />
                ) : tx.type === 'earning' ? (
                  <ArrowUp className="w-5 h-5 text-green-500" />
                ) : (
                  <ArrowUp className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div>
                <p className="capitalize text-sm">{tx.type}</p>
                <p className="text-xs text-secondary">{tx.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-sm ${
                  tx.type === 'investment'
                    ? 'text-yellow-500'
                    : tx.type === 'earning'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {tx.type === 'investment' ? '-' : '+'}
                {formatCurrency(tx.amount)}
              </p>
              <p className={`text-xs ${tx.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                {tx.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}