import { useAuth } from '@/auth/hooks/useAuth';
import { useSuspenseQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import {
  ApiResponseBodyGetMoodFilterListResponseVoid,
  GetMoodFilterListResponse,
} from '@/swagger-api/data-contracts';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_SERVER_BASE_URL}`;
const ENDPOINT = '/api/v1/moods';
const FULL_URL = BASE_URL + ENDPOINT;

export const useMoodFilters = () => {
  const { isLogIn } = useAuth();
  return useSuspenseQuery<GetMoodFilterListResponse>({
    queryKey: ['explore', 'mood-filters', isLogIn],
    queryFn: async () => {
      // 로그인 상태
      if (isLogIn) {
        const response = await apiRequest<ApiResponseBodyGetMoodFilterListResponseVoid>({
          method: 'GET',
          endPoint: ENDPOINT,
        });

        if (!response.data) {
          throw new Error('무드 필터 데이터를 불러오지 못했습니다.');
        }
        return response.data;
      }

      // 비 로그인상태
      const response = await fetch(FULL_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('무드 필터 데이터를 불러오지 못했습니다.');
      }

      const data = await response.json();

      if (!data.data) {
        throw new Error('무드 필터 데이터를 불러오지 못했습니다.');
      }

      return data.data;
    },
  });
};
