import { ProductList } from '@/ui';
import { MOCK_PRODUCTS } from '@/app/(with-layout)/like/mocks/product';

export default function ProductListSection() {
  const isProductListEmpty = MOCK_PRODUCTS.length === 0;

  if (isProductListEmpty)
    return (
      <section className='bg-black-1 flex min-h-[calc(100vh-29.9rem)] flex-col items-center justify-center gap-[0.4rem]'>
        <h3 className='font-18-bd text-black-9'>좋아요를 누른 상품이 없어요</h3>
        <span className='caption-14-md text-black-6'>
          &#39;탐색&#39;에서 다양한 상품을 확인해 보세요
        </span>
      </section>
    );

  return (
    <section>
      <ProductList
        productList={MOCK_PRODUCTS}
        className='bg-black-3 flex flex-col'
        itemClassName='bg-black-1'
      />
    </section>
  );
}
