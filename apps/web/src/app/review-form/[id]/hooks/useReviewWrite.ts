'use client';

import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const REVIEW_CONTENT_MAX_LENGTH = 500;
export const MAX_RATING = 5;
export const MAX_IMAGE_COUNT = 5;

// 리뷰 작성 폼 스키마
export const enrollReviewSchema = z.object({
  rating: z.number().min(1, '별점을 선택해 주세요.').max(MAX_RATING),
  content: z
    .string()
    .min(0)
    .max(REVIEW_CONTENT_MAX_LENGTH, `최대 ${REVIEW_CONTENT_MAX_LENGTH}자까지 입력할 수 있어요.`),
  imageUrls: z.array(z.string()).max(MAX_IMAGE_COUNT),
});

// 리뷰 작성 폼 입력 타입
export type EnrollReviewInput = z.infer<typeof enrollReviewSchema>;

// 리뷰 작성 훅
export const useReviewWrite = () => {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm<EnrollReviewInput>({
    resolver: zodResolver(enrollReviewSchema),
    defaultValues: { rating: 0, content: '', imageUrls: [] },
    mode: 'onChange',
  });

  // 폼 데이터 감시
  const [rating, content, imageUrls] = useWatch({
    control,
    name: ['rating', 'content', 'imageUrls'],
  });

  // 별점 업데이트 함수
  const updateRating = (value: number) => {
    setValue('rating', value, { shouldValidate: true });
  };

  // 리뷰 내용 업데이트 함수
  const updateContent = (value: string) => {
    const contentLength = value.length;
    const isContentOverMax = contentLength > REVIEW_CONTENT_MAX_LENGTH;

    if (isContentOverMax) {
      setError('content', {
        type: 'manual',
        message: `최대 ${REVIEW_CONTENT_MAX_LENGTH}자까지 입력할 수 있어요.`,
      });
    } else {
      clearErrors('content');
    }
    setValue('content', value, { shouldValidate: true });
  };

  // 폼 제출 처리 함수
  const handleSubmitForm = async (onSuccess: (data: EnrollReviewInput) => void) => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit((data) => onSuccess(data))();
    }
  };

  const compatibleErrors = {
    rating: errors.rating?.message,
    content: errors.content?.message,
    imageUrls: errors.imageUrls?.message,
  };

  const compatibleFormData = {
    rating,
    content,
    imageUrls,
  };

  return {
    formData: compatibleFormData,
    compatibleFormData,
    isValid,
    handleSubmitForm,
    updateRating,
    updateContent,
    compatibleErrors,
    setValue,
  };
};
