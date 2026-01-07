import { Divider } from '@/ui/divider';
import { DetailLayout, DetailRow } from '../components/detail-layout/DetailLayout';
import { formatPrice } from '@/utils/price';

type ReciptProps = {
  basePrice: number;
  extraPrice: number;
  totalPrice: number;
};

export default function Recipt({ basePrice, extraPrice, totalPrice }: ReciptProps) {
  return (
    <DetailLayout title='결제 상세' className='gap-[1.5rem]'>
      <DetailRow label='기본 가격' value={`${basePrice}원`} />
      <DetailRow label='추가 가격' value={`${extraPrice}원`} />
      <DetailRow label='총 가격' value={`${totalPrice}원`} />
      <Divider thickness='small' color='bg-black-3' />
      <div className='flex items-center justify-between'>
        <span className='caption-14-bd'>최종 결제 금액</span>
        <span className='title-23-eb'>{formatPrice(totalPrice)}원</span>
      </div>
    </DetailLayout>
  );
}
