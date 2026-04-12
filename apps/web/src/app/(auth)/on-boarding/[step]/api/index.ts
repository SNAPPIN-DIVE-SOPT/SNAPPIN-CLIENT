'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest.client';
import { ApiResponseBodyVoidVoid, CreateOnboardingRequest } from '@/swagger-api';
import { AUTH_QUERY_KEY } from '@/query-key/auth';

type UsePostOnboardingOptions = {
  onSuccess?: () => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
};

export const usePostOnboarding = (options?: UsePostOnboardingOptions) => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, CreateOnboardingRequest>({
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
    onSuccess: async () => {
      queryClient.setQueryData(AUTH_QUERY_KEY.ONBOARDING(), true);

      await options?.onSuccess?.();
    },
    onError: async (error) => {
      queryClient.setQueryData(AUTH_QUERY_KEY.ONBOARDING(), false);

      await options?.onError?.(error);
    },
  });
};
