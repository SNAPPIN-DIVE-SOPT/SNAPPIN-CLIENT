import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/auth/hooks/useAuth';
import { apiRequest } from '@/api/apiRequest';
import { SERVER_API_BASE_URL } from '@/api/constants/api';
import { USER_QUERY_KEY } from '@/query-key/user';
import {
  GetProductDetailResponse,
  GetProductDetailData,
  WishProductResponse,
  UpdateWishProductData,
  GetProductReviewsData,
  GetPortfolioListData,
} from '@/swagger-api/data-contracts';

type WishProductContext = {
  previousData?: GetProductDetailResponse;
};

const getProductDetail = async (
  id: number,
  isLogIn: boolean,
): Promise<GetProductDetailResponse> => {
  // 로그인 시 apiRequest 사용
  if (isLogIn) {
    const res = await apiRequest<GetProductDetailData>({
      endPoint: `/api/v1/products/${id}`,
      method: 'GET',
    });

    if (!res.data) throw new Error('/api/v1/products/{id} 응답에 데이터가 존재하지 않습니다.');
    return res.data;
  }

  // 비로그인 시 fetch 사용
  const res = await fetch(`${SERVER_API_BASE_URL}/api/v1/products/${id}`, { method: 'GET' });
  
  if (!res.ok) {
    throw new Error('상품 상세 정보 및 상품 안내 정보를 불러오는 데 실패했습니다.');
  }
  const data = await res.json();
  return data.data;
}

// 상품 상세 정보 및 상품 안내 조회 API
export const useGetProductDetail = (id: number) => {
  const { isLogIn } = useAuth();

  return useQuery<GetProductDetailResponse>({
    queryKey: USER_QUERY_KEY.PRODUCT_DETAIL(id, !!isLogIn),
    queryFn: () => getProductDetail(id, !!isLogIn),
    enabled: !Number.isNaN(id),
  })
}

// 상품 좋아요/취소 (위시) API
export const useWishProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<WishProductResponse, Error, number, WishProductContext>({
    mutationFn: async (id: number) => {
      const res = await apiRequest<UpdateWishProductData>({
        endPoint: '/api/v1/wishes/products',
        method: 'POST',
        data: { productId: id },
      });

      if (!res.data) {
        throw new Error('/api/v1/wishes/products 응답에 데이터가 존재하지 않습니다.');
      }
      return res.data;
    },
    // 낙관적 업데이트 수행
    onMutate: async (id) => {
      const authKey = USER_QUERY_KEY.PRODUCT_DETAIL(id, true);

      await queryClient.cancelQueries({ queryKey: authKey });

      const previousData = queryClient.getQueryData<GetProductDetailResponse>(authKey);

      queryClient.setQueryData<GetProductDetailResponse>(
        authKey,
        (old) => {
          if (!old) return old;

          const willBeLiked = !old.isLiked;

          return {
            ...old,
            isLiked: willBeLiked,
          };
        }
      );

      return { previousData };
    },
    // 서버 실패 시 이전 상태 복구
    onError: (_error, id, context) => {
      if (!context?.previousData) return;

      queryClient.setQueryData(
        USER_QUERY_KEY.PRODUCT_DETAIL(id, true),
        context.previousData
      );
    },
    // 서버 상태와 동기화
    onSettled: (_data, _error, id) => {
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.PRODUCT_DETAIL(id, true),
      });
    },
  });
}

// 포폴 목록 조회 API
export const useGetPortfolioList = (id: number) => {
  return useInfiniteQuery<GetPortfolioListData>({
    queryKey: USER_QUERY_KEY.PRODUCT_PORTFOLIOS(id),
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const url = new URL(`${SERVER_API_BASE_URL}/api/v1/portfolios`);
      url.searchParams.append('productId', String(id));
      if (pageParam) {
        url.searchParams.append('cursor', String(pageParam));
      }

      const res = await fetch(url.toString(), { method: 'GET' });

      if (!res.ok) {
        throw new Error('/api/v1/portfolios 응답에 데이터가 존재하지 않습니다.');
      }
      const data = await res.json();
      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined;
    },
    enabled: !Number.isNaN(id),
  });
}

// 상품 리뷰 목록 조회 API
export const useGetProductReviewList = (id: number) => {
  return useInfiniteQuery<GetProductReviewsData>({
    queryKey: USER_QUERY_KEY.PRODUCT_REVIEWS(id),
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const url = new URL(`${SERVER_API_BASE_URL}/api/v1/products/${id}/reviews`);
      if (pageParam) {
        url.searchParams.append('cursor', String(pageParam));
      }

      const res = await fetch(url.toString(), { method: 'GET' });

      if (!res.ok) {
        throw new Error('/api/v1/products/{productId}/reviews 응답에 데이터가 존재하지 않습니다.');
      }
      const data = await res.json();
      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.hasNext ? lastPage.meta.nextCursor : undefined;
    },
    enabled: !Number.isNaN(id),
  });
}