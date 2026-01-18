import {
  WishedPortfolioResponse,
  WishedPortfoliosResponse,
  WishedProductResponse,
  WishedProductsResponse,
} from '@/swagger-api/data-contracts';
import { useSuspenseQuery } from '@tanstack/react-query';

const LIKED_PORTFOLIO_END_POINT = `${process.env.NEXT_PUBLIC_API_SERVER_BASE_URL}/api/v1/wishes/portfolios`;
const LIKED_PRODUCT_END_POINT = `${process.env.NEXT_PUBLIC_API_SERVER_BASE_URL}/api/v1/wishes/products`;

const fetchLikePortfolios = async () => {
  const res = await fetch(LIKED_PORTFOLIO_END_POINT, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error('위시 포트폴리오 조회 에러');
  }
  return (await res.json()) as WishedPortfoliosResponse;
};

export const useGetLikePortfolios = () => {
  return useSuspenseQuery({
    // todo: 쿼리키 통합
    queryKey: ['likePortfolios'],
    queryFn: () => fetchLikePortfolios().then((res) => res.portfolios as WishedPortfolioResponse[]),
  });
};

const fetchLikeProducts = async () => {
  const res = await fetch(LIKED_PRODUCT_END_POINT, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error('위시 포트폴리오 조회 에러');
  }
  return (await res.json()) as WishedProductsResponse;
};

export const useGetLikeProducts = () => {
  return useSuspenseQuery({
    queryKey: ['likeProducts'],
    queryFn: () =>
      fetchLikeProducts().then((res) => res.products as Required<WishedProductResponse>[]),
  });
};
