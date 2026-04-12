import { useSuspenseQuery } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest.client';
import { PORTFOLIO_QUERY_KEY } from '@/query-key/user';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { GetPortfolioDetailResponse, GetPortfolioDetailData } from '@/swagger-api';

const getPortfolioDetail = async (
  id: number,
  isLogIn: boolean,
): Promise<GetPortfolioDetailResponse> => {
  // 로그인 시 apiRequest 사용
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

  // 비로그인 시 fetch 사용
  const res = await fetch(`${SERVER_API_BASE_URL}/api/v1/portfolios/${id}`, { method: 'GET' });

  if (!res.ok) {
    throw new Error('포트폴리오 상세 정보를 불러오는 데 실패했습니다.');
  }
  const data = await res.json();
  return data.data;
};

// 포트폴리오 상세 조회 API
export const useGetPortfolioDetail = (id: number, isLogIn: boolean) => {
  return useSuspenseQuery<GetPortfolioDetailResponse>({
    queryKey: PORTFOLIO_QUERY_KEY.DETAIL(id, isLogIn),
    queryFn: () => getPortfolioDetail(id, isLogIn),
  });
};
