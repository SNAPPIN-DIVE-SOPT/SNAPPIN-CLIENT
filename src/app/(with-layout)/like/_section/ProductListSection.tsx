import { ProductList } from '@/ui';
import { useGetLikeProducts } from '@/app/(with-layout)/like/api';
import LikeEmpty from '@/app/(with-layout)/like/component/empty/LikeEmpty';
import { useRef } from 'react';
import { useScrollRestoreOnParent } from '@/hooks/useScrollRestoreOnParent';

export default function ProductListSection() {
  const { data: likedProductResponse } = useGetLikeProducts();

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollKey = 'like:product:scroll';
  useScrollRestoreOnParent(anchorRef, scrollKey, [likedProductResponse.products?.length], {
    enabled: true,
    resetOnKeyChange: true,
  });

  if (!likedProductResponse || likedProductResponse.products?.length === 0)
    return <LikeEmpty tab='PRODUCT' />;

  return (
    <section>
      <div ref={anchorRef} />
      <ProductList
        productList={
          likedProductResponse.products?.map((product) => ({
            id: product.id ?? 0,
            photographer: product.photographer ?? '',
            moods: product.moods ?? [],
            rate: product.rate ?? 0,
            reviewCount: product.reviewCount ?? 0,
            price: product.price ?? 0,
            title: product.title ?? '',
            imageUrl: product.imageUrl ?? '',
          })) ?? []
        }
        className='bg-black-3 flex flex-col gap-[0.6rem]'
        itemClassName='bg-black-1'
      />
    </section>
  );
}
