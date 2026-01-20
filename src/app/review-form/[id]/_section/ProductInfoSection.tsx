import { ProductCard } from '@/ui';
import { REVIEW_PRODUCT } from '../mock/reviewProduct.mock';

type ProductInfoSectionProps = {
  reservationId: string;
};

export default function ProductInfoSection({
  // TODO: API 연동
  reservationId: _reservationId,
}: ProductInfoSectionProps) {
  const data = REVIEW_PRODUCT.reservations.reservation;

  return (
    <section className='py-[1.6rem] pr-[4.2rem] pl-[2rem]'>
      <ProductCard
        image={{ src: data.product.imageUrl, alt: data.product.title }}
        name={data.product.title}
        rate={data.product.rate}
        reviewCount={data.product.reviewCount}
        photographer={data.product.photographer}
        price={data.product.price}
        moods={data.product.moods}
      />
    </section>
  );
}
