import { MOCK_PRODUCTS } from '@/app/(with-layout)/explore/mocks/product';
import { ProductList } from '@/ui';

export default function ProductListSection() {
  const isProductListEmpty = MOCK_PRODUCTS.length === 0;

  if (isProductListEmpty)
    return (
      <section className='flex min-h-[calc(100vh-29.9rem)] flex-col items-center justify-center gap-[0.4rem]'>
        <h3 className='font-18-bd text-black-9'>검색 결과가 없어요</h3>
        <span className='caption-14-md text-black-6 mt-[0.8rem]'>다른 키워드로 검색해 보세요</span>
      </section>
    );

  return (
    <section>
      <ProductList productList={MOCK_PRODUCTS} />
    </section>
  );
}
