import Link from 'next/link';
import { ProductCard } from '@/ui';

type ProductSectionProps = {
  id: number;
  image: { src: string; alt: string };
  name: string;
  rate: number;
  reviewCount: number;
  photographer: string;
  price: number;
  moods: string[];
};

export default function ProductSection({
  id,
  image,
  name,
  rate,
  reviewCount,
  photographer,
  price,
  moods,
}: ProductSectionProps) {
  return (
    <section className='bg-black-1 flex flex-col gap-[1.6rem] px-[2rem] py-[1.6rem]'>
      <h2 className='font-16-bd text-black-10'>이 작가님의 상품 살펴보기</h2>
      <Link
        href={`/product-detail/${id}`}
        aria-label={`${name} 상품 상세 페이지로 이동`}
        className='bg-black-1 border-black-4 flex flex-col items-start justify-center gap-[1rem] self-stretch rounded-[0.6rem] border-1 p-[1.2rem]'
      >
        <ProductCard
          image={image}
          name={name}
          rate={rate}
          reviewCount={reviewCount}
          photographer={photographer}
          price={price}
          moods={moods}
        />
      </Link>
    </section>
  );
}
