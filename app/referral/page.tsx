'use client';

import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';

export default function Referral() {
  const { user } = useUser();
  // const { data: referrals } = useQuery({
  //   queryKey: ['referrals'],
  //   queryFn: api.referrals.getAll,
  // });

  const referrals = [
    { id: 1, userId: 'USR001', investment: 500, date: '2024-03-01', status: 'active' },
    { id: 2, userId: 'USR002', investment: 300, date: '2024-03-05', status: 'pending' },
    { id: 3, userId: 'USR003', investment: 1000, date: '2024-03-10', status: 'active' },
    { id: 4, userId: 'USR004', investment: 700, date: '2024-03-15', status: 'pending' },
  ];


  const copyReferralLink = () => {
    navigator.clipboard.writeText(`t.me/tetherbankbot/app?ref=${user?.referralId}`);
  };

  const [selectedLevel, setSelectedLevel] = useState(1);

  return (
    <div className="space-y-6 mx-3 mb-20">
      {/* Stats Overview */}
      <div className="bg-card rounded-xl p-6 -mt-10 ">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-secondary">Direct partner</p>
            <p className="text-xl font-semibold">{formatCurrency(user?.totalDirect || 0)}</p>
          </div>
          <div>
            <p className="text-sm text-secondary">Total team</p>
            <p className="text-xl font-semibold">{formatCurrency(user?.teamEarnings || 0)}</p>
          </div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-card rounded-xl p-6 ">
        <p className="text-sm text-secondary mb-2 border-b border-b-input pb-2">Referral link</p>
        <div className="flex items-center gap-2 rounded-lg p-3">
          <p className="flex-1 text-sm truncate bg-input p-3 rounded-full">
            t.me/tetherbankbot/app?ref={user?.referralId}
          </p>
          <Button variant="ghost" size="sm" onClick={copyReferralLink} className='text-white bg-primary'>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Referral List */}
      <div className="bg-card rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Referral list</h2>
          <select
            className="p-2 bg-input rounded-full text-primary"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(Number(e.target.value))}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>Level {i + 1}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm text-secondary">
                <th className="text-left py-2">S.No</th>
                <th className="text-left py-2">User ID</th>
                <th className="text-left py-2">Investment</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals?.map((referral, index) => (
                <tr key={referral.id} className="border-t text-xs my-2 border-gray-400">
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3">{referral.userId}</td>
                  <td className="py-3">{formatCurrency(referral.investment)}</td>
                  <td className="py-3">{referral.date}</td>
                  <td className="py-3">
                    <span className={`text-sm ${
                      referral.status === 'active' ? 'text-green-500' : 'text-yellow-500'
                    }`}>
                      {referral.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
