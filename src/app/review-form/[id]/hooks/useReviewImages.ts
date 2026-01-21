import { useCallback, useState, useEffect } from 'react';
import { useImageUpload } from '../api';

type Image = {
  file: File;
  preview: string;
};

export const useReviewImages = () => {
  const { mutateAsync: requestPresignedUrl } = useImageUpload();
  const [images, setImages] = useState<Image[]>([]);

  // 이미지 추가 / 제거 (토글)
  const updateImage = useCallback((file: File) => {
    setImages((prev) => {
      const exists = prev.find(
        (img) => img.file.name === file.name && img.file.lastModified === file.lastModified,
      );

      // 이미 있으면 제거
      if (exists) {
        URL.revokeObjectURL(exists.preview);
        return prev.filter((img) => img !== exists);
      }

      // 없으면 추가
      return [
        ...prev,
        {
          file,
          preview: URL.createObjectURL(file),
        },
      ];
    });
  }, []);

  // ImagePreview X 버튼 누르는거
  const removeImageByPreview = useCallback((preview: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.preview === preview);

      if (target) {
        URL.revokeObjectURL(target.preview);
      }

      return prev.filter((img) => img.preview !== preview);
    });
  }, []);

  // S3 업로드
  const uploadImages = async (): Promise<string[]> => {
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
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        });

        return s3Key;
      }),
    );
  };

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

  return {
    images,
    updateImage,
    removeImageByPreview,
    uploadImages,
    useAutoScrollReviewImages,
  };
};
