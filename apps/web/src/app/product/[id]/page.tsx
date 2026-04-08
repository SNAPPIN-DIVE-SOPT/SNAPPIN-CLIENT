import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getQueryClient } from '@/utils/getQueryClient';
import { PRODUCT_TAB } from '@/app/product/[id]/constants/tab';
import { Header, ProductDetailContent, ProductDetailSkeleton } from '@/app/product/[id]/components';
import {
  prefetchProductDetail,
  prefetchPortfolioList,
  prefetchProductReviewList,
} from '@/app/product/[id]/api/server';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { tab: rawTab } = await searchParams;
  const productId = Number(id);
  const tab = (Array.isArray(rawTab) ? rawTab[0] : rawTab) || PRODUCT_TAB.PRODUCT_DETAIL;

  if (Number.isNaN(productId)) {
    return notFound();
  }

  const promises = [];
  const queryClient = getQueryClient();
  const cookieStore = await cookies();
  const isLogIn = cookieStore.has('AccessToken');

  promises.push(prefetchProductDetail(queryClient, productId, isLogIn));
  if (tab === PRODUCT_TAB.PORTFOLIO) {
    promises.push(prefetchPortfolioList(queryClient, productId, isLogIn));
  }
  if (tab === PRODUCT_TAB.REVIEW) {
    promises.push(prefetchProductReviewList(queryClient, productId));
  }
  Promise.all(promises);

  return (
    <main>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ProductDetailSkeleton selectedTab={PRODUCT_TAB.PRODUCT_DETAIL} />}>
          <ProductDetailContent productId={productId} tab={tab} isLogIn={isLogIn} />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}
