import WithoutTag, { WithoutTagProps } from './WithoutTag';

type WithoutTagListProps = {
  products: WithoutTagProps[];
};

export default function WithoutTagList({ products }: WithoutTagListProps) {
  return (
    <div className='grid w-full grid-cols-2 gap-[0.2rem]'>
      {products.map((product) => (
        <WithoutTag key={product.id} {...product} />
      ))}
    </div>
  );
}
