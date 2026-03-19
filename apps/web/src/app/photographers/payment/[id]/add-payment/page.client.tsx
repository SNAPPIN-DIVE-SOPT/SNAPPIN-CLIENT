'use client';

import { useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BottomCTAButton, Navigation, TextField } from '@snappin/design-system';
import { IconArrowBack, IconHome } from '@snappin/design-system/assets';
import { ROUTES } from '@/constants/routes/routes';
import CancelModal from '../@modal/(.)cancel-modal/CancelModal';
import { useExtraPrices } from '../hooks/useExtraPrices';
import { ADD_PAYMENT_TEXT, ADD_PAYMENT_LIMITS } from './hooks/payment.schema';
import { useAddPaymentForm } from './hooks/useAddPaymentForm';

export default function AddPaymentPage() {
  const router = useRouter();
  const { addExtraPrice } = useExtraPrices();

  const {
    isValid,
    compatibleFormData,
    compatibleErrors,
    handleSubmitForm,
    updateName,
    updateAmount,
  } = useAddPaymentForm();

  const [open, setOpen] = useState(false);

  const confirmActionRef = useRef<() => void>(() => {});

  const isDirty =
    compatibleFormData.name.trim().length > 0 || compatibleFormData.amount.trim().length > 0;

  const openCancelModal = useCallback((action: () => void) => {
    confirmActionRef.current = action;
    setOpen(true);
  }, []);

  const handleClickBack = () => {
    if (isDirty) return openCancelModal(() => router.back());
    router.back();
  };
  const handleClickHome = () => {
    if (isDirty) return openCancelModal(() => router.push(ROUTES.HOME));
    router.push(ROUTES.HOME);
  };
  const handleSubmit = () => {
    handleSubmitForm(() => {
      addExtraPrice({
        name: compatibleFormData.name,
        amount: Number(compatibleFormData.amount.replace(/,/g, '')),
      });
      router.back();
    });
  };

  return (
    <div className='bg-black-1 flex h-dvh w-full flex-col'>
      <Navigation
        isFixed
        left={<IconArrowBack onClick={handleClickBack} />}
        center={<p className='caption-14-bd text-black-10'>寃곗젣 ?붿껌</p>}
        right={<IconHome onClick={handleClickHome} />}
        className='border-b-black-5 border-b-1'
      />

      <div className='flex flex-1 flex-col gap-[1.2rem] px-[2rem] py-[2rem]'>
        <TextField
          id='name'
          label={ADD_PAYMENT_TEXT.NAME_LABEL}
          placeholder={ADD_PAYMENT_TEXT.NAME_REQUIRED}
          value={compatibleFormData.name}
          onChange={(e) => updateName(e.target.value)}
          hasError={!!compatibleErrors.name}
          maxLength={ADD_PAYMENT_LIMITS.MAX_NAME_LENGTH}
          helpText={compatibleErrors.name ?? ADD_PAYMENT_TEXT.NAME_HELP}
          showMaxLength={true}
        />
        <TextField
          id='amount'
          label={ADD_PAYMENT_TEXT.AMOUNT_LABEL}
          placeholder={ADD_PAYMENT_TEXT.AMOUNT_REQUIRED}
          value={compatibleFormData.amount}
          inputMode='numeric'
          onChange={(e) => updateAmount(e.target.value)}
          hasError={!!compatibleErrors.amount}
          helpText={compatibleErrors.amount ?? ADD_PAYMENT_TEXT.AMOUNT_HELP}
        />
      </div>

      <BottomCTAButton className='bg-black-1 fixed-center bottom-0' hasPadding>
        <BottomCTAButton.Single disabled={!isValid} onClick={handleSubmit}>
          異붽??섍린
        </BottomCTAButton.Single>
      </BottomCTAButton>

      <CancelModal
        open={open}
        handleOpenChange={setOpen}
        handleClickConfirm={() => confirmActionRef.current()}
      />
    </div>
  );
}
