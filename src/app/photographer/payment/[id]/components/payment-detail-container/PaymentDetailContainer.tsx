'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BottomCTAButton, Button, Divider } from '@/ui';
import { formatPrice } from '@/utils/price';
import { IconAdd } from '@/assets';
import { usePaymentSummary } from '../../hooks/usePaymentSummary';
import CompleteModal from '../../@modal/(.)complete-modal/CompleteModal';

type PaymentDetailContainerProps = {
  id: number;
  basePrice: number;
};

export default function PaymentDetailContainer({ id, basePrice }: PaymentDetailContainerProps) {
  const router = useRouter();
  const [completeOpen, setCompleteOpen] = useState(false);
  const { extraPrices, totalAmount, submitPayment } = usePaymentSummary(id, basePrice);

  const handleAddPayment = () => {
    router.push(`/photographer/payment/${id}/add-payment`);
  };

  const handleSubmitPayment = () => {
    setCompleteOpen(true);
  };

  return (
    <>
      <div className='bg-black-1 flex flex-col gap-[1.2rem] px-[2rem] pt-[1.7rem] pb-[2.4rem]'>
        <h2 className='caption-14-bd'>결제 요청</h2>
        <div className='border-black-5 flex flex-col gap-[1.2rem] rounded-[0.6rem] border-1 p-[1.7rem]'>
          <PaymentDetailRow label='기본 촬영 비용' price={basePrice} />

          {extraPrices.length > 0 &&
            extraPrices.map((extraPrice, idx) => (
              <PaymentDetailRow
                key={`${extraPrice.name}-${idx}`}
                label={extraPrice.name}
                price={extraPrice.amount}
              />
            ))}

          <Button
            className='bg-black-3 text-black-8 flex items-center gap-[0.4rem]'
            size='large'
            onClick={handleAddPayment}
          >
            <IconAdd />
            <span className='caption-14-md'>촬영 비용 추가</span>
          </Button>
          <Divider thickness='small' color='bg-black-5' />
          <div className='flex items-center justify-between'>
            <span className='caption-14-bd'>최종 결제 금액</span>
            <div className='flex items-center gap-[0.2rem]'>
              <span className='title-23-eb'>{formatPrice(totalAmount)}</span>
              <span className='caption-14-md'>원</span>
            </div>
          </div>
        </div>
      </div>
      <BottomCTAButton className='bg-black-1 fixed-center bottom-0 px-[2rem] pt-[0.8rem] pb-[2rem]'>
        <BottomCTAButton.Single onClick={handleSubmitPayment}>결제 요청하기</BottomCTAButton.Single>
      </BottomCTAButton>
      <CompleteModal
        open={completeOpen}
        handleOpenChange={setCompleteOpen}
        handleClickConfirm={submitPayment}
      />
    </>
  );
}

const PaymentDetailRow = ({ label, price }: { label: string; price: number }) => {
  return (
    <div className='flex items-center justify-between'>
      <span className='caption-12-md'>{label}</span>
      <div className='flex items-center gap-[0.2rem]'>
        <span className='caption-14-bd'>{formatPrice(price)}</span>
        <span className='caption-14-md'>원</span>
      </div>
    </div>
  );
};
