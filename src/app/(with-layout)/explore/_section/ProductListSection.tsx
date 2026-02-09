import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetProductList } from '@/app/(with-layout)/explore/api';
import { useInfiniteScroll } from '@/app/(with-layout)/explore/hooks/use-infinite-scroll';
import { ProductListSkeleton } from '@/ui';
import { GetProductCardResponse } from '@/swagger-api/data-contracts';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';

const ProductList = dynamic(() => import('@/ui/product-card/product-list/ProductList'), {
  ssr: false,
});

export default function ProductListSection() {
  const sp = useSearchParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, dataUpdatedAt } = useGetProductList(
    new URLSearchParams(sp.toString()),
  );

  const products = useMemo(
    () =>
      data.pages
        .flatMap((p) => p.data?.products ?? [])
        .filter((p): p is GetProductCardResponse & { id: number } => p.id != null)
        .map((p) => ({
          id: p.id,
          photographer: p.photographer ?? '',
          moods: p.moods ?? [],
          rate: p.rate ?? 0,
          reviewCount: p.reviewCount ?? 0,
          price: p.price ?? 0,
          title: p.title ?? '',
          imageUrl: p.imageUrl ?? '',
        })),
    [data.pages],
  );

  const { sentinelRef } = useInfiniteScroll({
    enabled: true,
    hasNextPage,
    isFetchingNextPage,
    onLoadMore: () => fetchNextPage(),
  });
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollKey = useMemo(() => `explore:product:scroll?${sp.toString()}`, [sp]);
  useScrollRestoreOnParent(anchorRef, scrollKey, [products.length, dataUpdatedAt], {
    enabled: true,
    resetOnKeyChange: true,
  });

  const isProductListEmpty = products.length === 0;

  if (isProductListEmpty)
    return (
      <section className='flex min-h-[calc(100vh-29.9rem)] flex-col items-center justify-center gap-[0.4rem]'>
        <h3 className='font-18-bd text-black-9'>검색 결과가 없어요</h3>
        <span className='caption-14-md text-black-6 mt-[0.8rem]'>다른 키워드로 검색해보세요</span>
      </section>
    );

  return (
    <section>
      <div ref={anchorRef} />
      <ProductList productList={products} />
      <div ref={sentinelRef} className='h-[1px]' />
      {isFetchingNextPage && <ProductListSkeleton length={3} />}
    </section>
  );
}
