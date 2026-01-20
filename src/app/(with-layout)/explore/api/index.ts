import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
  GetPlaceResponse,
  ApiResponseBodyGetMoodFilterListResponseVoid,
  CategoriesResponse,
  GetMoodFilterListResponse,
  GetProductListData,
  ApiResponseBodyGetPortfolioListResponseGetPortfolioMetaResponse,
} from '@/swagger-api/data-contracts';
import { USER_QUERY_KEY } from '@/query-key/user';
import { useAuth } from '@/auth/hooks/useAuth';
import { apiRequest } from '@/api/apiRequest';

const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_BASE_URL;

const CATEGORY_END_POINT = '/api/v1/categories';
const CATEGORY_FULL_URL = BASE_URL + CATEGORY_END_POINT;

const MOODS_ENDPOINT = '/api/v1/moods';
const MOODS_FULL_URL = BASE_URL + MOODS_ENDPOINT;

const PLACE_ENDPOINT = '/api/v1/places';
const PLACE_FULL_URL = `${BASE_URL}${PLACE_ENDPOINT}`;

const PORTFOLIO_ENDPOINT = '/api/v1/portfolios';
const PORTFOLIO_FULL_URL = `${BASE_URL}${PORTFOLIO_ENDPOINT}`;

const PRODUCT_ENDPOINT = '/api/v1/products';
const PRODUCT_FULL_URL = `${BASE_URL}${PRODUCT_ENDPOINT}`;

export const useSearchPlaces = (keyword: string) => {
  const trimmedKeyword = keyword.trim();

  return useQuery<GetPlaceResponse[]>({
    queryKey: USER_QUERY_KEY.PLACES_SEARCH(keyword),
    queryFn: async ({ signal }) => {
      if (keyword === '') return [];
      const url = `${PLACE_FULL_URL}?keyword=${encodeURIComponent(trimmedKeyword)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
      });

      if (!response.ok) {
        throw new Error(`촬영 장소 조회 API 요청 실패 ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      if (!data.data) return [];
      return data.data.places;
    },
    staleTime: 30 * 1000, // 30 seconds
    retry: 0,
  });
};

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

      if (!data) {
        throw new Error(`촬영 상황 조회 API 실패: ${response.status}`);
      }

      return data.data;
    },
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

// 탐색 쿼리 빌더
export const buildExploreQuery = (sp: URLSearchParams) => {
  const query = new URLSearchParams();

  const moodIds = sp.get('moodIds');
  if (moodIds) query.set('moodIds', moodIds);

  const photographerId = sp.get('photographerId');
  if (photographerId) query.set('photographerId', photographerId);

  const snapCategory = sp.get('snapCategory');
  if (snapCategory) query.set('snapCategory', snapCategory);

  const placeId = sp.get('placeId');
  if (placeId) query.set('placeId', placeId);

  const date = sp.get('date');
  if (date) query.set('date', date);

  const peopleCount = sp.get('peopleCount');
  if (peopleCount) query.set('peopleCount', peopleCount);

  return query;
};

// 포폴 목록 조회 API
export const useGetPortfolioList = (sp: URLSearchParams) => {
  const baseQuery = buildExploreQuery(sp);

  return useSuspenseInfiniteQuery<ApiResponseBodyGetPortfolioListResponseGetPortfolioMetaResponse>({
    queryKey: USER_QUERY_KEY.PORTFOLIO_LIST(baseQuery.toString()),
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const url = new URL(PORTFOLIO_FULL_URL);

      // 필터 파라미터 주입
      baseQuery.forEach((value, key) => url.searchParams.set(key, value));

      // 커서
      if (pageParam !== undefined && pageParam !== null) {
        url.searchParams.set('cursor', String(pageParam));
      }

      const res = await fetch(url.toString(), { method: 'GET' });
      if (!res.ok) throw new Error('/api/v1/portfolios 응답 실패');
      return await res.json();
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.hasNext ? lastPage.meta?.nextCursor : undefined;
    },
  });
};

// 상품 목록 조회 API
export const useGetProductList = (sq: URLSearchParams) => {
  const baseQuery = buildExploreQuery(sq);

  return useSuspenseInfiniteQuery<GetProductListData>({
    queryKey: USER_QUERY_KEY.PRODUCT_LIST(baseQuery.toString()),
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const url = new URL(PRODUCT_FULL_URL);

      // 필터 파라미터 주입
      baseQuery.forEach((value, key) => url.searchParams.set(key, value));

      // 커서
      if (pageParam !== undefined && pageParam !== null) {
        url.searchParams.set('cursor', String(pageParam));
      }

      const res = await fetch(url.toString(), { method: 'GET' });
      if (!res.ok) throw new Error('/api/v1/products 응답 실패');

      return await res.json();
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.hasNext ? lastPage.meta?.nextCursor : undefined;
    },
  });
};
