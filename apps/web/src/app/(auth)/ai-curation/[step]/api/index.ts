'use client';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import {
  GetCurationQuestionPhotosResponse,
  CreateMoodCurationResponse,
  ApiResponseBodyCreateMoodCurationResponseVoid,
  GetAllCurationQuestionsData,
} from '@/swagger-api';
import { AUTH_QUERY_KEY } from '@/query-key/auth';

export const useGetAiCurationAll = () => {
  return useQuery<GetCurationQuestionPhotosResponse[]>({
    queryKey: AUTH_QUERY_KEY.AI_CURATION_ALL(),
    queryFn: async () => {
      const res = await apiRequest<GetAllCurationQuestionsData>({
        endPoint: '/api/v1/curation/all',
        method: 'GET',
      });

      if (!res.data) {
        throw new Error('Failed to get /api/v1/curation/all');
      }

      return res.data;
    },
  });
};

export const useGetAiCurationAllPrefetch = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: AUTH_QUERY_KEY.AI_CURATION_ALL(),
      queryFn: useGetAiCurationAll,
    });
  };
};

export const usePostAiCuration = () => {
  return useMutation<CreateMoodCurationResponse, Error, number[]>({
    mutationFn: async (photoIds: number[]) => {
      const res = await apiRequest<ApiResponseBodyCreateMoodCurationResponseVoid>({
        endPoint: '/api/v1/curation',
        method: 'POST',
        data: { photoIds: photoIds },
      });

      if (!res.data) throw new Error('No data from POST /api/v1/curation');
      return res.data;
    },
  });
};
