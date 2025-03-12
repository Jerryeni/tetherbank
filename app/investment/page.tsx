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
  // const { data: investments } = useQuery({
  //   queryKey: ['investments'],
  //   queryFn: api.investments.getActive,
  // });

  const investments = [
    { id: 1, planType: 'gold', amount: 500, earnings: 50, progress: 65 },
    { id: 2, planType: 'silver', amount: 300, earnings: 30, progress: 45 },
  ];

  return (
    <div className="space-y-6x mb-20">
      {/* Stats Overview */}
      <div className="bg-card rounded-3xl text-center p-6 -mt-10 mx-4 ">
        <div className="grid grid-cols-2 gap-4 text-center mb-4 border-b border-b-input pb-4">
          <div className="border-r border-r-input">
            <p className="text-2xl font-semibold text-primary">{formatCurrency(user?.balance || 0)}</p>
            <p className="text-xs text-secondary">Available bal.</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-primary">{formatCurrency(user?.totalEarnings || 0)}</p>
            <p className="text-xs text-secondary">Total earnings</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 border-b border-b-input pb-4">
          <div className="border-r border-r-input">
            <p className="text-2xl font-semibold text-primary">{formatCurrency(user?.totalInvestment || 0)}</p>
            <p className="text-xs text-secondary">Total investment</p>
          </div>
          <div className="border-r border-r-input">
            <p className="text-2xl font-semibold text-primary">{formatCurrency(user?.totalDirect || 0)}</p>
            <p className="text-xs text-secondary">Total direct</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-primary">{user?.totalDownlines || 0}</p>
            <p className="text-xs text-secondary">Total downlines</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 border-b border-b-input pb-4">
          <div className="border-r border-r-input">
            <p className="text-2xl font-semibold text-primary">{formatCurrency(user?.directEarnings || 0)}</p>
            <p className="text-xs text-secondary">Direct earnings</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-primary">{formatCurrency(user?.teamEarnings || 0)}</p>
            <p className="text-xs text-secondary">Team earnings</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 -mt-6 pt-10 mx-4 -z-10 mb-6 rounded-b-3xl  px-2 pb-2 relative bg-secondary">
        <Link href="/investment/withdraw" className="flex-1">
          <Button variant="outline" className="w-full rounded-full text-primary">
            Request withdrawal
          </Button>
        </Link>
        <Link href="/investment/invest" className="flex-1">
          <Button className="w-full bg-primary-foreground rounded-full hover:bg-yellow-600 text-black">
            Invest now
          </Button>
        </Link>
      </div>

      {/* Active Investments */}
      <div className="bg-card rounded-3xl mx-4 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Active investment</h2>
          <Button variant="ghost" size="sm"  className='p-4 bg-input rounded-full text-primary'>View all</Button>
        </div>
        <div className="space-y-4">
          {investments?.map((investment) => (
            <div key={investment.id} className=" border border-input rounded-2xl p-4 flex flex-col justify-between items-centerx">
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