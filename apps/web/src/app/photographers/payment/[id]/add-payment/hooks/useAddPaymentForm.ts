'use client';

import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ADD_PAYMENT_LIMITS, ADD_PAYMENT_TEXT } from './payment.schema';
import { formatPrice } from '@snappin/shared/lib';

export const addPaymentSchema = z.object({
  name: z
    .string()
    .min(1, ADD_PAYMENT_TEXT.NAME_REQUIRED)
    .max(ADD_PAYMENT_LIMITS.MAX_NAME_LENGTH, ADD_PAYMENT_TEXT.NAME_MAX_ERROR),

  amount: z
    .string()
    .trim()
    .min(1, ADD_PAYMENT_TEXT.AMOUNT_REQUIRED)
    .refine((v) => /^\d+$/.test(v), { message: ADD_PAYMENT_TEXT.AMOUNT_ONLY_NUMBER_ERROR })
    .refine((v) => Number(v) >= 1, { message: ADD_PAYMENT_TEXT.AMOUNT_MIN_ERROR })
    .refine((v) => Number(v) <= ADD_PAYMENT_LIMITS.MAX_AMOUNT, {
      message: ADD_PAYMENT_TEXT.AMOUNT_MAX_ERROR,
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
    control,
  } = useForm<AddPaymentInput>({
    resolver: zodResolver(addPaymentSchema),
    defaultValues: { name: '', amount: '' },
    mode: 'onChange',
  });

  const formData = useWatch({ control });

  const updateName = (value: string) => {
    if (value.length > ADD_PAYMENT_LIMITS.MAX_NAME_LENGTH) {
      setError('name', { message: ADD_PAYMENT_TEXT.NAME_MAX_ERROR });
      return;
    }

    setValue('name', value, { shouldValidate: true });
  };

  const updateAmount = (value: string) => {
    const raw = value.replace(/[^\d]/g, '');

    if (Number(raw) > ADD_PAYMENT_LIMITS.MAX_AMOUNT) {
      setError('amount', { message: ADD_PAYMENT_TEXT.AMOUNT_MAX_ERROR });
      return;
    }

    setValue('amount', raw, { shouldValidate: true });
  };

  const compatibleFormData = {
    name: formData?.name ?? '',
    amount: formData?.amount ? formatPrice(Number(formData.amount)) : '',
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
