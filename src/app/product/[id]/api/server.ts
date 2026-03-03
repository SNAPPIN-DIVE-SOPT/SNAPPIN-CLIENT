import { QueryClient } from '@tanstack/react-query';
import { productDetailOptions, productPortfoliosOptions, productReviewsOptions } from './options';

// 상품 상세 정보 및 상품 안내 조회 prefetch
export const prefetchProductDetail = (queryClient: QueryClient, id: number, isLogIn: boolean) => {
  return queryClient.prefetchQuery(productDetailOptions(id, isLogIn));
};

// 포폴 목록 조회 prefetch
export const prefetchPortfolioList = async (queryClient: QueryClient, id: number) => {
  return queryClient.prefetchInfiniteQuery({
    ...productPortfoliosOptions(id),
    pages: 1,
  });
};

// 상품 리뷰 목록 조회 prefetch
export const prefetchProductReviewList = async (queryClient: QueryClient, id: number) => {
  return queryClient.prefetchInfiniteQuery({
    ...productReviewsOptions(id),
    pages: 1,
  });
};