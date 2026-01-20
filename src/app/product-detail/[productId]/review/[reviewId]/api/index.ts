import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY } from '@/query-key/user';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { GetReviewDetailResponse } from '@/swagger-api/data-contracts';

// 포토 리뷰 상세 조회 API
export const useGetReviewDetail = (id: number) => {
  return useQuery<GetReviewDetailResponse>({
    queryKey: USER_QUERY_KEY.REVIEW_DETAIL(id),
    queryFn: async () => {
      const res = await fetch (`${SERVER_API_BASE_URL}/api/v1/reviews/${id}`, { method: 'GET' });

      if (!res.ok) {
        throw new Error('리뷰 상세 정보를 불러오는 데 실패했습니다.');
      }
      const data = await res.json();
      return data.data;
    },
    enabled: !Number.isNaN(id),
  })
}