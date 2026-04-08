import { apiRequest } from '@/api/apiRequest';
import { PRODUCT_QUERY_KEY } from '@/query-key/user';
import {
  GetPortfolioDetailResponse,
  UpdateWishPortfolioData,
  UpdateWishProductData,
  WishPortfolioResponse,
} from '@/swagger-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UseLikeProps = {
  id: number;
  isLogin: boolean;
};

export const useWishProductLike = ({ id, isLogin }: UseLikeProps) => {
  const queryClient = useQueryClient();
  const detailQueryKey = PRODUCT_QUERY_KEY.DETAIL(id, isLogin);

  return useMutation<
    WishPortfolioResponse,
    Error,
    number,
    {
      previousData?: GetPortfolioDetailResponse;
    }
  >({
    mutationFn: async (productId) => {
      const res = await apiRequest<UpdateWishProductData>({
        endPoint: '/api/v1/wishes/products',
        method: 'POST',
        data: { productId },
      });

      if (!res.data) {
        throw new Error('/api/v1/wishes/products 응답에 데이터가 존재하지 않습니다.');
      }

      return res.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: detailQueryKey });

      const previousData = queryClient.getQueryData<GetPortfolioDetailResponse>(detailQueryKey);

      queryClient.setQueryData<GetPortfolioDetailResponse>(detailQueryKey, (old) => {
        if (!old) return old;

        const nextIsLiked = !old.isLiked;

        return {
          ...old,
          isLiked: nextIsLiked,
          likeCount:
            old.likeCount === undefined
              ? old.likeCount
              : nextIsLiked
                ? old.likeCount + 1
                : old.likeCount - 1,
        };
      });

      return { previousData };
    },
    onError: (_error, _id, context) => {
      if (context?.previousData === undefined) return;

      queryClient.setQueryData(detailQueryKey, context.previousData);
    },
  });
};

export const useWishPortfolioLike = ({ id, isLogin }: UseLikeProps) => {
  const queryClient = useQueryClient();
  const detailQueryKey = PRODUCT_QUERY_KEY.DETAIL(id, isLogin);

  return useMutation<
    WishPortfolioResponse,
    Error,
    number,
    {
      previousData?: GetPortfolioDetailResponse;
    }
  >({
    mutationFn: async (productId) => {
      const res = await apiRequest<UpdateWishPortfolioData>({
        endPoint: '/api/v1/wishes/portfolios',
        method: 'POST',
        data: { productId },
      });

      if (!res.data) {
        throw new Error('/api/v1/wishes/portfolios 응답에 데이터가 존재하지 않습니다.');
      }

      return res.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: detailQueryKey });

      const previousData = queryClient.getQueryData<GetPortfolioDetailResponse>(detailQueryKey);

      queryClient.setQueryData<GetPortfolioDetailResponse>(detailQueryKey, (old) => {
        if (!old) return old;

        const nextIsLiked = !old.isLiked;

        return {
          ...old,
          isLiked: nextIsLiked,
          likeCount:
            old.likeCount === undefined
              ? old.likeCount
              : nextIsLiked
                ? old.likeCount + 1
                : old.likeCount - 1,
        };
      });

      return { previousData };
    },
    onError: (_error, _id, context) => {
      if (context?.previousData === undefined) return;

      queryClient.setQueryData(detailQueryKey, context.previousData);
    },
  });
};
