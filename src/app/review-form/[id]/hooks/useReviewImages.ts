import { useCallback, useState, useEffect, useRef } from 'react';
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
        const willExceed = nextImages.length >= MAX_IMAGE_COUNT;

        const { ok } = validateImage({
          file,
          currentCount: nextImages.length,
          maxImageCount: MAX_IMAGE_COUNT,
        });

        // 타입/용량 등 다른 문제면 건너뛰고 에러 ON
        if (!ok && !willExceed) {
          error = true;
          return;
        }

        nextImages.push({
          id: crypto.randomUUID(),
          file,
          preview: URL.createObjectURL(file),
        });

        // 개수 초과이면 에러 ON
        if (willExceed || !ok) {
          error = true;
        }
      });

      setImages(nextImages);
      setHasError(error || nextImages.length > MAX_IMAGE_COUNT);
    },
    [images],
  );

  /** 이미지 제거 */
  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const nextImages = prev.filter((img) => img.id !== id);

      if (nextImages.length <= MAX_IMAGE_COUNT) {
        setHasError(false);
      }

      return nextImages;
    });
  }, []);

  const useAutoScrollReviewImages = (imageCount: number) => {
    const previousCountRef = useRef(imageCount);

    useEffect(() => {
      const previousCount = previousCountRef.current;
      previousCountRef.current = imageCount;

      if (imageCount < 1) return;
      if (imageCount <= previousCount) return;

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
