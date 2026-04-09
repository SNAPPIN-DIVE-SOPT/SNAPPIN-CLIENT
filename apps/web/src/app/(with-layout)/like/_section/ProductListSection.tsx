'use client';

import { useRef } from 'react';
import LikeEmpty from '@/app/(with-layout)/like/component/empty/LikeEmpty';
import { useInfiniteScroll } from '@/app/(with-layout)/explore/hooks/use-infinite-scroll';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';
import ProductList from '@/ui/frame/product/ProductList';
import { useGetLikeProducts } from '@/app/(with-layout)/like/api';
import { LIKE_SCROLL_KEY } from '@/app/(with-layout)/like/constants/scroll';

export default function ProductListSection() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, dataUpdatedAt } =
    useGetLikeProducts();

  const productList = data.pages
    .flatMap((page) => page.data?.products ?? [])
    .map((product) => ({
      id: product.id ?? 0,
      photographer: product.photographer ?? '',
      moods: product.moods ?? [],
      rate: product.rate ?? 0,
      reviewCount: product.reviewCount ?? 0,
      price: product.price ?? 0,
      name: product.title ?? '',
      image: {
        src: product.imageUrl ?? '/imgs/default-image.png',
        alt: `${product.photographer} 작가 상품 ${product.id ?? 0}`,
      },
      isLiked: true,
    }));
  const { sentinelRef } = useInfiniteScroll({
    enabled: true,
    hasNextPage,
    isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  const anchorRef = useRef<HTMLDivElement | null>(null);

  useScrollRestoreOnParent(anchorRef, LIKE_SCROLL_KEY.PRODUCT, [productList.length, dataUpdatedAt], {
    enabled: !!data,
    resetOnKeyChange: true,
  });

  if (productList.length === 0) return <LikeEmpty tab='PRODUCT' />;

  return (
    <section>
      <div ref={anchorRef} />
      <ProductList products={productList} />
      <div ref={sentinelRef} className='h-[0.1rem]' />
    </section>
  );
}
