'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import Image from 'next/image';

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full justify-center items-center mx-auto flex flex-col bg-secondary">
      <Image src="/onboarding.png" alt='logo' width={100} height={50} className='w-full h-[50%] mx-auto' />
      <div className="w-full -mt-32 text-center">
        <h1 className="text-2xl text-white mb-2">Your Trading Bot</h1>
        <p className="text-gray-400 text-center mb-8 ">
          Start your investment journey with our secure and profitable platform
        </p>
      </div>

      <div className='flex items-center gap-2 p-4 rounded-full bg-[#AABFF412] mb-4 text-green-500'>
        <Image src="/Vector.svg" alt='logo' width={100} height={100} className='w-4 h-4 mx-auto' />
        UPLINE ID: 12345678
      </div>
      <div className="px-4 pb-8 w-[80%] mx-auto">
        <Button
          className=" w-full rounded-full bg-yellow-500 text-black hover:bg-yellow-300 mb-4"
          onClick={() => router.push('/packages')}
        >
          Proceed
        </Button>

      </div>
    </div >
  );
}