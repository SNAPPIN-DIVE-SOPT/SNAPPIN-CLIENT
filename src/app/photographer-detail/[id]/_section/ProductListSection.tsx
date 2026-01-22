import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ProductList, ProductListSkeleton } from '@/ui';
import { useGetProductList } from '../api';

type ProductListSectionProps = {
  id: number;
}

export default function ProductListSection({ id }: ProductListSectionProps) {
  const { data, isFetching, fetchNextPage, hasNextPage } = useGetProductList(Number(id));
  const { ref, inView } = useInView();

  const productList = data?.pages
    .flatMap(page => page.data?.products ?? [])
    .map(p => ({
      id: p.id ?? 0,
      photographer: p.photographer ?? '',
      moods: p.moods ?? [],
      rate: p.rate ?? 0,
      reviewCount: p.reviewCount ?? 0,
      price: p.price ?? 0,
      title: p.title ?? '',
      imageUrl: p.imageUrl ?? '',
    })) ?? [];
  const isEmpty = productList.length === 0;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isFetching && isEmpty) {
    return (
      <section className='mt-[4.6rem]'>
        <ProductListSkeleton />
      </section>
    );
  };

  if (isEmpty) {
    return (
      <section>
        <div className='flex justify-center items-center min-h-[calc(100dvh-7.5rem-7.2rem)]'>
          <span className='caption-14-rg text-black-6 text-center'>
            아직 작가님이<br/>상품을 등록하지 않았어요
          </span>
        </div>
      </section>
    );
  };
  
  return (
    <section className='mt-[17.1rem]'>
      <ProductList productList={productList} />
      <div ref={ref} className='h-[0.1rem]' />
    </section>
  );
}