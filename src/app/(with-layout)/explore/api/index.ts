
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { GetPlaceResponse, ApiResponseBodyGetMoodFilterListResponseVoid, CategoriesResponse, GetMoodFilterListResponse } from '@/swagger-api/data-contracts';
import { USER_QUERY_KEY } from '@/query-key/user';
import { useAuth } from '@/auth/hooks/useAuth';
import { apiRequest } from '@/api/apiRequest';

const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_BASE_URL;
const CATEGORY_END_POINT = '/api/v1/categories';
const CATEGORY_FULL_URL = BASE_URL + CATEGORY_END_POINT;
const MOODS_ENDPOINT = '/api/v1/moods';
const MOODS_FULL_URL = BASE_URL + MOODS_ENDPOINT;

const ENDPOINT = '/api/v1/places';
const FULL_URL = `${BASE_URL}${ENDPOINT}`;

export const useSearchPlaces = (keyword: string) => {
  const trimmedKeyword = keyword.trim();

  return useQuery<GetPlaceResponse[]>({
    queryKey: ['searchPlaces', keyword],
    queryFn: async ({ signal }) => {
      if (keyword === '') return [];
      const url = `${FULL_URL}?keyword=${encodeURIComponent(trimmedKeyword)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
      });

      if (!response.ok) {
        throw new Error(`촬영 장소 조회 API 요청 실패 ${response.status} ${response.statusText}`);

export const useGetCategories = () => {
  return useSuspenseQuery<CategoriesResponse>({
    queryKey: USER_QUERY_KEY.CATEGORIES,
    queryFn: async () => {
      const response = await fetch(CATEGORY_FULL_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`촬영 상황 조회 API 실패: ${response.status}`);
      }

      const data = await response.json();

      if (!data.data) return [];
      return data.data.places;
    },
    staleTime: 30 * 1000, // 30 seconds
    retry: 0,
  });
};

export const useMoodFilters = () => {
  const { isLogIn } = useAuth();
  return useSuspenseQuery<GetMoodFilterListResponse>({
    queryKey: USER_QUERY_KEY.MOODS_FILTER(isLogIn ? 'user' : 'guest'),
    queryFn: async () => {
      // 로그인 상태
      if (isLogIn) {
        const response = await apiRequest<ApiResponseBodyGetMoodFilterListResponseVoid>({
          method: 'GET',
          endPoint: MOODS_ENDPOINT,
        });

        if (!response.data) {
          throw new Error('무드 필터 데이터를 불러오지 못했습니다.');
        }
        return response.data;
      }

      // 비 로그인상태
      const response = await fetch(MOODS_FULL_URL, {
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
