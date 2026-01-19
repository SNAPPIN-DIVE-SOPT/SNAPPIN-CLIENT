import { useQuery } from '@tanstack/react-query';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { USER_QUERY_KEY } from '@/query-key/user';
import {
  GetPhotographerProfileResponse,
} from '@/swagger-api/data-contracts';

// 작가 상세 조회 API
export const useGetPhotographerDetail = (id: number) => {
  return useQuery<GetPhotographerProfileResponse>({
    queryKey: USER_QUERY_KEY.PHOTOGRAPHER_DETAIL(id),
    queryFn: async () => {
      const res = await fetch(`${SERVER_API_BASE_URL}/api/v1/photographers/${id}`, { method: 'GET' });

      if (!res.ok) {
        throw new Error('작가 상세 정보를 불러오는 데 실패했습니다.');
      }
      const data = await res.json();
      return data.data;
    },
    enabled: !Number.isNaN(id),
  })
}