'use client';

import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';

export default function Withdraw() {
  const { user, withdraw, isWithdrawing } = useUser();
  const [amount, setAmount] = useState('');

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (!isNaN(withdrawAmount) && withdrawAmount > 0) {
      withdraw(withdrawAmount);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/investment">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Request withdrawal</h1>
      </div>

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

      <div className="bg-[#1A1B2E] rounded-xl p-6">
        <p className="text-sm text-gray-400 mb-2">Input withdrawal amount</p>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-[#0A0B1E] border-gray-800"
          placeholder="Enter amount"
        />
        <Button 
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
          onClick={handleWithdraw}
          disabled={isWithdrawing}
        >
          {isWithdrawing ? 'Processing...' : 'Withdraw'}
        </Button>
      </div>
    </div>
  );
}