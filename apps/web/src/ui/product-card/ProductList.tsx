import { memo } from 'react';
import { ProductFrame } from '@/ui';

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
}: ProductListProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className}>
      {productList.map((product) => (
        <ProductFrame
          key={product.id}
          id={product.id}
          isLiked={false} // api 연동 시 수정
          photographer={product.photographer}
          moods={product.moods}
          rate={product.rate}
          reviewCount={product.reviewCount}
          price={product.price}
          name={product.title}
          image={{ src: product.imageUrl, alt: `${product.title} 상품` }}
        />
      ))}
    </div>
  );
}

export default memo(ProductList);
