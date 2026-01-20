import { USER_QUERY_KEY } from '@/query-key/user';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import {
  GetReviewDetailData,
  GetReviewDetailResponse,
} from '@/swagger-api/data-contracts';

export const useGetReviewDetail = (reviewId: number) => {
  return useQuery<GetReviewDetailResponse>({
    queryKey: USER_QUERY_KEY.REVIEW_DETAIL(reviewId),
    queryFn: async () => {
      const res = await apiRequest<GetReviewDetailData>({
        endPoint: `/api/v1/reviews/${reviewId}`,
        method: 'GET',
      });

      if (!res.success) {
        throw new Error(`Failed to fetch /api/v1/reviews/${reviewId}`);
      }

      return res.data!;
    },
  });
};
