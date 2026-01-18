'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IMAGE_ACCEPT, MAX_IMAGE_SIZE } from '@/constants/image-type/imageAccept';

export const REVIEW_CONTENT_MAX_LENGTH = 500;
export const MAX_RATING = 5;
const MAX_IMAGE_COUNT = 5;
const ALLOWED_TYPES = new Set(IMAGE_ACCEPT.WITH_HEIC.split(','));

type ContentValidationResult = {
  ok: boolean;
  reason?: 'min' | 'max';
};

export const enrollReviewSchema = z.object({
  rating: z.number().min(1, '별점을 선택해 주세요.').max(MAX_RATING),

  content: z
    .string()
    .trim()
    .min(1)
    .max(REVIEW_CONTENT_MAX_LENGTH, `최대 ${REVIEW_CONTENT_MAX_LENGTH}자까지 입력할 수 있어요.`),

  imageUrls: z.array(z.string().url('이미지 URL이 올바르지 않습니다.')).max(MAX_IMAGE_COUNT),
});

export type EnrollReviewInput = z.infer<typeof enrollReviewSchema>;

export const useReviewWrite = () => {
  const {
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<EnrollReviewInput>({
    resolver: zodResolver(enrollReviewSchema),
    defaultValues: { rating: 0, content: '', imageUrls: [] },
    mode: 'onChange',
  });

  const formData = watch();

  const updateRating = (value: number) => {
    setValue('rating', value, { shouldValidate: true });
  };

  const updateContent = (value: string): ContentValidationResult => {
    const isUnderMin = value.trim().length < 1;
    const isOverMax = value.length > REVIEW_CONTENT_MAX_LENGTH;

    setValue('content', value, { shouldValidate: true });

    if (isUnderMin) {
      setError('content', { message: '최소 1자 이상 입력해 주세요.' });
      return { ok: false, reason: 'min' };
    }

    if (isOverMax) {
      setError('content', {
        message: `최대 ${REVIEW_CONTENT_MAX_LENGTH}자까지 입력할 수 있어요.`,
      });
      return { ok: false, reason: 'max' };
    }

    clearErrors('content');
    return { ok: true };
  };

  const updateImageUrls = (urls: string[]) => {
    setValue('imageUrls', urls, { shouldValidate: true });
  };

  const handleSubmitForm = async (onValid: (data: EnrollReviewInput) => void) => {
    const ok = await trigger();
    if (!ok) return;
    handleSubmit((data) => onValid(data))();
  };

  const validateFiles = (files: FileList) => {
    const selected = Array.from(files);

    const hasInvalidType = selected.some((file) => !ALLOWED_TYPES.has(file.type));
    const exceedsSize = selected.some((file) => file.size > MAX_IMAGE_SIZE);
    const exceedsCount = selected.length > MAX_IMAGE_COUNT;

    if (hasInvalidType) {
      setError('imageUrls', { message: 'JPG/PNG/WEBP/HEIC만 업로드 가능해요.' });
      return { ok: false };
    }
    if (exceedsSize) {
      setError('imageUrls', { message: '이미지 하나당 최대 20MB까지 업로드 가능해요.' });
      return { ok: false };
    }
    if (exceedsCount) {
      setError('imageUrls', { message: `최대 ${MAX_IMAGE_COUNT}장까지 업로드 가능해요.` });
      return { ok: false };
    }

    clearErrors('imageUrls');

    return { ok: true };
  };

  const compatibleErrors = {
    rating: errors.rating?.message,
    content: errors.content?.message,
    imageUrls: errors.imageUrls?.message,
  };

  const compatibleFormData = {
    rating: formData.rating,
    content: formData.content,
    imageUrls: formData.imageUrls,
  };

  return {
    formData,
    compatibleFormData,
    isValid,
    handleSubmitForm,
    updateRating,
    updateContent,
    updateImageUrls,
    validateFiles,
    compatibleErrors,
  };
};
