import 'server-only';

import { type QueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest.server';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { PORTFOLIO_QUERY_KEY } from '@/query-key/user';
import { GetPortfolioDetailData, GetPortfolioDetailResponse } from '@/swagger-api';

const getPortfolioDetailServer = async (
  id: number,
  isLogIn: boolean,
): Promise<GetPortfolioDetailResponse> => {
  if (isLogIn) {
    const res = await apiRequest<GetPortfolioDetailData>({
      endPoint: `/api/v1/portfolios/${id}`,
      method: 'GET',
    });

    if (!res.data) {
      throw new Error('/api/v1/portfolios/{portfolioId} 응답에 데이터가 존재하지 않습니다.');
    }

    return res.data;
  }

  const res = await fetch(`${SERVER_API_BASE_URL}/api/v1/portfolios/${id}`, { method: 'GET' });

  if (!res.ok) {
    throw new Error('포트폴리오 상세 정보를 불러오는 데 실패했습니다.');
  }

  const data = await res.json();
  return data.data;
};

export const prefetchPortfolioDetail = (queryClient: QueryClient, id: number, isLogIn: boolean) => {
  return queryClient.prefetchQuery({
    queryKey: PORTFOLIO_QUERY_KEY.DETAIL(id, isLogIn),
    queryFn: () => getPortfolioDetailServer(id, isLogIn),
  });
};
