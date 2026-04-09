import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import {
  photographerDetailOptions,
  photographerPortfoliosOptions,
  photographerProductsOptions
} from './options';

// 작가 상세 조회 API
export const useGetPhotographerDetail = (id: number) => {
  return useSuspenseQuery(photographerDetailOptions(id));
}

// 포폴 목록 조회 API
export const useGetPortfolioList = (id: number, isLogIn: boolean) => {
  return useSuspenseInfiniteQuery(photographerPortfoliosOptions(id, isLogIn));
}

// 상품 목록 조회 API
export const useGetProductList = (id: number, isLogIn: boolean) => {
  return useSuspenseInfiniteQuery(photographerProductsOptions(id, isLogIn));
}