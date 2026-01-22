import { useCallback, useState, useEffect } from 'react';
import { useImageUpload } from '../api';
import validateImage from '@/utils/validateImage';

type ReviewImage = {
  id: string;
  file: File;
  preview: string;
};

const MAX_IMAGE_COUNT = 5;

export const useReviewImages = () => {
  const { mutateAsync: requestPresignedUrl } = useImageUpload();
  const [images, setImages] = useState<ReviewImage[]>([]);
  const [hasError, setHasError] = useState(false);

  /** 파일 추가 */
  const addUploadImage = useCallback(
    (files: FileList) => {
      const nextImages = [...images];
      let error = false;

      Array.from(files).forEach((file) => {
        if (nextImages.length >= MAX_IMAGE_COUNT) {
          error = true;
          return;
        }

        const { ok } = validateImage({
          file,
          currentCount: nextImages.length,
          maxImageCount: MAX_IMAGE_COUNT,
        });

        if (!ok) {
          error = true;
          return;
        }

        nextImages.push({
          id: crypto.randomUUID(),
          file,
          preview: URL.createObjectURL(file),
        });
      });

      setImages(nextImages);
      setHasError(error);
    },
    [images],
  );

  /** 이미지 제거 */
  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const useAutoScrollReviewImages = (imageCount: number) => {
    useEffect(() => {
      if (imageCount < 1) return;

      const element = document.getElementById('review-image-list');
      if (!element) return;

      requestAnimationFrame(() => {
        element.scrollTo({ left: element.scrollWidth, behavior: 'smooth' });
        const { top } = element.getBoundingClientRect();
        const targetTop = top + window.scrollY - 50;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      });
    }, [imageCount]);
  };

  /** S3 업로드 */
  const uploadImageUrl = useCallback(async (): Promise<string[]> => {
    return Promise.all(
      images.map(async ({ file }) => {
        const safeFileName = encodeURIComponent(file.name);

        const { uploadUrl, s3Key } = await requestPresignedUrl({
          fileName: safeFileName,
          contentType: file.type,
        });

        if (!uploadUrl || !s3Key) {
          throw new Error('Invalid presigned url response');
        }

        await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file,
        });

        return s3Key;
      }),
    );
  }, [images, requestPresignedUrl]);

  return {
    images,
    hasError,
    addUploadImage,
    removeImage,
    uploadImageUrl,
    useAutoScrollReviewImages,
  };
};
