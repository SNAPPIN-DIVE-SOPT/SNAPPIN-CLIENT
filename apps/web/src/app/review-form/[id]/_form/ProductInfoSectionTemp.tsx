'use client';

import { ProductCard, ProductCardSkeleton } from '@/ui';
import { useGetProductDetail } from '@/app/product/[id]/api';

type ProductInfoSectionTempProps = { productId: number };

export default function ProductInfoSectionTemp({ productId }: ProductInfoSectionTempProps) {
  const { data, isPending } = useGetProductDetail(productId, true);

  if (isPending) {
    return <ProductCardSkeleton className='py-[1.6rem] pr-[4.2rem] pl-[2rem]' />
  }

  return (
    <section className='py-[1.6rem] pr-[4.2rem] pl-[2rem]'>
      <ProductCard
        image={{ src: data.images?.[0], alt: data.title}}
        name={data.title}
        rate={data.averageRate}
        reviewCount={data.reviewCount}
        photographer={data.photographerInfo?.name ?? ''}
        price={data.price}
        moods={data.productInfo.moods}
      />
    </section>
  );
}
