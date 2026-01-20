import { Divider } from '@/ui';
import { formatPrice } from '@/utils/price';
import { DetailRow } from '../components';
import { formatNumberWithComma } from '@/utils/formatNumberWithComma';

type PaymentDetailProps = {
  basePrice: number;
  extraPrices?: { name?: string; amount?: number }[];
  totalPrice: number;
};

export default function PaymentDetail({
  basePrice,
  extraPrices = [],
  totalPrice,
}: PaymentDetailProps) {
  return (
    <section className='bg-black-1 h-auto px-[2rem] pt-[1.7rem] pb-[2.4rem]'>
      <span className='caption-14-bd text-black-10'>결제 상세</span>
      <div className='border-black-5 mt-[1.2rem] rounded-[0.6rem] border-[0.07rem] px-[1.7rem] py-[1.3rem]'>
        <div className='flex flex-col gap-[1.5rem]'>
          <DetailRow
            label='기본 촬영 비용'
            value={`${formatNumberWithComma(basePrice)}원`}
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
          <Divider />
          <div className='flex items-center justify-between'>
            <div className='caption-14-bd'>최종 결제 금액</div>
            <div className='title-23-eb'>{formatNumberWithComma(totalPrice)}원</div>
          </div>
        </div>
      </div>
    </section>
  );
}
