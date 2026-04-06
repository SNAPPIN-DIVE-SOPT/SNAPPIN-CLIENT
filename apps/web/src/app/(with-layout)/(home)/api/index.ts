import { GetMoodFilterResponse, GetPopularMoodProductItemResponse } from '@/swagger-api';
import { useQuery } from '@tanstack/react-query';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { USER_QUERY_KEY } from '@/query-key/user';

export const useGetPopularProducts = (moodId: string | undefined) => {
  //토큰 불필요 api 이므로 fetch 사용
  return useQuery<GetPopularMoodProductItemResponse[]>({
    queryKey: USER_QUERY_KEY.PRODUCT_RECOMMENDATION(moodId),
    queryFn: () =>
      fetch(`${SERVER_API_BASE_URL}/api/v1/products/popular?moodId=${moodId}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          return data.data.products;
        }),
    enabled: !!moodId,
  });
};

export const useGetMoodIdList = () => {
  //토큰 불필요 api 이므로 fetch 사용
  return useQuery<GetMoodFilterResponse[]>({
    queryKey: ['moods'],
    queryFn: () =>
      fetch(`${SERVER_API_BASE_URL}/api/v2/moods`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          return data.data.moods;
        }),
  });
};
