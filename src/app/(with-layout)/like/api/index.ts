import { WishedPortfoliosResponse, WishedProductsResponse } from '@/swagger-api/data-contracts';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import {
  ApiResponseBodyWishedPortfoliosResponseVoid,
  ApiResponseBodyWishedProductsResponseVoid,
} from '@/swagger-api/data-contracts';
import { USER_QUERY_KEY } from '@/query-key/user';

export const useGetLikePortfolios = () => {
  return useQuery<WishedPortfoliosResponse>({
    queryKey: USER_QUERY_KEY.WISHED_PORTFOLIOS(),
    queryFn: async () => {
      const res = await apiRequest<ApiResponseBodyWishedPortfoliosResponseVoid>({
        endPoint: '/api/v1/wishes/portfolios',
        method: 'GET',
      });
      if (!res.data) throw new Error('No data from /api/v1/wishes/portfolios');
      return res.data;
    },
  });
};

export const useGetLikeProducts = () => {
  return useQuery<WishedProductsResponse>({
    queryKey: USER_QUERY_KEY.WISHED_PRODUCTS(),
    queryFn: async () => {
      const res = await apiRequest<ApiResponseBodyWishedProductsResponseVoid>({
        endPoint: '/api/v1/wishes/products',
        method: 'GET',
      });
      if (!res.data) throw new Error('No data from /api/v1/wishes/products');
      return res.data;
    },
  });
};
