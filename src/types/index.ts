export interface Plan {
  id: string;
  type: 'silver' | 'gold';
  name: string;
  price: number;
  benefits: {
    directSponsor: number;
    binaryPool: number;
    autoFill: number;
  };
}

export interface User {
  id: string;
  balance: number;
  invested: number;
  totalEarnings: number;
  totalInvestment: number;
  totalDirect: number;
  totalDownlines: number;
  directEarnings: number;
  teamEarnings: number;
  referralId: string;
}

export interface Transaction {
  id: string;
  type: 'investment' | 'earning' | 'withdrawal';
  amount: number;
  status: 'completed' | 'pending';
  date: string;
}

export interface Investment {
  id: string;
  planType: 'silver' | 'gold';
  amount: number;
  earnings: number;
  status: 'active' | 'completed';
}

export interface Referral {
  id: string;
  userId: string;
  investment: number;
  date: string;
  status: 'active' | 'inactive';
}