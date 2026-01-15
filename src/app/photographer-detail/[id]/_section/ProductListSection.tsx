import { ProductList } from '@/ui';

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
        ? <div className='flex justify-center items-center min-h-[calc(100vh-29.9rem)] '>
            <span className='caption-14-rg text-black-6 text-center'>
              아직 작가님이<br/>상품을 등록하지 않았어요
            </span>
          </div>
        : <ProductList productList={products} />
      }
    </section>
  );
}