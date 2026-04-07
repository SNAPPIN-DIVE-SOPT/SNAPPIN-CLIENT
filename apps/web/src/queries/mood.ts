import { useQuery } from '@tanstack/react-query';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { GetMoodFilterResponse } from '@/swagger-api';
import { USER_QUERY_KEY } from '@/query-key/user';

export const useGetMoodIdList = () => {
  //토큰 불필요 api 이므로 fetch 사용
  return useQuery<GetMoodFilterResponse[]>({
    queryKey: USER_QUERY_KEY.MOODS,
    queryFn: () =>
      fetch(`${SERVER_API_BASE_URL}/api/v2/moods`, {
        method: 'GET',
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch moods: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          return data.data.moods;
        }),
  });
};
