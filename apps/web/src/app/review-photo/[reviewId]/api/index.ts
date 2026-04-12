'use client';

import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY } from '@/query-key/user';
import { PHOTOGRAPHER_QUERY_KEY } from '@/query-key/photographer';
import { apiRequest } from '@/api/apiRequest.client';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { GetReviewDetailData, GetReviewDetailResponse } from '@/swagger-api';
import { useAuth } from '@/auth/hooks/useAuth';
import { USER_TYPE, UserType } from '@snappin/shared/types';

export const getReviewDetail = async (
  reviewId: number,
  isLogIn: boolean,
): Promise<GetReviewDetailResponse> => {
  if (isLogIn) {
    const res = await apiRequest<GetReviewDetailData>({
      endPoint: `/api/v1/reviews/${reviewId}`,
      method: 'GET',
    });

    if (!res.success) {
      throw new Error(`Failed to fetch /api/v1/reviews/${reviewId}`);
    }
    return res.data!;
  }

  const res = await fetch(`${SERVER_API_BASE_URL}/api/v1/reviews/${reviewId}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('리뷰 상세 정보를 불러오는 데 실패했습니다.');
  }
  const data = await res.json();
  return data.data;
};

export const useGetReviewDetail = (reviewId: number, userType: UserType) => {
  const { isLogIn } = useAuth();

  return useQuery<GetReviewDetailResponse>({
    queryKey:
      userType === USER_TYPE.PHOTOGRAPHER
        ? PHOTOGRAPHER_QUERY_KEY.REVIEW_DETAIL(reviewId)
        : USER_QUERY_KEY.REVIEW_DETAIL(reviewId),
    queryFn: () => getReviewDetail(reviewId, !!isLogIn),
    enabled: isLogIn !== null,
  });
};
