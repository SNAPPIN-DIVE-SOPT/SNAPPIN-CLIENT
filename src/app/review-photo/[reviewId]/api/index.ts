'use client';

import { useQuery } from '@tanstack/react-query';
import { USER_QUERY_KEY } from '@/query-key/user';
import { PHOTOGRAPHER_QUERY_KEY } from '@/query-key/photographer';
import { apiRequest } from '@/api/apiRequest';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { GetReviewDetailData, GetReviewDetailResponse } from '@/swagger-api/data-contracts';
import { useAuth } from '@/auth/hooks/useAuth';

export const getReviewDetail = async (
  reviewId: number,
  isLogIn: boolean
): Promise<GetReviewDetailResponse> => {
  if (isLogIn) {
    const res = await apiRequest<GetReviewDetailData>({
      endPoint: `/api/v1/reviews/${reviewId}`,
      method: 'GET',
    });

    if (!res.data) {
      throw new Error(`/api/v1/reviews/${reviewId} 응답에 데이터가 존재하지 않습니다.`);
    }
    return res.data;
  }

  const res = await fetch(`${SERVER_API_BASE_URL}/api/v1/reviews/${reviewId}`, { 
    method: 'GET' 
  });

  if (!res.ok) {
    throw new Error('리뷰 상세 정보를 불러오는 데 실패했습니다.');
  }
  
  const data = await res.json();
  return data.data;
};

export const useGetReviewDetail = (reviewId: number, userType: string) => {
  const { isLogIn } = useAuth();

  return useQuery<GetReviewDetailResponse>({
    queryKey: userType === 'PHOTOGRAPHER'
      ? PHOTOGRAPHER_QUERY_KEY.REVIEW_DETAIL(reviewId)
      : USER_QUERY_KEY.REVIEW_DETAIL(reviewId),
    queryFn: () => getReviewDetail(reviewId, !!isLogIn),
  });
};
