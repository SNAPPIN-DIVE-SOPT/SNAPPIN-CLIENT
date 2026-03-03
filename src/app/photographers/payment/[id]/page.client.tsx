'use client';

import { BottomCTAButton, Navigation } from '@/ui';
import { IconArrowBack, IconHome } from '@/assets';
import CompleteModal from './@modal/(.)complete-modal/CompleteModal';
import CancelModal from './@modal/(.)cancel-modal/CancelModal';
import PaymentSummaryCard from './components/PaymentSummaryCard';
import { usePaymentSummary } from './hooks/usePaymentSummary';
import { usePaymentPageActions } from './hooks/usePaymentPageActions';

type PageClientProps = {
  id: number;
  basePrice: number;
};

export default function PageClient({ id, basePrice }: PageClientProps) {
  const { extraPrices, totalAmount, handleSubmitPayment, resetExtraPrices } = usePaymentSummary(
    id,
    basePrice,
  );

  const {
    completeOpen,
    cancelOpen,
    setCompleteOpen,
    setCancelOpen,
    handleBackClick,
    handleHomeClick,
    handleExitConfirm,
    handleOpenPaymentModal,
    handlePaymentConfirm,
    handleAddPayment,
  } = usePaymentPageActions({
    id,
    onSubmitPayment: handleSubmitPayment,
    onResetExtraPrices: resetExtraPrices,
  });

  return (
    <main>
      <Navigation
        isFixed
        left={<IconArrowBack onClick={handleBackClick} />}
        center={<p className='font-16-bd'>결제 요청</p>}
        right={<IconHome onClick={handleHomeClick} />}
        className='border-b-black-5 border-b-1'
      />

      <section className='bg-black-1 flex flex-col gap-[1.2rem] px-[2rem] pt-[1.7rem] pb-[2.4rem]'>
        <h2 className='caption-14-bd'>결제 요청</h2>
        <PaymentSummaryCard
          basePrice={basePrice}
          extraPrices={extraPrices}
          totalAmount={totalAmount}
          handleClickAddPayment={handleAddPayment}
        />
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
    </main>
  );
}
