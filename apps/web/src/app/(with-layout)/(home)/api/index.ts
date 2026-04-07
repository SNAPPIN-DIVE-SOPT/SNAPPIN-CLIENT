import { GetPopularMoodProductItemResponse } from '@/swagger-api';
import { useQuery } from '@tanstack/react-query';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { USER_QUERY_KEY } from '@/query-key/user';

export const useGetPopularProducts = (moodId: number) => {
  const moodCode = moodId > 0 ? String(moodId) : undefined;
  //토큰 불필요 api 이므로 fetch 사용
  return useQuery<GetPopularMoodProductItemResponse[]>({
    queryKey: USER_QUERY_KEY.PRODUCT_RECOMMENDATION(moodCode),
    queryFn: () =>
      fetch(`${SERVER_API_BASE_URL}/api/v1/products/popular?moodId=${moodId}`, {
        method: 'GET',
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch popular products: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          return data.data.products;
        }),
    enabled: !!moodCode,
  });
};
