'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ERROR_MESSAGES,
  GenderValue,
  InterestValue,
  OnBoardingInput,
  SCHEMA,
  onBoardingSchema,
} from '../constants/onBoardingForm.schema';

export const useOnBoardingForm = () => {
  const {
    handleSubmit,
    setValue,
    reset,
    trigger,
    setError,
    formState: { errors, isValid },
    control,
  } = useForm<OnBoardingInput>({
    resolver: zodResolver(onBoardingSchema),
    defaultValues: {
      name: '',
      gender: undefined,
      nickname: '',
      phoneNumber: '',
      email: '',
      interests: [],
    },
    mode: 'onChange',
  });

  const formData = useWatch({ control });

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

  const updatePhoneNumber = (value: string) => {
    const sanitizedValue = value.replace(/[^\d-]/g, '');

    setValue('phoneNumber', sanitizedValue, { shouldValidate: true });
  };

  const updateEmail = (value: string) => {
    setValue('email', value, { shouldValidate: true });
  };

  const updateInterest = (value: InterestValue) => {
    const currentValues = formData?.interests ?? [];
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    setValue('interests', nextValues, { shouldValidate: true });
  };

  const compatibleFormData = {
    name: formData?.name ?? '',
    gender: formData?.gender ?? '',
    nickname: formData?.nickname ?? '',
    phoneNumber: formData?.phoneNumber ?? '',
    email: formData?.email ?? '',
    interests: formData?.interests ?? [],
  };
  const compatibleErrors = {
    name: errors.name?.message,
    gender: errors.gender?.message,
    nickname: errors.nickname?.message,
    phoneNumber: errors.phoneNumber?.message,
    email: errors.email?.message,
    interests: errors.interests?.message,
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
    trigger,
    compatibleFormData,
    compatibleErrors,
    handleSubmitForm,
    updateName,
    updateGender,
    updateNickname,
    updatePhoneNumber,
    updateEmail,
    updateInterest,
  };
};
