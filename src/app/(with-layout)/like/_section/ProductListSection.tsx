import { ProductList } from '@/ui';
import { useGetLikeProducts } from '@/app/(with-layout)/like/api';
import LikeEmpty from '@/app/(with-layout)/like/component/empty/LikeEmpty';

export default function ProductListSection() {
  const { data: likedProductResponse } = useGetLikeProducts();

  if (!likedProductResponse || likedProductResponse.length === 0)
    return <LikeEmpty tab='PRODUCT' />;

  return (
    <section>
      <ProductList
        productList={likedProductResponse}
        className='bg-black-3 flex flex-col gap-[0.6rem]'
        itemClassName='bg-black-1'
      />
    </section>
  );
}
