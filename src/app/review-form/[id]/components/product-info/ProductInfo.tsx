import { ProductCard } from '@/ui';
import { REVIEW_PRODUCT } from '../../mock/reviewProduct.mock';

export default function ProductInfo() {
  const data = REVIEW_PRODUCT.reservations.reservation;

  return (
    <div>
      <ProductCard
        image={}
        name={``}
        rate={data.r}
        reviewCount={data.product.reviewCount}
        photographer={data.product.photographer}
      />
    </div>
  );
}
