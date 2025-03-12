'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function History() {
  // const { data: transactions } = useQuery({
  //   queryKey: ['transactions'],
  //   queryFn: api.transactions.getAll,
  // });

  const transactions = [
    { id: 1, amount: '$50', date: '2025-03-10', status: 'completed' },
    { id: 2, amount: '$100', date: '2025-03-09', status: 'pending' },
    { id: 3, amount: '$75', date: '2025-03-08', status: 'completed' },
  ];

  return (
    <div className="space-y-6 mx-4">

      <div className="bg-card rounded-xl p-6 -mt-10">
        <h2 className='mb-4 font-medium text-xl'>History</h2>
        <Tabs defaultValue="subscription">
          <TabsList className="flex gap-4 justify-start bg-transparent border-b border-b-input">
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="referral">Referral</TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscription">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-muted">
                    <th className="text-left py-2">S.No</th>
                    <th className="text-left py-2">Subscription</th>
                    <th className="text-left py-2">Tokens</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.map((tx, index) => (
                    <tr key={tx.id} className="border-t border-input">
                      <td className="py-3">{index + 1}</td>
                      <td className="py-3">{tx.amount}</td>
                      <td className="py-3">30</td>
                      <td className="py-3">
                        <span className={`text-sm ${
                          tx.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="referral">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-muted">
                    <th className="text-left py-2">S.No</th>
                    <th className="text-left py-2">User ID</th>
                    <th className="text-left py-2">Investment</th>
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.map((tx, index) => (
                    <tr key={tx.id} className="border-t border-input">
                      <td className="py-3">{index + 1}</td>
                      <td className="py-3">1123</td>
                      <td className="py-3">{tx.amount}</td>
                      <td className="py-3">{tx.date}</td>
                      <td className="py-3">
                        <span className={`text-sm ${
                          tx.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}