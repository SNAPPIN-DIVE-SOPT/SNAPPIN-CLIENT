import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest.client';
import { AUTH_QUERY_KEY } from '@/query-key/auth';
import { USER_QUERY_KEY } from '@/query-key/user';
import {
  GetOnboardingData,
  GetProductAvailableTimesData,
  GetProductClosedDatesData,
  GetProductDurationTimeData,
  GetProductExtraInfoData,
  GetProductPeopleRangeData,
} from '@/swagger-api';

// 예약자 온보딩 정보 조회 API
export const useGetReservationApplicant = (isEnabled: boolean) => {
  return useQuery({
    queryKey: AUTH_QUERY_KEY.ONBOARDING_USER(),
    enabled: isEnabled,
    queryFn: async () => {
      const response = await apiRequest<GetOnboardingData>({
        endPoint: '/api/v1/users/onboarding',
        method: 'GET',
      });

      if (!response.data) {
        throw new Error('No data from /api/v1/users/onboarding');
      }

      return response.data;
    },
  });
};

// 상품 예약 부가 안내 조회 API
export const useGetReservationExtraInfo = (productId: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.RESERVATION_EXTRA_INFO(productId),
    enabled: isEnabled,
    queryFn: async () => {
      const response = await apiRequest<GetProductExtraInfoData>({
        endPoint: `/api/v1/products/${productId}/extra-info`,
        method: 'GET',
      });

      if (!response.data) {
        throw new Error(`No data from /api/v1/products/${productId}/extra-info`);
      }

      return response.data;
    },
  });
};

// 상품 촬영 가능 시간 조회 API
export const useGetReservationAvailableDurationTime = (productId: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.PRODUCT_AVAILABLE_DURATION_TIME(`${productId}`),
    enabled: isEnabled,
    queryFn: async () => {
      const response = await apiRequest<GetProductDurationTimeData>({
        endPoint: `/api/v1/products/${productId}/available/duration-time`,
        method: 'GET',
      });

      return response.data?.minDurationTime ?? 1;
    },
  });
};

// 촬영 가능 인원수 조회 API
export const useGetReservationAvailablePeopleRange = (productId: number, isEnabled: boolean) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.PRODUCT_AVAILABLE_PEOPLE_RANGE(`${productId}`),
    enabled: isEnabled,
    queryFn: async () => {
      const response = await apiRequest<GetProductPeopleRangeData>({
        endPoint: `/api/v1/products/${productId}/available/people-range`,
        method: 'GET',
      });

      return response.data;
    },
    retry: false,
  });
};

// 상품 휴무일 조회 API
export const useGetReservationClosedDates = (
  productId: number,
  viewDateMonth: Date,
  isEnabled: boolean,
) => {
  const formatDate = `${viewDateMonth.getFullYear()}-${String(viewDateMonth.getMonth() + 1).padStart(2, '0')}`;

  return useQuery({
    queryKey: USER_QUERY_KEY.PRODUCT_CLOSE_DATES(`${productId}`, formatDate),
    enabled: isEnabled,
    queryFn: async () => {
      const response = await apiRequest<GetProductClosedDatesData>({
        endPoint: `/api/v1/products/${productId}/closed-dates?date=${formatDate}`,
        method: 'GET',
      });

      return response.data?.closedDates ?? [];
    },
  });
};

// 상품 선택 가능 시간대 조회 API
export const useGetReservationAvailableTimes = (
  productId: number,
  date: string,
  isEnabled: boolean,
) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.PRODUCT_AVAILABLE_TIME(`${productId}`, date),
    enabled: isEnabled && date.length > 0,
    queryFn: async () => {
      const response = await apiRequest<GetProductAvailableTimesData>({
        endPoint: `/api/v1/products/${productId}/available/times?date=${date}`,
        method: 'GET',
      });

      return response.data;
    },
    staleTime: 0,
  });
};
