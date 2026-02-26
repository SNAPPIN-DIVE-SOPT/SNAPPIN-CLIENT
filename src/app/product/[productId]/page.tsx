import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
  defaultShouldDehydrateQuery
} from '@tanstack/react-query';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { PRODUCT_TAB } from './constants/tab';
import { Header, ProductDetailContent, ProductDetailSkeleton } from './components/index';
import { prefetchProductDetail, prefetchPortfolioList, prefetchProductReviewList } from './api/server';

type PageProps = {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ tab: string }>;
}

// TODO: 폴더명 productId -> id
export default async function Page({ params, searchParams }: PageProps) {
  const { productId: id } = await params;
  const { tab } = await searchParams;
  const productId = Number(id);

  const promises = [];
  const cookieStore = await cookies();
  const isLogIn = cookieStore.has('AccessToken');
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      }
    }
  });

  if (!Number.isNaN(productId)) {
    promises.push(prefetchProductDetail(queryClient, productId, isLogIn));
    if (tab === 'PORTFOLIO') {
      promises.push(prefetchPortfolioList(queryClient, productId));
    }
    if (tab === 'REVIEW') {
      promises.push(prefetchProductReviewList(queryClient, productId));
    }
  }
  Promise.all(promises);

  return (
    <main>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductDetailSkeleton selectedTab={PRODUCT_TAB.PRODUCT_DETAIL} />}>
          <ProductDetailContent productId={productId} tab={tab} />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}
