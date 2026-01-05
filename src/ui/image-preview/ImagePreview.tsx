import Image from 'next/image';
import { IconButton } from '@/ui';
import { cn } from '@/utils/cn';
import { IconClose } from '@/assets';

type ImagePreviewProps = {
  imageSrc?: string;
  imageAlt?: string;
  handleRemove?: () => void;
  handleClickImage?: () => void;
  className?: string;
  imageClassName?: string;
  showRemoveButton?: boolean;
  imageWidthRem?: number;
  imageHeightRem?: number;
};

export default function ImagePreview({
  imageSrc,
  imageAlt,
  handleRemove,
  handleClickImage,
  className,
  imageClassName,
  showRemoveButton = true,
  imageWidthRem = 14,
  imageHeightRem = 14,
}: ImagePreviewProps) {
  const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleRemove?.();
  };
  const canRemove = Boolean(imageSrc && showRemoveButton && handleRemove);
  const imagePreviewStyle = {
    width: `${imageWidthRem}rem`,
    height: `${imageHeightRem}rem`,
  };

  return (
    <div
      className={cn('relative overflow-hidden', handleClickImage ? 'cursor-pointer' : null, className)}
      style={imagePreviewStyle}
      onClick={handleClickImage}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt ?? '이미지 미리보기'}
          fill
          sizes={`${imageWidthRem}rem`}
          className={cn('object-cover', imageClassName)}
        />
      ) : (
        <div className='bg-black-3 h-full w-full' />
      )}
      {canRemove ? (
        <IconButton
          onClick={handleRemoveClick}
          aria-label='이미지 삭제'
          className='bg-black-1 absolute top-[0.7rem] right-[0.7rem] flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full'
        >
          <IconClose className='text-black-10 h-[2.4rem] w-[2.4rem]' />
        </IconButton>
      ) : null}
    </div>
  );
}
