import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import type {
  ApiResponseBodyCreateMoodCurationResponseVoid,
  CreateMoodCurationResponse,
} from '@/swagger-api/data-contracts';
import { USER_QUERY_KEY } from '@/query-key/user';

export const useGetAiCurationResult = () => {
  return useQuery<CreateMoodCurationResponse>({
    queryKey: USER_QUERY_KEY.AI_CURATION_RESULT(),
    queryFn: async () => {
      const res = await apiRequest<ApiResponseBodyCreateMoodCurationResponseVoid>({
        endPoint: '/api/v1/curation/result',
        method: 'GET',
      });
      if (!res.data) throw new Error('No data from /api/v1/curation/result');
      return res.data;
    },
    //캐시 읽기만 수행
    enabled: false,
  });
};
