import { ProductCard } from '@/ui';
import { STATE_CODES, StateCode } from '@/types/stateCode';

type ProductInfoProps = {
  id: number;
  imageUrl: string;
  title: string;
  rate: number;
  reviewCount: number;
  photographer: string;
  price: number;
  moods: string[];
  status: StateCode;
};

export default function ProductInfo({
  imageUrl,
  title,
  rate,
  reviewCount,
  photographer,
  price,
  moods,
}: ProductInfoProps) {
  return (
    <div className='py-[1.6rem] pr-[4.2rem] pl-[2rem]'>
      <ProductCard
        image={{ src: imageUrl, alt: title }}
        name={title}
        rate={rate}
        reviewCount={reviewCount}
        photographer={photographer}
        price={price}
        moods={moods}
      />
    </div>
  );
}
