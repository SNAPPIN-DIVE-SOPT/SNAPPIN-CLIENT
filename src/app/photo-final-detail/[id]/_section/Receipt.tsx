import { Divider } from '@/ui/divider';
import { DetailLayout, DetailRow } from '../components/detail-layout/DetailLayout';
import { formatPrice } from '@/utils/price';

type ReceiptProps = {
  basePrice: number;
  extraPrices?: { name?: string; amount?: number }[];
  totalPrice: number;
};

export default function Receipt({ basePrice, extraPrices, totalPrice }: ReceiptProps) {
  return (
    <DetailLayout title='결제 상세' className='gap-[1.5rem] py-[1.7rem]'>
      <DetailRow
        label='기본 촬영 비용'
        value={`${formatPrice(basePrice)}원`}
        className='justify-between'
        valueClassName='caption-14-bd'
      />

      {extraPrices?.map(({ name, amount }, index) => (
        <DetailRow
          key={`${name ?? 'extra'}-${index}`}
          label={name ?? `추가 비용 ${index + 1}`}
          value={`${formatPrice(amount ?? 0)}원`}
          className='justify-between'
          valueClassName='caption-14-bd'
        />
      ))}

      <Divider thickness='small' color='bg-black-3' />
      <div className='flex items-center justify-between'>
        <span className='caption-14-bd'>최종 결제 금액</span>
        <div className='flex items-center gap-[0.4rem]'>
          <span className='title-23-eb'>{formatPrice(totalPrice)}</span>
          <span className='caption-14-md'>원</span>
        </div>
      </div>
    </DetailLayout>
  );
}
