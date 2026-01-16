'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IMAGE_ACCEPT } from '@/utils/imageAccept';

const REVIEW_CONTENT_MAX_LENGTH = 500;
const MAX_RATING = 5;
const MAX_IMAGE_COUNT = 5;
const ALLOWED_TYPES = IMAGE_ACCEPT.WITH_HEIC.split(',');

export const enrollReviewSchema = z.object({
  rating: z
    .number()
    .min(1, '별점을 선택해 주세요.')
    .max(MAX_RATING, '최대 5점까지 선택 가능합니다.'),

  content: z
    .string()
    .trim()
    .min(1, '리뷰를 입력해 주세요.')
    .max(REVIEW_CONTENT_MAX_LENGTH, `최대 ${REVIEW_CONTENT_MAX_LENGTH}자까지 입력할 수 있어요.`),

  imageUrls: z
    .array(z.string().url('이미지 URL이 올바르지 않습니다.'))
    .max(MAX_IMAGE_COUNT, `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 업로드할 수 있어요.`),
});

export type EnrollReviewInput = z.infer<typeof enrollReviewSchema>;

export const useReviewWrite = () => {
  const {
    handleSubmit,
    setValue,
    setError,
    trigger,
    reset,
    watch,
    formState: { isValid },
  } = useForm<EnrollReviewInput>({
    resolver: zodResolver(enrollReviewSchema),
    defaultValues: { rating: 0, content: '', imageUrls: [] },
    mode: 'onChange',
  });

  const formData = watch();

  const updateRating = (value: number) => {
    setValue('rating', value, { shouldValidate: true });
  };

  const updateContent = (value: string) => {
    if (value.length > REVIEW_CONTENT_MAX_LENGTH) {
      setError('content', {
        message: `최대 ${REVIEW_CONTENT_MAX_LENGTH}자까지 입력할 수 있어요.`,
      });
      return;
    }
    setValue('content', value, { shouldValidate: true });
  };

  const updateImageUrls = (urls: string[]) => {
    if (urls.length > MAX_IMAGE_COUNT) {
      setError('imageUrls', {
        message: `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 업로드할 수 있어요.`,
      });
      return;
    }
    setValue('imageUrls', urls, { shouldValidate: true });
  };

  const validateFiles = (files: FileList) => {
    const selected = Array.from(files);
    const hasInvalidType = selected.some((file) => !ALLOWED_TYPES.includes(file.type));
    const exceedsMax = selected.length > MAX_IMAGE_COUNT;
    if (hasInvalidType || exceedsMax) {
      setError('imageUrls', {
        message: hasInvalidType
          ? '지원하지 않는 파일 형식이 포함돼 있어요. (JPG/PNG/WEBP/HEIC)'
          : `이미지는 최대 ${MAX_IMAGE_COUNT}장까지 업로드할 수 있어요.`,
      });
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (onValid: (data: EnrollReviewInput) => void) => {
    const ok = await trigger();
    if (!ok) return;
    handleSubmit((data) => onValid(data))();
  };

  return {
    formData,
    isValid,
    handleSubmitForm,
    updateRating,
    updateContent,
    updateImageUrls,
    validateFiles,
    reset,
  };
};
