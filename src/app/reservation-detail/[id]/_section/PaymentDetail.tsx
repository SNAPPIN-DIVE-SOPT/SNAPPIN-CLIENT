import { Divider } from '@/ui';
import { formatNumberWithComma } from '@/utils/formatNumberWithComma';
import { DetailRow } from '../components';

type PaymentDetailProps = {
  paymentInfo: {
    basePrice: number;
    extraPrice: number;
    totalPrice: number;
  };
};

export default function PaymentDetail({ paymentInfo }: PaymentDetailProps) {
  return (
    <section className='bg-black-1 h-auto px-[2rem] pt-[1.7rem] pb-[2.4rem]'>
      <span className='caption-14-bd text-black-10'>결제 상세</span>
      <div className='border-black-5 mt-[1.2rem] rounded-[0.6rem] border-[0.07rem] px-[1.7rem] py-[1.3rem]'>
        <div className='flex flex-col gap-[1.5rem]'>
          <DetailRow
            label='기본 촬영 비용'
            value={`${formatNumberWithComma(paymentInfo.basePrice)}원`}
            className='justify-between'
            valueClassName='caption-14-bd'
          />
          <DetailRow
            label='추가 비용'
            value={`${formatNumberWithComma(paymentInfo.extraPrice)}원`}
            className='justify-between'
            valueClassName='caption-14-bd'
          />
          <Divider />
          <div className='flex items-center justify-between'>
            <div className='caption-14-bd'>최종 결제 금액</div>
            <div className='title-23-eb'>{formatNumberWithComma(paymentInfo.totalPrice)}원</div>
          </div>
        </div>
      </div>
    </section>
  );
}
