'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useRef } from 'react';
import { GetProductCardResponseV2 } from '@/swagger-api';
import { useGetProductList } from '@/app/(with-layout)/explore/api';
import { useInfiniteScroll } from '@/app/(with-layout)/explore/hooks/use-infinite-scroll';
import { toExploreSearchParams } from '@/app/(with-layout)/explore/utils/query';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import type { ProductFrameProps } from '@/ui/frame/product/ProductFrame';
import FrameProductList from '@/ui/frame/product/ProductList';

const toProductFrameProps = (products: GetProductCardResponseV2[] = []): ProductFrameProps[] => {
  return products
    .filter((product): product is GetProductCardResponseV2 & { id: number } => product.id != null)
    .map((product) => ({
      id: product.id,
      isLiked: product.isLiked ?? false,
      image: {
        src: product.imageUrl || '/imgs/default-image.png',
        alt: `상품 이미지 ${product.id}`,
      },
      name: product.title ?? '',
      rate: product.averageRating ?? 0,
      reviewCount: product.reviewCount ?? 0,
      photographer: product.photographer ?? '',
      price: product.price ?? 0,
      moods: product.moods ?? [],
    }));
};

export default function ProductListSection() {
  const sp = useSearchParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, dataUpdatedAt } = useGetProductList(
    new URLSearchParams(sp.toString()),
  );
  const products = useMemo(() => {
    return data.pages.flatMap((page) => page.data?.products ?? []);
  }, [data.pages]);
  const productList = toProductFrameProps(products);
  const { sentinelRef } = useInfiniteScroll({
    enabled: true,
    hasNextPage,
    isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });
  const scrollKey = useMemo(() => {
    const allowed = toExploreSearchParams(new URLSearchParams(sp.toString()));

    allowed.delete('tab');

    const normalized = new URLSearchParams();
    normalized.set('tab', 'PRODUCT');
    allowed.forEach((value, key) => normalized.append(key, value));

    return `explore:product:scroll?${normalized.toString()}`;
  }, [sp]);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useScrollRestoreOnParent(anchorRef, scrollKey, [productList.length, dataUpdatedAt], {
    enabled: true,
    resetOnKeyChange: true,
  });

  if (productList.length === 0) {
    return (
      <section className='flex min-h-[calc(100vh-29.9rem)] flex-col items-center justify-center gap-[0.4rem]'>
        <h3 className='font-18-bd text-black-9'>검색 결과가 없어요</h3>
        <span className='caption-14-md text-black-6 mt-[0.8rem]'>다른 키워드로 검색해보세요</span>
      </section>
    );
  }

  return (
    <section>
      <div ref={anchorRef} />
      <FrameProductList products={productList} />
      <div ref={sentinelRef} className='h-[1px]' />
    </section>
  );
}
