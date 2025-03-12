'use client';

import { useUser } from '@/hooks/useUser';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { GenericModal } from '@/components/ui/generic-modal';
import { QRCodeCanvas } from 'qrcode.react';

export default function Receive() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(true);
  const walletAddress = 't.me/tetherbankbot/app?ref=123456';

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Link href="/wallet">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Receive USDT</h1>
      </div>

      <GenericModal open={showModal} onOpenChange={setShowModal} hideButtons>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Scan QR code to receive</h2>
        </div>

        <div className="space-y-6 mx-auto">
          <div className="bg-white p-8 rounded-lg flex mx-auto items-center justify-center">
            <QRCodeCanvas 
              value={walletAddress} 
              size={192} 
              bgColor="#ffffff" 
              fgColor="#0D102D" 
              level="H"
              className="rounded-lg"
            />
          </div>

          <div>
            <p className="text-lg text-center mb-2">Or copy wallet address</p>
            <div className="flex items-center gap-2 text-white rounded-lg p-2">
              <p className="flex-1 text-sm truncate bg-input rounded-full p-4 text-secondary">
                {walletAddress}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={copyWalletAddress}
                className="bg-primary hover:bg-blue-700 text-white h-7 px-4 py-2 rounded-full "
              >
                Copy
              </Button>
            </div>
          </div>
        </div>
      </GenericModal>
    </div>
  );
}