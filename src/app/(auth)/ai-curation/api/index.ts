import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import type { ApiResponseBodyCreateMoodCurationResponseVoid, CreateMoodCurationResponse, GetCurationQuestionData, GetCurationQuestionPhotosResponse } from '@/swagger-api/data-contracts';
import { USER_QUERY_KEY } from '@/query-key/user';

export const useGetAiCuration = (step: number) => {
  return useQuery<GetCurationQuestionPhotosResponse>({
    queryKey: USER_QUERY_KEY.AI_CURATION_QUESTION_STEP(step),
    queryFn: async () => {
      const res = await apiRequest<GetCurationQuestionData>({
        endPoint: '/api/v1/curation',
        method: 'GET',
        params: { step: String(step) },
      });

      if (!res.data) throw new Error('No data from /api/v1/curation');
      return res.data; 
    },
  });
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