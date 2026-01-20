'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BottomCTAButton, Button, Divider, Navigation } from '@/ui';
import { formatPrice } from '@/utils/price';
import { IconAdd, IconArrowBack, IconHome } from '@/assets';
import { usePaymentSummary } from './hooks/usePaymentSummary';
import CompleteModal from './@modal/(.)complete-modal/CompleteModal';
import { useGetPaymentPrice } from './api';
import CancelModal from './@modal/(.)cancel-modal/CancelModal';

type PageClientProps = {
  id: number;
};

type ExitTarget = 'back' | 'home' | null;

export default function PageClient({ id }: PageClientProps) {
  const router = useRouter();
  const { data } = useGetPaymentPrice(id);

  const [completeOpen, setCompleteOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [exitTarget, setExitTarget] = useState<ExitTarget>(null);

  const {
    extraPrices,
    totalAmount,
    handleSubmitPayment,
    resetExtraPrices,
  } = usePaymentSummary(id, data?.price ?? 0);

  // 추가 비용 추가 페이지로 이동
  const handleAddPayment = () => {
    router.push(`/photographer/payment/${id}/add-payment`);
  };

  // 상단 네비게이션 뒤로/홈 클릭 시 모달 오픈
  const handleBackClick = () => {
    setExitTarget('back');
    setCancelOpen(true);
  };

  const handleHomeClick = () => {
    setExitTarget('home');
    setCancelOpen(true);
  };

  // CancelModal Confirm: reset 후 exitTarget에 따라 이동
  const handleExitConfirm = () => {
    resetExtraPrices();
    setCancelOpen(false);

    if (exitTarget === 'back') router.back();
    if (exitTarget === 'home') router.push('/');

    setExitTarget(null);
  };

  // 결제 요청하기: 모달 open
  const handleOpenPaymentModal = () => {
    setCompleteOpen(true);
  };

  // CompleteModal Confirm: submit 실행
  const handlePaymentConfirm = () => {
    setCompleteOpen(false);
    handleSubmitPayment();
  };

  return (
    <>
      <Navigation
        isFixed={true}
        left={<IconArrowBack onClick={handleBackClick} />}
        center={<p className='caption-14-bd'>결제 요청</p>}
        right={<IconHome onClick={handleHomeClick} />}
        className='border-b-black-5 border-b-1'
      />

      <section className='bg-black-1 flex flex-col gap-[1.2rem] px-[2rem] pt-[1.7rem] pb-[2.4rem]'>
        <h2 className='caption-14-bd'>결제 요청</h2>

        <div className='border-black-5 flex flex-col gap-[1.2rem] rounded-[0.6rem] border-1 p-[1.7rem]'>
          <PaymentDetailRow label='기본 촬영 비용' price={data?.price ?? 0} />

          {extraPrices.map((extraPrice, idx) => (
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
      </section>

      <BottomCTAButton className='bg-black-1 fixed-center bottom-0 px-[2rem] pt-[0.8rem] pb-[2rem]'>
        <BottomCTAButton.Single onClick={handleOpenPaymentModal}>
          결제 요청하기
        </BottomCTAButton.Single>
      </BottomCTAButton>

      <CompleteModal
        open={completeOpen}
        handleOpenChange={setCompleteOpen}
        handleClickConfirm={handlePaymentConfirm}
      />

      <CancelModal
        title='결제 요청을 그만둘까요?'
        open={cancelOpen}
        handleOpenChange={setCancelOpen}
        handleClickConfirm={handleExitConfirm}
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