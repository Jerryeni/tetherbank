import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { User } from '@/types';
import { useTelegramUser } from '@/lib/telegram';

export function useUser() {
  const queryClient = useQueryClient();
  const { user: tgUser } = useTelegramUser();

  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => api.user.getProfile(),
    enabled: !!tgUser, // Only fetch user data when TG user is available
  });

  const investMutation = useMutation({
    mutationFn: ({ planId, amount }: { planId: string; amount: number }) =>
      api.user.invest(planId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['investments'] });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: (amount: number) => api.user.withdraw(amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  return {
    user,
    isLoading,
    error,
    invest: investMutation.mutate,
    withdraw: withdrawMutation.mutate,
    isInvesting: investMutation.isPending,
    isWithdrawing: withdrawMutation.isPending,
  };
}