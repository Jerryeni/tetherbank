'use client';

import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/utils';

export default function Investment() {
  const { user } = useUser();
  const { data: investments } = useQuery({
    queryKey: ['investments'],
    queryFn: api.investments.getActive,
  });

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="bg-[#1A1B2E] rounded-xl p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-400">Available bal.</p>
            <p className="text-xl font-semibold">{formatCurrency(user?.balance || 0)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total earnings</p>
            <p className="text-xl font-semibold">{formatCurrency(user?.totalEarnings || 0)}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-400">Total investment</p>
            <p className="text-xl font-semibold">{formatCurrency(user?.totalInvestment || 0)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total direct</p>
            <p className="text-xl font-semibold">{formatCurrency(user?.totalDirect || 0)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total downlines</p>
            <p className="text-xl font-semibold">{user?.totalDownlines || 0}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-400">Direct earnings</p>
            <p className="text-xl font-semibold">{formatCurrency(user?.directEarnings || 0)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Team earnings</p>
            <p className="text-xl font-semibold">{formatCurrency(user?.teamEarnings || 0)}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1">
          Request withdrawal
        </Button>
        <Link href="/investment/invest" className="flex-1">
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
            Invest now
          </Button>
        </Link>
      </div>

      {/* Active Investments */}
      <div className="bg-[#1A1B2E] rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Active investment</h2>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className="space-y-4">
          {investments?.map((investment) => (
            <div key={investment.id} className="bg-[#0A0B1E] rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="capitalize">{investment.planType} plan</p>
                <p>${investment.amount}</p>
              </div>
              <Progress value={65} className="mb-2" />
              <p className="text-green-500 text-right">+${investment.earnings}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}