import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
  CategoriesResponse,
  GetAllMoodFiltersData,
  GetMoodFilterListResponse,
  GetPlaceResponse,
  GetPortfolioListData,
  GetProductListData,
} from '@/swagger-api';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { apiRequest } from '@/api/apiRequest';
import { useAuth } from '@/auth/hooks/useAuth';
import { PORTFOLIO_QUERY_KEY, PRODUCT_QUERY_KEY, USER_QUERY_KEY } from '@/query-key/user';

const CATEGORY_END_POINT = '/api/v1/categories';
const CATEGORY_FULL_URL = SERVER_API_BASE_URL + CATEGORY_END_POINT;

const MOODS_ENDPOINT = '/api/v1/moods';
const MOODS_FULL_URL = SERVER_API_BASE_URL + MOODS_ENDPOINT;

const PLACE_ENDPOINT = '/api/v1/places';
const PLACE_FULL_URL = `${SERVER_API_BASE_URL}${PLACE_ENDPOINT}`;

const PORTFOLIO_ENDPOINT = '/api/v2/portfolios';
const PORTFOLIO_FULL_URL = `${SERVER_API_BASE_URL}${PORTFOLIO_ENDPOINT}`;

const PRODUCT_ENDPOINT = '/api/v2/products';
const PRODUCT_FULL_URL = `${SERVER_API_BASE_URL}${PRODUCT_ENDPOINT}`;

export const useSearchPlaces = (keyword: string) => {
  const trimmedKeyword = keyword.trim();

  return useQuery<GetPlaceResponse[]>({
    queryKey: USER_QUERY_KEY.PLACES_SEARCH(trimmedKeyword),
    queryFn: async ({ signal }) => {
      if (trimmedKeyword === '') return [];

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
    staleTime: 30 * 1000,
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
  const authResolved = isLogIn !== null;

  return useQuery<GetMoodFilterListResponse>({
    queryKey: USER_QUERY_KEY.MOODS_FILTER(isLogIn ? 'user' : 'guest'),
    enabled: authResolved,
    queryFn: async () => {
      if (isLogIn) {
        const response = await apiRequest<GetAllMoodFiltersData>({
          method: 'GET',
          endPoint: MOODS_ENDPOINT,
        });

        if (!response.data) {
          throw new Error('무드 필터 데이터를 불러오지 못했습니다.');
        }

        return response.data;
      }

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

export const buildExploreQuery = (sp: URLSearchParams) => {
  const query = new URLSearchParams();

  const moodIds = sp.get('moodIds');
  if (moodIds) query.set('moodIds', moodIds);

  const minPrice = sp.get('minPrice');
  if (minPrice) query.set('minPrice', minPrice);

  const maxPrice = sp.get('maxPrice');
  if (maxPrice) query.set('maxPrice', maxPrice);

  const photographerId = sp.get('photographerId');
  if (photographerId) query.set('photographerId', photographerId);

  const snapCategory = sp.get('snapCategory');
  if (snapCategory) query.set('snapCategory', snapCategory);

  const placeId = sp.get('placeId');
  if (placeId) query.set('placeId', placeId);

  const date = sp.get('date');
  if (date) query.set('date', date);

  const peopleCount = sp.get('peopleCount');
  if (peopleCount && Number(peopleCount) > 0) query.set('peopleCount', peopleCount);

  return query;
};

const buildExploreListQuery = (sp: URLSearchParams) => {
  const query = buildExploreQuery(sp);
  const sort = sp.get('sort');

  query.set('snapCategory', 'GRADUATION');

  if (sort) query.set('sort', sort);

  return query;
};

const toRequestParams = (query: URLSearchParams) => {
  return Object.fromEntries(query.entries());
};

const getExploreListQueryKey = (sp: URLSearchParams, isLogIn: boolean) => {
  const baseQuery = buildExploreListQuery(sp);

  return `${baseQuery.toString()}-${isLogIn ? 'login' : 'guest'}`;
};

export const getExplorePortfolioListQueryKey = (sp: URLSearchParams, isLogIn: boolean) => {
  return PORTFOLIO_QUERY_KEY.LIST(getExploreListQueryKey(sp, isLogIn));
};

export const getExploreProductListQueryKey = (sp: URLSearchParams, isLogIn: boolean) => {
  return PRODUCT_QUERY_KEY.LIST(getExploreListQueryKey(sp, isLogIn));
};

export const useGetPortfolioList = (sp: URLSearchParams, isLogIn: boolean) => {
  const baseQuery = buildExploreListQuery(sp);

  return useSuspenseInfiniteQuery<GetPortfolioListData>({
    queryKey: getExplorePortfolioListQueryKey(sp, isLogIn),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const url = new URL(PORTFOLIO_FULL_URL);

      baseQuery.forEach((value, key) => url.searchParams.set(key, value));

      if (pageParam !== undefined && pageParam !== null) {
        url.searchParams.set('cursor', String(pageParam));
      }

      if (isLogIn) {
        const response = await apiRequest<GetPortfolioListData>({
          endPoint: PORTFOLIO_ENDPOINT,
          method: 'GET',
          params: toRequestParams(url.searchParams),
        });

        if (!response.data) {
          throw new Error('/api/v2/portfolios 응답에 데이터가 존재하지 않습니다.');
        }

        return response;
      }

      const response = await fetch(url.toString(), { method: 'GET' });
      if (!response.ok) {
        throw new Error('/api/v2/portfolios 응답 실패');
      }

      const data = await response.json();
      if (!data.data) {
        throw new Error('/api/v2/portfolios 응답에 데이터가 존재하지 않습니다.');
      }

      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.hasNext ? lastPage.meta?.nextCursor : undefined;
    },
  });
};

export const useGetProductList = (sp: URLSearchParams, isLogIn: boolean) => {
  const baseQuery = buildExploreListQuery(sp);

  return useSuspenseInfiniteQuery<GetProductListData>({
    queryKey: getExploreProductListQueryKey(sp, isLogIn),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const url = new URL(PRODUCT_FULL_URL);

      baseQuery.forEach((value, key) => url.searchParams.set(key, value));

      if (pageParam !== undefined && pageParam !== null) {
        url.searchParams.set('cursor', String(pageParam));
      }

      if (isLogIn) {
        const response = await apiRequest<GetProductListData>({
          endPoint: PRODUCT_ENDPOINT,
          method: 'GET',
          params: toRequestParams(url.searchParams),
        });

        if (!response.data) {
          throw new Error('/api/v2/products 응답에 데이터가 존재하지 않습니다.');
        }

        return response;
      }

      const response = await fetch(url.toString(), { method: 'GET' });
      if (!response.ok) {
        throw new Error('/api/v2/products 응답 실패');
      }

      const data = await response.json();
      if (!data.data) {
        throw new Error('/api/v2/products 응답에 데이터가 존재하지 않습니다.');
      }

      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.hasNext ? lastPage.meta?.nextCursor : undefined;
    },
  });
};
