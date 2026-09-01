import WithTag, { WithTagProps } from './WithTag';

type WithTagListProps = {
  products: WithTagProps[];
};

export default function WithTagList({ products }: WithTagListProps) {
  return (
    <div className='grid w-full grid-cols-2 gap-[0.2rem]'>
      {products.map((product) => (
        <WithTag key={product.id} {...product} />
      ))}
    </div>
  );
}
