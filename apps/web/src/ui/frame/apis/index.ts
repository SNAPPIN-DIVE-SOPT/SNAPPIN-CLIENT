import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/api/apiRequest.client';
import { PORTFOLIO_QUERY_KEY, PRODUCT_QUERY_KEY } from '@/query-key/user';
import {
  GetPopularMoodProductItemResponse,
  GetPortfolioCardResponseV2,
  GetPortfolioDetailResponse,
  GetPortfolioListData,
  GetProductDetailResponse,
  GetProductCardResponseV2,
  GetProductListData,
  GetWishedPortfoliosData,
  GetWishedProductsData,
  UpdateWishPortfolioData,
  UpdateWishProductData,
  WishPortfolioResponse,
  WishProductResponse,
  WishedPortfolioResponse,
  WishedProductResponse,
} from '@/swagger-api';

type UseLikeProps = {
  id: number;
  isLogin: boolean;
};

type LikeMutationVariables = {
  id: number;
  currentIsLiked: boolean;
};

const isInfiniteQueryData = <TData>(
  value: unknown,
): value is InfiniteData<TData, string | undefined> => {
  if (typeof value !== 'object' || value === null) return false;
  if (!('pages' in value)) return false;

  return Array.isArray(value.pages);
};

const updateLikeCount = (likeCount: number | undefined, nextIsLiked: boolean) => {
  if (likeCount === undefined) return likeCount;

  return nextIsLiked ? likeCount + 1 : Math.max(likeCount - 1, 0);
};

const updateProductCard = (
  product: GetProductCardResponseV2,
  productId: number,
  nextIsLiked: boolean,
) => {
  if (product.id !== productId) return product;

  return {
    ...product,
    isLiked: nextIsLiked,
    likeCount: updateLikeCount(product.likeCount, nextIsLiked),
  };
};

const updatePopularProductCard = (
  product: GetPopularMoodProductItemResponse,
  productId: number,
  nextIsLiked: boolean,
) => {
  if (product.id !== productId) return product;

  return {
    ...product,
    isLiked: nextIsLiked,
  };
};

const updatePortfolioCard = (
  portfolio: GetPortfolioCardResponseV2,
  portfolioId: number,
  nextIsLiked: boolean,
) => {
  if (portfolio.id !== portfolioId) return portfolio;

  return {
    ...portfolio,
    isLiked: nextIsLiked,
    likeCount: updateLikeCount(portfolio.likeCount, nextIsLiked),
  };
};

const patchPagedProductLists = (
  old: InfiniteData<GetProductListData, string | undefined> | undefined,
  productId: number,
  nextIsLiked: boolean,
) => {
  if (!isInfiniteQueryData<GetProductListData>(old)) return old;

  return {
    ...old,
    pages: old.pages.map((page) => ({
      ...page,
      data: page.data?.products
        ? {
            ...page.data,
            products: page.data.products.map((product) =>
              updateProductCard(product, productId, nextIsLiked),
            ),
          }
        : page.data,
    })),
  };
};

const patchPagedPortfolioLists = (
  old: InfiniteData<GetPortfolioListData, string | undefined> | undefined,
  portfolioId: number,
  nextIsLiked: boolean,
) => {
  if (!isInfiniteQueryData<GetPortfolioListData>(old)) return old;

  return {
    ...old,
    pages: old.pages.map((page) => ({
      ...page,
      data: page.data?.portfolios
        ? {
            ...page.data,
            portfolios: page.data.portfolios.map((portfolio) =>
              updatePortfolioCard(portfolio, portfolioId, nextIsLiked),
            ),
          }
        : page.data,
    })),
  };
};

const patchLikedProductLists = (
  old: InfiniteData<GetWishedProductsData, string | undefined> | undefined,
  productId: number,
  nextIsLiked: boolean,
) => {
  if (!isInfiniteQueryData<GetWishedProductsData>(old)) return old;

  return {
    ...old,
    pages: old.pages.map((page) => ({
      ...page,
      data: page.data?.products
        ? {
            ...page.data,
            products: nextIsLiked
              ? page.data.products
              : page.data.products.filter(
                  (product: WishedProductResponse) => product.id !== productId,
                ),
          }
        : page.data,
    })),
  };
};

const patchLikedPortfolioLists = (
  old: InfiniteData<GetWishedPortfoliosData, string | undefined> | undefined,
  portfolioId: number,
  nextIsLiked: boolean,
) => {
  if (!isInfiniteQueryData<GetWishedPortfoliosData>(old)) return old;

  return {
    ...old,
    pages: old.pages.map((page) => ({
      ...page,
      data: page.data?.portfolios
        ? {
            ...page.data,
            portfolios: nextIsLiked
              ? page.data.portfolios
              : page.data.portfolios.filter(
                  (portfolio: WishedPortfolioResponse) => portfolio.id !== portfolioId,
                ),
          }
        : page.data,
    })),
  };
};

const patchProductListQueries = (
  queryClient: QueryClient,
  productId: number,
  nextIsLiked: boolean,
) => {
  queryClient.setQueriesData<GetPopularMoodProductItemResponse[]>(
    { queryKey: PRODUCT_QUERY_KEY.LISTS() },
    (old) => {
      if (!Array.isArray(old)) return old;

      return old.map((product) => updatePopularProductCard(product, productId, nextIsLiked));
    },
  );

  queryClient.setQueriesData<InfiniteData<GetProductListData, string | undefined>>(
    { queryKey: PRODUCT_QUERY_KEY.LISTS() },
    (old) => patchPagedProductLists(old, productId, nextIsLiked),
  );

  queryClient.setQueriesData<InfiniteData<GetProductListData, string | undefined>>(
    { queryKey: [...PRODUCT_QUERY_KEY.all, 'photographer-list'] },
    (old) => patchPagedProductLists(old, productId, nextIsLiked),
  );

  queryClient.setQueriesData<InfiniteData<GetWishedProductsData, string | undefined>>(
    { queryKey: PRODUCT_QUERY_KEY.LIKES() },
    (old) => patchLikedProductLists(old, productId, nextIsLiked),
  );
};

const patchPortfolioListQueries = (
  queryClient: QueryClient,
  portfolioId: number,
  nextIsLiked: boolean,
) => {
  queryClient.setQueriesData<InfiniteData<GetPortfolioListData, string | undefined>>(
    { queryKey: PORTFOLIO_QUERY_KEY.LISTS() },
    (old) => patchPagedPortfolioLists(old, portfolioId, nextIsLiked),
  );

  queryClient.setQueriesData<InfiniteData<GetPortfolioListData, string | undefined>>(
    { queryKey: [...PORTFOLIO_QUERY_KEY.all, 'product-list'] },
    (old) => patchPagedPortfolioLists(old, portfolioId, nextIsLiked),
  );

  queryClient.setQueriesData<InfiniteData<GetPortfolioListData, string | undefined>>(
    { queryKey: [...PORTFOLIO_QUERY_KEY.all, 'photographer-list'] },
    (old) => patchPagedPortfolioLists(old, portfolioId, nextIsLiked),
  );

  queryClient.setQueriesData<InfiniteData<GetWishedPortfoliosData, string | undefined>>(
    { queryKey: PORTFOLIO_QUERY_KEY.LIKES() },
    (old) => patchLikedPortfolioLists(old, portfolioId, nextIsLiked),
  );
};

export const useWishProductLike = ({ id, isLogin }: UseLikeProps) => {
  const queryClient = useQueryClient();
  const detailQueryKey = PRODUCT_QUERY_KEY.DETAIL(id, isLogin);

  return useMutation<
    WishProductResponse,
    Error,
    LikeMutationVariables,
    {
      previousData?: GetProductDetailResponse;
    }
  >({
    mutationFn: async ({ id: productId }) => {
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
    onMutate: async ({ currentIsLiked }) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: detailQueryKey }),
        queryClient.cancelQueries({ queryKey: PRODUCT_QUERY_KEY.LISTS() }),
        queryClient.cancelQueries({ queryKey: [...PRODUCT_QUERY_KEY.all, 'photographer-list'] }),
        queryClient.cancelQueries({ queryKey: PRODUCT_QUERY_KEY.LIKES() }),
      ]);

      const previousData = queryClient.getQueryData<GetProductDetailResponse>(detailQueryKey);
      const nextIsLiked = !currentIsLiked;

      queryClient.setQueryData<GetProductDetailResponse>(detailQueryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          isLiked: nextIsLiked,
          likeCount: updateLikeCount(old.likeCount, nextIsLiked),
        };
      });

      patchProductListQueries(queryClient, id, nextIsLiked);

      return { previousData };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData === undefined) return;

      queryClient.setQueryData(detailQueryKey, context.previousData);

      void Promise.all([
        queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY.LISTS() }),
        queryClient.invalidateQueries({ queryKey: [...PRODUCT_QUERY_KEY.all, 'photographer-list'] }),
        queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY.LIKES() }),
      ]);
    },
    onSuccess: () => {},
  });
};

export const useWishPortfolioLike = ({ id, isLogin }: UseLikeProps) => {
  const queryClient = useQueryClient();
  const detailQueryKey = PORTFOLIO_QUERY_KEY.DETAIL(id, isLogin);

  return useMutation<
    WishPortfolioResponse,
    Error,
    LikeMutationVariables,
    {
      previousData?: GetPortfolioDetailResponse;
    }
  >({
    mutationFn: async ({ id: portfolioId }) => {
      const res = await apiRequest<UpdateWishPortfolioData>({
        endPoint: '/api/v1/wishes/portfolios',
        method: 'POST',
        data: { portfolioId },
      });

      if (!res.data) {
        throw new Error('/api/v1/wishes/portfolios 응답에 데이터가 존재하지 않습니다.');
      }

      return res.data;
    },
    onMutate: async ({ currentIsLiked }) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: detailQueryKey }),
        queryClient.cancelQueries({ queryKey: PORTFOLIO_QUERY_KEY.LISTS() }),
        queryClient.cancelQueries({ queryKey: [...PORTFOLIO_QUERY_KEY.all, 'product-list'] }),
        queryClient.cancelQueries({ queryKey: [...PORTFOLIO_QUERY_KEY.all, 'photographer-list'] }),
        queryClient.cancelQueries({ queryKey: PORTFOLIO_QUERY_KEY.LIKES() }),
      ]);

      const previousData = queryClient.getQueryData<GetPortfolioDetailResponse>(detailQueryKey);
      const nextIsLiked = !currentIsLiked;

      queryClient.setQueryData<GetPortfolioDetailResponse>(detailQueryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          isLiked: nextIsLiked,
          likeCount: updateLikeCount(old.likeCount, nextIsLiked),
        };
      });

      patchPortfolioListQueries(queryClient, id, nextIsLiked);

      return { previousData };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData === undefined) return;

      queryClient.setQueryData(detailQueryKey, context.previousData);

      void Promise.all([
        queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY.LISTS() }),
        queryClient.invalidateQueries({ queryKey: [...PORTFOLIO_QUERY_KEY.all, 'product-list'] }),
        queryClient.invalidateQueries({ queryKey: [...PORTFOLIO_QUERY_KEY.all, 'photographer-list'] }),
        queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY.LIKES() }),
      ]);
    },
    onSuccess: () => {},
  });
};
