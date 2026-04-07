'use client';

import { useEffect, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ERROR_MESSAGES,
  GenderValue,
  SnapCategoryValue,
  OnBoardingInput,
  SCHEMA,
  ON_BOARDING_SCHEMA,
} from '@/app/(auth)/on-boarding/[step]/constants/onBoardingForm.schema';

const ON_BOARDING_FORM_STORAGE_KEY = 'on-boarding-form';

export const useOnBoardingForm = () => {
  const isHydratedRef = useRef(false);
  const {
    handleSubmit,
    setValue,
    reset,
    trigger,
    setError,
    formState: { errors, isValid },
    control,
  } = useForm<OnBoardingInput>({
    resolver: zodResolver(ON_BOARDING_SCHEMA),
    defaultValues: {
      name: '',
      gender: undefined,
      nickname: '',
      phone: '',
      email: '',
      snapCategories: [],
    },
    mode: 'onChange',
  });

  const formData = useWatch({ control });

  useEffect(() => {
    try {
      const savedFormData = sessionStorage.getItem(ON_BOARDING_FORM_STORAGE_KEY);

      if (savedFormData) {
        reset(JSON.parse(savedFormData) as OnBoardingInput);
      }
    } catch {
      sessionStorage.removeItem(ON_BOARDING_FORM_STORAGE_KEY);
    }

    isHydratedRef.current = true;
  }, [reset]);

  useEffect(() => {
    if (!isHydratedRef.current || !formData) return;

    sessionStorage.setItem(ON_BOARDING_FORM_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateName = (value: string) => {
    if (value.length > SCHEMA.NAME_MAX) {
      setError('name', { message: ERROR_MESSAGES.NAME_MAX });
      return;
    }

    setValue('name', value, { shouldValidate: true });
  };

  const updateGender = (value: GenderValue) => {
    setValue('gender', value, { shouldValidate: true });
  };

  const updateNickname = (value: string) => {
    if (value.length > SCHEMA.NICKNAME_MAX) {
      setError('nickname', { message: ERROR_MESSAGES.NICKNAME_TEXT });
      return;
    }

    setValue('nickname', value, { shouldValidate: true });
  };

  const updatePhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    let sanitizedValue = digits;

    if (digits.length > 3 && digits.length <= 7) {
      sanitizedValue = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }

    if (digits.length > 7) {
      sanitizedValue = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }

    setValue('phone', sanitizedValue, { shouldValidate: true });
  };

  const updateEmail = (value: string) => {
    setValue('email', value, { shouldValidate: true });
  };

  const updateSnapCategory = (value: SnapCategoryValue) => {
    const currentValues = formData?.snapCategories ?? [];
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    setValue('snapCategories', nextValues, { shouldValidate: true });
  };

  const compatibleFormData = {
    name: formData?.name ?? '',
    gender: formData?.gender ?? '',
    nickname: formData?.nickname ?? '',
    phone: formData?.phone ?? '',
    email: formData?.email ?? '',
    snapCategories: formData?.snapCategories ?? [],
  };
  const compatibleErrors = {
    name: errors.name?.message,
    gender: errors.gender?.message,
    nickname: errors.nickname?.message,
    phone: errors.phone?.message,
    email: errors.email?.message,
    snapCategories: errors.snapCategories?.message,
  };

  const handleSubmitForm = async (onSuccess: () => void | Promise<void>) => {
    const isValid = await trigger();
    if (!isValid) return;

    handleSubmit(async () => {
      await onSuccess();

      sessionStorage.removeItem(ON_BOARDING_FORM_STORAGE_KEY);
      reset();
    })();
  };
  return {
    isValid,
    trigger,
    compatibleFormData,
    compatibleErrors,
    handleSubmitForm,
    updateName,
    updateGender,
    updateNickname,
    updatePhone,
    updateEmail,
    updateSnapCategory,
  };
};
