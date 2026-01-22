import { useCallback, useState, useEffect } from 'react';
import { useImageUpload } from '../api';

type Image = {
  file: File;
  preview: string;
};

export const useReviewImages = ({
  imageUrls,
  setImageUrls,
}: {
  imageUrls: string[];
  setImageUrls: (next: string[]) => void;
}) => {
  const { mutateAsync: requestPresignedUrl } = useImageUpload();
  const [images, setImages] = useState<Image[]>([]);

  // 이미지 추가 / 제거 (토글)
  const addImage = useCallback(
    (file: File) => {
      setImages((prev) => [
        ...prev,
        {
          file,
          preview: URL.createObjectURL(file),
        },
      ]);

      setImageUrls([...imageUrls, 'PENDING']);
    },
    [imageUrls, setImageUrls],
  );

  const removeImageByPreview = useCallback(
    (preview: string) => {
      setImages((prev) => {
        const next = prev.filter((img) => img.preview !== preview);
        setImageUrls(next.map(() => 'PENDING'));
        return next;
      });
    },
    [setImageUrls],
  );

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
    addImage,
    removeImageByPreview,
    uploadImages,
    useAutoScrollReviewImages,
  };
};
