import {
  useMutation,
  useSuspenseQuery,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest.client';
import { USER_QUERY_KEY } from '@/query-key/user';
import {
  ApiResponseBodyProductAvailableTimesResponseVoid,
  ApiResponseBodyProductClosedDatesResponseVoid,
  ApiResponseBodyProductDurationTimeResponseVoid,
  ApiResponseBodyProductPeopleRangeResponseVoid,
  ApiResponseBodyProductReservationResponseVoid,
  ProductReservationRequest,
} from '@/swagger-api';
import { productDetailOptions, productPortfoliosOptions, productReviewsOptions } from './options';

export const useAvailableTime = (productId: string) => {
  const END_POINT = `/api/v1/products/${productId}/available/duration-time`;
  return useSuspenseQuery({
    queryKey: USER_QUERY_KEY.PRODUCT_AVAILABLE_DURATION_TIME(productId),
    queryFn: async () => {
      return await apiRequest<ApiResponseBodyProductDurationTimeResponseVoid>({
        endPoint: END_POINT,
        method: 'GET',
      }).then((res) => res.data?.minDurationTime ?? 1);
    },
  });
};

/**
 * 촬영 가능 인원수 조회 API
 * @param productId 상품 아이디
 * @returns 촬영 가능 인원수 범위
 */
export const useAvailablePeopleRange = (productId: string) => {
  const END_POINT = `/api/v1/products/${productId}/available/people-range`;

  return useSuspenseQuery({
    queryKey: USER_QUERY_KEY.PRODUCT_AVAILABLE_PEOPLE_RANGE(productId),
    queryFn: async () => {
      return await apiRequest<ApiResponseBodyProductPeopleRangeResponseVoid>({
        endPoint: END_POINT,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.data);
    },
    retry: false,
  });
};

/**
 * 휴무일 조회 API
 * @param productId 상품 아이디
 * @param date 조회할 월 (YYYY-MM)
 */
export const useClosedDates = (productId: string, date: Date) => {
  const formatDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  const END_POINT = `/api/v1/products/${productId}/closed-dates?date=${formatDate}`;

  return useSuspenseQuery<string[]>({
    queryKey: USER_QUERY_KEY.PRODUCT_CLOSE_DATES(productId, formatDate),
    queryFn: async () => {
      return await apiRequest<ApiResponseBodyProductClosedDatesResponseVoid>({
        endPoint: END_POINT,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.data?.closedDates ?? []);
    },
  });
};

/**
 * 선택 가능 시간대 조회 API
 * @param productId 상품 아이디
 * @param date 조회할 날짜 (YYYY-MM-DD)
 */
export const useAvailableTimes = (productId: string, date: string) => {
  const END_POINT = `/api/v1/products/${productId}/available/times?date=${date}`;

  return useSuspenseQuery({
    queryKey: USER_QUERY_KEY.PRODUCT_AVAILABLE_TIME(productId, date),
    queryFn: async () => {
      const res = await apiRequest<ApiResponseBodyProductAvailableTimesResponseVoid>({
        endPoint: END_POINT,
        method: 'GET',
      });

      return res.data;
    },
    staleTime: 0,
  });
};

export const useReservation = (productId: string) => {
  const END_POINT = `/api/v1/products/${productId}/reservations`;

  return useMutation({
    mutationFn: async (body: ProductReservationRequest) => {
      const res = await apiRequest<ApiResponseBodyProductReservationResponseVoid>({
        endPoint: END_POINT,
        method: 'POST',
        data: body,
      });
      return res.data;
    },
  });
};

// 상품 상세 정보 및 상품 안내 조회 API
export const useGetProductDetail = (id: number, isLogIn: boolean) => {
  return useSuspenseQuery(productDetailOptions(id, isLogIn));
};

// 포폴 목록 조회 API
export const useGetPortfolioList = (id: number, isLogIn: boolean) => {
  return useSuspenseInfiniteQuery(productPortfoliosOptions(id, isLogIn));
};

// 상품 리뷰 목록 조회 API
export const useGetProductReviewList = (id: number) => {
  return useSuspenseInfiniteQuery(productReviewsOptions(id));
};
