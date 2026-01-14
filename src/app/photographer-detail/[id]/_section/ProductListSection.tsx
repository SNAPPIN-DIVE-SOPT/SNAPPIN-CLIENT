import Link from 'next/link';
import { ProductCard } from '@/ui';

type ProductListSectionProps = {
  products: {
    id: number;
    imageUrl: string;
    title: string;
    rate: number;
    reviewCount: number;
    photographer: string;
    price: number;
    moods: string[];
  }[]
}

export default function ProductListSection({ products }: ProductListSectionProps) {
  return (
    <section>
      {products.length === 0
        ?
          <div className='flex justify-center items-center min-h-[calc(100vh-30.4rem)]'>
            <span className='caption-14-rg text-black-6 text-center'>
              아직 작가님이<br/>상품을 등록하지 않았어요
            </span>
          </div>
        :
          <>
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product-detail/${product.id}`}
                className='flex flex-col gap-[1rem] px-[2rem] py-[1.6rem] border-b-1 border-b-black-3 bg-black-1'
              >
                <ProductCard
                  image={{ src: product.imageUrl, alt: `${product.title} 상품 대표 이미자` }}
                  name={product.title}
                  rate={product.rate}
                  reviewCount={product.reviewCount}
                  photographer={product.photographer}
                  price={product.price}
                  moods={product.moods}
                />
              </Link>
            ))}
          </>
      }
    </section>
  );
}