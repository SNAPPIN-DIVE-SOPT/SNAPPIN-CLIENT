'use client';

import { useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BottomCTAButton, FieldMessage, Navigation, TextField } from '@/ui';
import { IconArrowBack, IconHome } from '@/assets';
import { MAX_NAME_LENGTH, useAddPaymentForm } from './hooks/useAddPaymentForm';
import { useExtraPrices } from '../hooks/useExtraPrices';
import CancelModal from '../@modal/(.)cancel-modal/CancelModal';

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
    if (isDirty) return openCancelModal(() => router.push('/'));
    router.push('/');
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
        center={<p className='caption-14-bd text-black-10'>결제 요청</p>}
        right={<IconHome onClick={handleClickHome} />}
        className='border-b-black-5 border-b-1'
      />

      <div className='flex flex-1 flex-col gap-[1.2rem] px-[2rem] py-[2rem]'>
        <TextField
          id='name'
          label='비용명'
          placeholder='비용명을 입력해주세요.'
          value={compatibleFormData.name}
          onChange={(e) => updateName(e.target.value)}
          hasError={!!compatibleErrors.name}
          maxLength={MAX_NAME_LENGTH}
          helpText={compatibleErrors.name ?? '공백 포함 20자까지 입력 가능해요.'}
          showMaxLength={true}
        />
        <TextField
          id='amount'
          label='금액(원)'
          placeholder='금액을 입력해주세요.'
          value={compatibleFormData.amount}
          inputMode='numeric'
          onChange={(e) => updateAmount(e.target.value)}
          hasError={!!compatibleErrors.amount}
          helpText={compatibleErrors.amount ?? '10,000,000원 미만까지 입력 가능해요.'}
        />
      </div>

      <BottomCTAButton className='px-[2rem] pb-[2rem]'>
        <BottomCTAButton.Single disabled={!isValid} onClick={handleSubmit}>
          추가하기
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
