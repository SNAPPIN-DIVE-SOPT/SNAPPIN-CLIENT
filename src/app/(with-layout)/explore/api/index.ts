import { useSuspenseQuery } from '@tanstack/react-query';
import { CategoriesResponse } from '@/swagger-api/data-contracts';
import { USER_QUERY_KEY } from '@/query-key/user';

const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_BASE_URL;
const END_POINT = '/api/v1/categories';
const FULL_URL = BASE_URL + END_POINT;

export const useGetCategories = () => {
  return useSuspenseQuery<CategoriesResponse>({
    queryKey: USER_QUERY_KEY.CATEGORIES,
    queryFn: async () => {
      const response = await fetch(FULL_URL, {
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
