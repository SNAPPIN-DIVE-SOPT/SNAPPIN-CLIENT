'use client';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { USER_QUERY_KEY } from '@/query-key/user';
import {
  ApiResponseBodyGetAllCurationQuestionsResponseVoid,
  GetCurationQuestionPhotosResponse,
  CreateMoodCurationResponse,
  ApiResponseBodyCreateMoodCurationResponseVoid,
} from '@/swagger-api/data-contracts';

export const useGetAiCurationAll = () => {
  return useQuery<GetCurationQuestionPhotosResponse[]>({
    queryKey: USER_QUERY_KEY.AI_CURATION_ALL(),
    queryFn: async () => {
      const res = await apiRequest<ApiResponseBodyGetAllCurationQuestionsResponseVoid>({
        endPoint: '/api/v1/curation/all',
        method: 'GET',
      });

      if (!res.data?.questions) {
        throw new Error('Failed to get /api/v1/curation/all');
      }

      return res.data.questions;
    },
  });
};

export const useGetAiCurationAllPrefetch = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: USER_QUERY_KEY.AI_CURATION_ALL(),
      queryFn: useGetAiCurationAll,
    });
  };
};

export const usePostAiCuration = () => {
  const queryClient = useQueryClient();

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
    onSuccess: (data) => {
      queryClient.setQueryData(USER_QUERY_KEY.AI_CURATION_RESULT(), data);
    },
  });
};