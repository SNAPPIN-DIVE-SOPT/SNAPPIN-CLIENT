import LikeEmpty from '@/app/(with-layout)/like/component/empty/LikeEmpty';
import ProductList from '@/ui/frame/product/ProductList';
import { PRODUCT_LIST_MOCK } from '@/app/product/[id]/mocks/mock';

export default function ProductListSection() {
  /*const { data: likedProductResponse } = useGetLikeProducts();*/
  /* const productList = [PRODUCT_MOCK, PRODUCT_MOCK, PRODUCT_MOCK];*/
  const productList = PRODUCT_LIST_MOCK;

  /* const anchorRef = useRef<HTMLDivElement | null>(null);
  const scrollKey = 'like:product:scroll';
  useScrollRestoreOnParent(anchorRef, scrollKey, [likedProductResponse.products?.length], {
    enabled: true,
    resetOnKeyChange: true,
  });*/

  if (!productList || productList.length === 0) return <LikeEmpty tab='PRODUCT' />;

  return (
    <section>
      {/*<div ref={anchorRef} />*/}
      {/*<ProductList
        products={
          likedProductResponse.products?.map((product) => ({
            id: product.id ?? 0,
            photographer: product.photographer ?? '',
            moods: product.moods ?? [],
            rate: product.rate ?? 0,
            reviewCount: product.reviewCount ?? 0,
            price: product.price ?? 0,
            title: product.title ?? '',
            imageUrl: product.imageUrl ?? '',
          })) ?? []
        }
        className='bg-black-1 grid grid-cols-2 gap-x-[0.3rem] gap-y-[1.2rem]'
      />*/}
      <ProductList products={productList} />
    </section>
  );
}
