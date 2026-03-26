'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetProductList } from '../api';
import { ProductList } from '@/ui/product-card';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import { ROUTES } from '@/constants/routes/routes';

type ProductListSectionProps = {
  id: number;
};

export default function ProductListSection({ id }: ProductListSectionProps) {
  const { data, fetchNextPage, hasNextPage, dataUpdatedAt } = useGetProductList(id);
  const { ref, inView } = useInView();

  const productList =
    data?.pages
      .flatMap((page) => page.data?.products ?? [])
      .map((p) => ({
        id: p.id ?? 0,
        photographer: p.photographer ?? '',
        moods: p.moods ?? [],
        rate: p.rate ?? 0,
        reviewCount: p.reviewCount ?? 0,
        price: p.price ?? 0,
        title: p.title ?? '',
        imageUrl: p.imageUrl ?? '',
      })) ?? [];

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollKey = useMemo(() => {
    return ROUTES.PHOTOGRAPHER(id, { tab: 'PRODUCT' }).replace(/^\//, '').replace('?', ':scroll?');
  }, [id]);
  useScrollRestoreOnParent(anchorRef, scrollKey, [productList.length, dataUpdatedAt], {
    enabled: !!data,
    resetOnKeyChange: true,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (productList.length === 0) {
    return (
      <section>
        <div className='flex min-h-[calc(100dvh-7.5rem-7.2rem)] items-center justify-center'>
          <span className='caption-14-rg text-black-6 text-center'>
            아직 작가님이
            <br />
            상품을 등록하지 않았어요
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className='mt-[17.1rem]'>
      <div ref={anchorRef} />
      <ProductList productList={productList} />
      <div ref={ref} className='h-[0.1rem]' />
    </section>
  );
}
