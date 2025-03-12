'use client';

import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const plans = [
  {
    id: 'silver-starter',
    type: 'silver',
    name: 'Silver starter',
    price: 30,
    benefits: {
      directSponsor: 10,
      binaryPool: 10,
      autoFill: 10,
    },
  },
  {
    id: 'silver-pro',
    type: 'silver',
    name: 'Silver pro',
    price: 50,
    benefits: {
      directSponsor: 15,
      binaryPool: 20,
      autoFill: 15,
    },
  },
];

export default function Invest() {
  const { user, invest, isInvesting } = useUser();
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);

  const handleInvest = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (plan) {
      invest({ planId: plan.id, amount: plan.price });
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
        <h1 className="text-xl font-semibold">Select package</h1>
      </div>

      <p className="text-center text-gray-400">
        Grab a new plan before slots are full
      </p>

      <div className="flex gap-4 mb-6">
        <Button variant="outline" className="flex-1">Silver plan</Button>
        <Button variant="outline" className="flex-1">Gold plan</Button>
      </div>

      <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
        {plans.map((plan) => (
          <div key={plan.id} className="bg-[#1A1B2E] rounded-xl p-6 mb-4">
            <div className="flex items-start">
              <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
              <div className="ml-4 flex-1">
                <Label htmlFor={plan.id} className="flex justify-between">
                  <span>{plan.name}</span>
                  <span className="text-blue-500">${plan.price}</span>
                </Label>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Direct sponsor</span>
                    <span>${plan.benefits.directSponsor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Binary pool system</span>
                    <span>${plan.benefits.binaryPool}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Auto fill</span>
                    <span>${plan.benefits.autoFill}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>

      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700" 
        onClick={handleInvest}
        disabled={isInvesting}
      >
        {isInvesting ? 'Processing...' : 'Invest'}
      </Button>
    </div>
  );
}