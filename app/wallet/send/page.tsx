'use client';

import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { GenericModal } from '@/components/ui/generic-modal';

export default function Send() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(true);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = () => {
    // Handle send logic
    setShowModal(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Link href="/wallet">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Send USDT</h1>
      </div>

      <GenericModal open={showModal} onOpenChange={setShowModal} hideButtons>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Send USDT</h2>
            
          </div>

          <div className="space-y-4 w-full">
            <div>
              <Input
                placeholder="Wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-input text-secondary rounded-full  p-4 "
              />
            </div>
            <div>
              <Input
                placeholder="Amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-input text-secondary rounded-full  p-4"
              />
            </div>
            <Button 
              className="w-[50%] mx-auto rounded-full bg-primary hover:bg-blue-700"
              onClick={handleSend}
            >
              Send
            </Button>
          </div>
      </GenericModal>
    </div>
  );
}