import { ProductList } from '@/ui';
import { PRODUCT_LIST_MOCK } from '../mock';

type ProductListSectionProps = {
  photographerId: number;
}

export default function ProductListSection({ photographerId }: ProductListSectionProps) {
  // TODO: 상품 목록 조회 API 연동 (request에 photographerId, cursor 전달)
  const mock = PRODUCT_LIST_MOCK;
  
  return (
    <section>
      {mock.products.length === 0
        ? <div className='flex justify-center items-center min-h-[calc(100vh-29.9rem)] '>
            <span className='caption-14-rg text-black-6 text-center'>
              아직 작가님이<br/>상품을 등록하지 않았어요
            </span>
          </div>
        : <ProductList productList={mock.products} />
      }
    </section>
  );
}