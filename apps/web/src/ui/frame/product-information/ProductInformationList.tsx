import ProductInformationFrame, { ProductInformationFrameProps } from './ProductInformationFrame';

type ProductInformationFrameListProps = {
  products: ProductInformationFrameProps[];
};

export default function ProductInformationList({ products }: ProductInformationFrameListProps) {
  return (
    <div className='grid w-full grid-cols-2 gap-[0.2rem]'>
      {products.map((product) => (
        <ProductInformationFrame key={product.id} {...product} />
      ))}
    </div>
  );
}
