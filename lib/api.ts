import { Plan, User, Transaction, Investment, Referral } from '@/types';

// API endpoints configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  plans: {
    getAll: async (): Promise<Plan[]> => {
      const response = await fetch(`${API_BASE_URL}/plans`);
      if (!response.ok) throw new Error('Failed to fetch plans');
      return response.json();
    },
  },
  
  user: {
    getProfile: async (): Promise<User> => {
      // Get Telegram user ID from WebApp
      const tgUserId = window.Telegram?.WebApp.initDataUnsafe.user?.id;
      
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: {
          'X-Telegram-User-Id': tgUserId?.toString() || '',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch user profile');
      return response.json();
    },
    
    invest: async (planId: string, amount: number): Promise<void> => {
      const tgUserId = window.Telegram?.WebApp.initDataUnsafe.user?.id;
      
      const response = await fetch(`${API_BASE_URL}/user/invest`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Telegram-User-Id': tgUserId?.toString() || '',
        },
        body: JSON.stringify({ planId, amount }),
      });
      if (!response.ok) throw new Error('Investment failed');
    },
    
    withdraw: async (amount: number): Promise<void> => {
      const tgUserId = window.Telegram?.WebApp.initDataUnsafe.user?.id;
      
      const response = await fetch(`${API_BASE_URL}/user/withdraw`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Telegram-User-Id': tgUserId?.toString() || '',
        },
        body: JSON.stringify({ amount }),
      });
      if (!response.ok) throw new Error('Withdrawal failed');
    },
  },
  
  transactions: {
    getAll: async (): Promise<Transaction[]> => {
      const tgUserId = window.Telegram?.WebApp.initDataUnsafe.user?.id;
      
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        headers: {
          'X-Telegram-User-Id': tgUserId?.toString() || '',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch transactions');
      return response.json();
    },
  },
  
  investments: {
    getActive: async (): Promise<Investment[]> => {
      const tgUserId = window.Telegram?.WebApp.initDataUnsafe.user?.id;
      
      const response = await fetch(`${API_BASE_URL}/investments/active`, {
        headers: {
          'X-Telegram-User-Id': tgUserId?.toString() || '',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch active investments');
      return response.json();
    },
  },
  
  referrals: {
    getAll: async (): Promise<Referral[]> => {
      const tgUserId = window.Telegram?.WebApp.initDataUnsafe.user?.id;
      
      const response = await fetch(`${API_BASE_URL}/referrals`, {
        headers: {
          'X-Telegram-User-Id': tgUserId?.toString() || '',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch referrals');
      return response.json();
    },
  },
};