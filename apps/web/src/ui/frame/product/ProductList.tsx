import ProductFrame, { ProductFrameProps } from './ProductFrame';

type ProductListProps = {
  products: ProductFrameProps[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className='grid w-full grid-cols-2 gap-[0.2rem]'>
      {products.map((product) => (
        <ProductFrame key={product.id} {...product} />
      ))}
    </div>
  );
}
