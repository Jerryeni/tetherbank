'use client';

import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

export default function Referral() {
  const { user } = useUser();
  const { data: referrals } = useQuery({
    queryKey: ['referrals'],
    queryFn: api.referrals.getAll,
  });

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`t.me/tetherbankbot/app?ref=${user?.referralId}`);
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="bg-[#1A1B2E] rounded-xl p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Direct partner</p>
            <p className="text-xl font-semibold">{formatCurrency(user?.totalDirect || 0)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total team</p>
            <p className="text-xl font-semibold">{formatCurrency(user?.teamEarnings || 0)}</p>
          </div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-[#1A1B2E] rounded-xl p-6">
        <p className="text-sm text-gray-400 mb-2">Referral link</p>
        <div className="flex items-center gap-2 bg-[#0A0B1E] rounded-lg p-3">
          <p className="flex-1 text-sm truncate">
            t.me/tetherbankbot/app?ref={user?.referralId}
          </p>
          <Button variant="ghost" size="sm" onClick={copyReferralLink}>
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Referral List */}
      <div className="bg-[#1A1B2E] rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Referral list</h2>
          <Button variant="ghost" size="sm">Level 1</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm text-gray-400">
                <th className="text-left py-2">S.No</th>
                <th className="text-left py-2">User ID</th>
                <th className="text-left py-2">Investment</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals?.map((referral, index) => (
                <tr key={referral.id} className="border-t border-gray-800">
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