import { memo } from 'react';
import Link from 'next/link';
import { ProductCard } from '../..';
import { cn } from '../../../lib/cn';

type ProductListProps = {
  productList: {
    id: number;
    photographer: string;
    moods: string[];
    rate: number;
    reviewCount: number;
    price: number;
    title: string;
    imageUrl: string;
  }[];
  className?: string;
  itemClassName?: string;
};

function ProductList({
  productList,
  className,
  itemClassName,
}: ProductListProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className}>
      {productList.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <ProductCard
            photographer={product.photographer}
            moods={product.moods}
            rate={product.rate}
            reviewCount={product.reviewCount}
            price={product.price}
            name={product.title}
            image={{ src: product.imageUrl, alt: `${product.title} ?대?吏` }}
            className={cn(
              'border-black-3 w-full border-b-[0.1rem] px-[2rem] py-[1.6rem] text-left',
              itemClassName,
            )}
          />
        </Link>
      ))}
    </div>
  );
}

export default memo(ProductList);
