import { useSuspenseQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import {
  ApiResponseBodyProductAvailableTimesResponseVoid,
  ApiResponseBodyProductClosedDatesResponseVoid,
  ApiResponseBodyProductPeopleRangeResponseVoid,
} from '@/swagger-api/data-contracts';

/**
 * 촬영 가능 인원수 조회 API
 * @param productId 상품 아이디
 * @returns 촬영 가능 인원수 범위
 */
export const useAvailablePeopleRange = (productId: string) => {
  const END_POINT = `/api/v1/products/${productId}/available/people-range`;

  return useSuspenseQuery({
    queryKey: ['availablePeopleRange', productId],
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
    queryKey: ['closedDates', productId, formatDate],
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
    queryKey: ['productAvailableTimes', productId, date],
    queryFn: async () => {
      return apiRequest<ApiResponseBodyProductAvailableTimesResponseVoid>({
        endPoint: END_POINT,
        method: 'GET',
      }).then((res) => res.data);
    },
  });
};
