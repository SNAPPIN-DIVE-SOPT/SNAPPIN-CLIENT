'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { ApiResponseBodyVoidVoid, CreateOnboardingRequest } from '@/swagger-api';
import { AUTH_QUERY_KEY } from '@/query-key/auth';

export const usePostOnboarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateOnboardingRequest) => {
      const res = await apiRequest<ApiResponseBodyVoidVoid>({
        endPoint: '/api/v1/users/onboarding',
        method: 'POST',
        data,
      });

      if (!res.success) {
        throw new Error('No data from POST /api/v1/users/onboarding');
      }

      return true;
    },
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY.ONBOARDING(), true);
    },
  });
};
