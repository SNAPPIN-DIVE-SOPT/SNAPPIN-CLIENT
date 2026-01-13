import { ProductCard } from '@/ui';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/app/(with-layout)/explore/mocks/product';

export default function ProductListSection() {
  return (
    <section className='bg-black-1 z-0 shrink-0'>
      {MOCK_PRODUCTS.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <ProductCard
            photographer={product.photographer}
            moods={product.moods}
            rate={product.rate}
            reviewCount={product.reviewCount}
            price={product.price}
            name={product.title}
            image={{ src: product.imageUrl, alt: `${product.title} 이미지` }}
            className='border-black-3 w-full border-b-[0.1rem] px-[2rem] py-[1.6rem] text-left'
          />
        </Link>
      ))}
    </section>
  );
}
