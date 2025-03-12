'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { GenericModal } from '@/components/ui/generic-modal';
// import { ProceedModal } from '@/components/ui/proceed-modal';

const packages = {
  silver: [
    {
      id: 'silver-starter',
      name: 'Silver Starter',
      price: 30,
      benefits: { directSponsor: 10, binaryPool: 10, autoFill: 10 },
    },
    {
      id: 'silver-pro',
      name: 'Silver Pro',
      price: 50,
      benefits: { directSponsor: 15, binaryPool: 20, autoFill: 15 },
    },
  ],
  gold: [
    {
      id: 'gold-starter',
      name: 'Gold Starter',
      price: 60,
      benefits: { directSponsor: 20, binaryPool: 25, autoFill: 20 },
    },
    {
      id: 'gold-pro',
      name: 'Gold Pro',
      price: 100,
      benefits: { directSponsor: 30, binaryPool: 40, autoFill: 30 },
    },
  ],
} as const;

export default function Packages() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'silver' | 'gold'>('silver');
  const [selectedPackage, setSelectedPackage] = useState<string>(packages.silver[0].id);
  const [showProceedModal, setShowProceedModal] = useState(false);

  // Get details of the selected package
  const selectedPackageDetails = packages[selectedPlan].find((pkg) => pkg.id === selectedPackage);

  const handleConfirm = () => {
    setShowProceedModal(false);
    localStorage.setItem('isOnboarded', 'true');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col gap-4 p-6 bg-secondary text-center pb-32">
        <h2 className='text-white text-2xl'>Tether Bank</h2>
        <p className="text-sm text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <div className="relative w-[90%] mx-auto rounded-t-3xl -mt-14 bg-card p-4 shadow-xl">
        <div className="flex items-center text-secondary gap-1 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-medium">Select package</h1>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-4 mb-6 rounded-full p-2 bg-[#CADAEA99]">
          <Button
            variant="outline"
            className={`flex-1 rounded-full border-none font-light text-secondary ${selectedPlan === 'silver' ? 'bg-[#90ADF699]/60' : 'bg-transparent'
              }`}
            onClick={() => setSelectedPlan('silver')}
          >
            Silver Plan
          </Button>
          <Button
            variant="outline"
            className={`flex-1 rounded-full border-none font-light text-secondary ${selectedPlan === 'gold' ? 'bg-[#90ADF699]/60' : 'bg-transparent'
              }`}
            onClick={() => setSelectedPlan('gold')}
          >
            Gold Plan
          </Button>
        </div>

        {/* Package Selection */}
        <div className="flex-1">
          <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
            {packages[selectedPlan].map((pkg) => (
              <div
                key={pkg.id}
                className={`border border-primary rounded-xl p-6 mb-4 transition-all ${selectedPackage === pkg.id ? 'bg-[#AABFF4B2] border-primary shadow-lg' : 'bg-transparent'
                  }`}
              >
                <div className="flex items-start">
                  <RadioGroupItem value={pkg.id} id={pkg.id} className="mt-1" />
                  <div className="ml-4 flex-1">
                    <Label htmlFor={pkg.id} className="flex justify-between">
                      <span className={`text-lg font-medium ${selectedPackage === pkg.id ? 'text-primary' : 'text-black'}`}>
                        {pkg.name}
                      </span>
                      <span className={`text-lg font-medium ${selectedPackage === pkg.id ? 'text-primary' : 'text-black'}`}>
                        ${pkg.price}
                      </span>
                    </Label>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={`text-secondary flex gap-1 ${selectedPackage === pkg.id ? 'text-black' : ''}`}> <CheckCheck className="w-5 h-5" /> Direct Sponsor</span>
                        <span className={`text-secondary ${selectedPackage === pkg.id ? 'text-black' : ''}`}>
                          ${pkg.benefits.directSponsor}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={`text-secondary flex gap-1 ${selectedPackage === pkg.id ? 'text-black' : ''}`}><CheckCheck className="w-5 h-5" /> Binary Pool System</span>
                        <span className={`text-secondary ${selectedPackage === pkg.id ? 'text-black' : ''}`}>
                          ${pkg.benefits.binaryPool}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={`text-secondary  flex gap-1 ${selectedPackage === pkg.id ? 'text-black' : ''}`}><CheckCheck className="w-5 h-5" /> Auto Fill</span>
                        <span className={`text-secondary ${selectedPackage === pkg.id ? 'text-black' : ''}`}>
                          ${pkg.benefits.autoFill}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Continue Button */}
        <div className="px-4 pb-8">
          <Button
            className="w-full bg-primary hover:bg-blue-700 rounded-full "
            onClick={() => setShowProceedModal(true)}
          >
            Invest
          </Button>
        </div>

        {/* Proceed Modal */}
        <GenericModal
          open={showProceedModal}
          onOpenChange={setShowProceedModal}
          onConfirm={handleConfirm}
          icon='/icon.svg'
          title="Proceed to pay"
          description={`You are about to purchase the ${selectedPackageDetails?.name} package for $${selectedPackageDetails?.price}. Would you like to proceed with the payment?`}
        />

      </div>
    </div>
  );
}