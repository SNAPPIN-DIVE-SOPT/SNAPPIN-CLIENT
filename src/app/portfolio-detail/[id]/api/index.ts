import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { USER_QUERY_KEY } from '@/query-key/user';
import {
  GetPortfolioDetailResponse,
  GetPortfolioDetailData,
  WishPortfolioResponse,
  UpdateWishPortfolioData,
} from '@/swagger-api/data-contracts';
import { useAuth } from '@/auth/hooks/useAuth';

type WishPortfolioContext = {
  previousData?: GetPortfolioDetailResponse;
};

const getPortfolioDetail = async (
  id: number,
  isLogIn: boolean
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
}

// 포트폴리오 상세 조회 API
export const useGetPortfolioDetail = (id: number) => {
  const { isLogIn } = useAuth();

  return useQuery<GetPortfolioDetailResponse>({
    queryKey: USER_QUERY_KEY.PORTFOLIO_DETAIL(id, !!isLogIn),
    queryFn: () => getPortfolioDetail(id, !!isLogIn),
    enabled: !Number.isNaN(id),
  });
}

// 포폴 좋아요/취소 (위시) API
export const useWishPortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation<WishPortfolioResponse, Error, number, WishPortfolioContext>({
    mutationFn: async (id: number) => {
      const res = await apiRequest<UpdateWishPortfolioData>({
        endPoint: '/api/v1/wishes/portfolios',
        method: 'POST',
        data: { portfolioId: id },
      });

      if (!res.data) {
        throw new Error('/api/v1/wishes/portfolios 응답에 데이터가 존재하지 않습니다.');
      }
      return res.data;
    },
    // 낙관적 업데이트 수행
    onMutate: async (id) => {
      const authKey = USER_QUERY_KEY.PORTFOLIO_DETAIL(id, true);

      await queryClient.cancelQueries({ queryKey: authKey });

      const previousData = queryClient.getQueryData<GetPortfolioDetailResponse>(authKey);

      queryClient.setQueryData<GetPortfolioDetailResponse>(
        authKey,
        (old) => {
          if (!old || !old.likeCount) return old;

          const willBeLiked = !old.isLiked;

          return {
            ...old,
            isLiked: willBeLiked,
            likeCount: willBeLiked
              ? old.likeCount + 1
              : old.likeCount - 1,
          };
        }
      );

      return { previousData };
    },
    // 서버 실패 시 이전 상태 복구
    onError: (_error, id, context) => {
      if (!context?.previousData) return;

      queryClient.setQueryData(
        USER_QUERY_KEY.PORTFOLIO_DETAIL(id, true),
        context.previousData
      );
    },
    // 서버 상태와 동기화
    onSettled: (_data, _error, id) => {
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.PORTFOLIO_DETAIL(id, true),
      });
    },
  });
}