import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { User } from '@/types';

export function useUser() {
  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => api.user.getProfile(),
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