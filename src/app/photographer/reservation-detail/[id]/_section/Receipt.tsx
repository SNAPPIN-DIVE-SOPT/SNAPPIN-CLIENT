import { Divider } from '@/ui/divider';
import { DetailLayout, DetailRow } from '../components/detail-layout/DetailLayout';
import { formatPrice } from '@/utils/price';

type ReceiptProps = {
  basePrice: number;
  extraPrice: number;
  totalPrice: number;
};

export default function Receipt({ basePrice, extraPrice, totalPrice }: ReceiptProps) {
  return (
    <DetailLayout title='결제 상세' className='gap-[1.5rem] py-[1.7rem]'>
      <DetailRow
        label='기본 촬용 비용'
        value={`${formatPrice(basePrice)}`}
        className='justify-between'
      />
      <DetailRow
        label='추가 비용'
        value={`${formatPrice(extraPrice)}`}
        className='justify-between'
      />
      <Divider thickness='small' color='bg-black-3' />
      <div className='flex items-center justify-between'>
        <span className='caption-14-bd'>최종 결제 금액</span>
        <span className='title-23-eb'>{formatPrice(totalPrice)}</span>
      </div>
    </DetailLayout>
  );
}
