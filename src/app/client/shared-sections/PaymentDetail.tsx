'use client';

import { Divider } from '@/ui';
import type { ReservationDetailMockPaymentInfo } from '@/app/client/reservation-detail/[id]/mock/reservationDetail.mock';
import { formatNumberWithComma } from '@/utils/formatNumberWithComma';

type PaymentDetailProps = {
  paymentInfo: ReservationDetailMockPaymentInfo;
};

type PaymentInfoField = {
  label: string;
  value: string;
};

const createPaymentInfoFieldsByPaymentInfo = ({
  basePrice,
  extraPrice,
}: ReservationDetailMockPaymentInfo): PaymentInfoField[] => [
  { label: '기본 촬영 비용', value: `${formatNumberWithComma(basePrice)}원` },
  { label: '추가 비용', value: `${formatNumberWithComma(extraPrice)}원` },
];

export default function PaymentDetail({ paymentInfo }: PaymentDetailProps) {
  const paymentInfoFields = createPaymentInfoFieldsByPaymentInfo(paymentInfo);

  return (
    <section className='bg-black-1 h-auto px-[2rem] pt-[1.7rem] pb-[2.4rem]'>
      <div className='flex justify-between'>
        <span className='caption-14-bd text-black-10'>결제 상세</span>
      </div>
      <div className='border-black-5 mt-[1.2rem] rounded-[0.6rem] border-[0.07rem] px-[1.7rem] py-[1.3rem]'>
        <div className='flex flex-col gap-[1.5rem]'>
          {paymentInfoFields.map(({ label, value }) => (
            <div key={label} className='flex justify-between'>
              <div className='caption-12-md text-black-7'>{label}</div>
              <div className='caption-14-bd text-black-10'>{value}</div>
            </div>
          ))}
          <Divider />
          <div className='flex items-center justify-between'>
            <div className='caption-14-bd'>최종 결제 금액</div>
            <div className='title-23-eb'>{`${formatNumberWithComma(paymentInfo.totalPrice)}원`}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
