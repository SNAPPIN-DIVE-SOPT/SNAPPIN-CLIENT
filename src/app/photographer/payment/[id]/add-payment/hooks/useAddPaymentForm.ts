'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatPrice } from '@/utils/price';

export const MAX_AMOUNT = 99_999_999;
export const MAX_NAME_LENGTH = 20;

export const addPaymentSchema = z.object({
  name: z
    .string()
    .min(1, '비용명을 입력해주세요.')
    .max(MAX_NAME_LENGTH, `비용명은 ${MAX_NAME_LENGTH}자 이하이어야 합니다.`),

  amount: z
    .string()
    .trim()
    .min(1, '금액을 입력해주세요.')
    .refine((v) => /^\d+$/.test(v), { message: '숫자만 입력해주세요.' })
    .refine((v) => Number(v) >= 1, { message: '금액은 1원 이상이어야 합니다.' })
    .refine((v) => Number(v) <= MAX_AMOUNT, {
      message: `금액은 ${formatPrice(MAX_AMOUNT)}원 이하이어야 합니다.`,
    }),
});

export type AddPaymentInput = z.infer<typeof addPaymentSchema>;

export const useAddPaymentForm = () => {
  const {
    handleSubmit,
    setValue,
    reset,
    trigger,
    setError,
    formState: { errors, isValid },
    watch,
  } = useForm<AddPaymentInput>({
    resolver: zodResolver(addPaymentSchema),
    defaultValues: { name: '', amount: '' },
    mode: 'onChange',
  });

  const formData = watch();

  const updateName = (value: string) => {
    if (value.length > MAX_NAME_LENGTH) {
      setError('name', { message: `비용명은 ${MAX_NAME_LENGTH}자 이하이어야 합니다.` });
      return;
    }

    setValue('name', value, { shouldValidate: true });
  };

  const updateAmount = (value: string) => {
    const raw = value.replace(/[^\d]/g, '');

    if (Number(raw) > MAX_AMOUNT) {
      setError('amount', { message: `금액은 ${formatPrice(MAX_AMOUNT)}원 이하이어야 합니다.` });
      return;
    }

    setValue('amount', raw, { shouldValidate: true });
  };

  const compatibleFormData = {
    name: formData.name,
    amount: formData.amount ? formatPrice(Number(formData.amount)) : '',
  };

  const compatibleErrors = {
    name: errors.name?.message,
    amount: errors.amount?.message,
  };

  const handleSubmitForm = async (onSuccess: () => void) => {
    const isValid = await trigger();

    if (isValid) {
      handleSubmit(() => {
        onSuccess();
        reset();
      })();
    }
  };
  return {
    isValid,
    compatibleFormData,
    compatibleErrors,
    handleSubmitForm,
    updateName,
    updateAmount,
  };
};
