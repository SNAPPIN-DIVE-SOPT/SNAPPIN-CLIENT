import Link from 'next/link';
import { ProductCard } from '@/ui';
import { MoodCode } from '@/types/moodCode';

type ProductSectionProps = {
  id: number;
  image: { src: string; alt: string; };
  name: string;
  rating: number;
  reviewCount: number;
  author: string;
  price: number;
  tags: MoodCode[];
};

export default function ProductSection({
  id,
  image,
  name,
  rating,
  reviewCount,
  author,
  price,
  tags
}: ProductSectionProps) {
  return (
    <section className='flex flex-col gap-[1.6rem] px-[2rem] py-[1.6rem] bg-black-1'>
      <h2 className='caption-14-bd text-black-10'>이 작가님의 상품 살펴보기</h2>
      <Link
        href={`/product-detail/${id}`}
        aria-label={`${name} 상품 상세 페이지로 이동`}
        className='flex flex-col justify-center items-start self-stretch gap-[1rem] p-[1.2rem] bg-black-1 border-1 border-black-4 rounded-[0.6rem]'
      >
        <ProductCard
          image={image}
          name={name}
          rating={rating}
          reviewCount={reviewCount}
          author={author}
          price={price}
          tags={tags}
        />
      </Link>
    </section>
  );
}