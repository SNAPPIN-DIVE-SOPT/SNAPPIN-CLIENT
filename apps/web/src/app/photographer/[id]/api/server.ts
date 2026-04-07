import { QueryClient } from '@tanstack/react-query';
import {
  photographerDetailOptions,
  photographerPortfoliosOptions,
  photographerProductsOptions
} from './options';

// 작가 상세 조회 prefetch
export const prefetchPhotographerDetail = (queryClient: QueryClient, id: number) => {
  return queryClient.prefetchQuery(photographerDetailOptions(id));
}

// 포폴 목록 조회 prefetch
export const prefetchPortfolioList = (
  queryClient: QueryClient,
  id: number,
  isLogIn: boolean
) => {
  return queryClient.prefetchInfiniteQuery({
    ...photographerPortfoliosOptions(id, isLogIn),
    pages: 1,
  });
}

// 상품 목록 조회 prefetch
export const prefetchProductList = (queryClient: QueryClient, id: number) => {
  return queryClient.prefetchInfiniteQuery({
    ...photographerProductsOptions(id),
    pages: 1,
  });
}