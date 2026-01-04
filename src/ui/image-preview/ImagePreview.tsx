import Image from 'next/image';
import { IconButton } from '@/ui';
import { cn } from '@/utils/cn';
import { IconClose } from '@/assets';

type ImagePreviewProps = {
  imageSrc?: string;
  imageAlt?: string;
  handleRemove?: () => void;
  className?: string;
  showRemoveButton?: boolean;
  imageWidthRem?: number;
  imageHeightRem?: number;
};

export default function ImagePreview({
  imageSrc,
  imageAlt,
  handleRemove,
  className,
  showRemoveButton = true,
  imageWidthRem = 14,
  imageHeightRem = 14,
}: ImagePreviewProps) {
  const imagePreviewStyle = {
    width: `${imageWidthRem}rem`,
    height: `${imageHeightRem}rem`,
  };

  return (
    <div className={cn('relative overflow-hidden', className)} style={imagePreviewStyle}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt ?? '이미지 미리보기'}
          fill
          sizes={`${imageWidthRem}rem`}
          className='object-cover'
        />
      ) : (
        <div className='bg-black-3 h-full w-full' />
      )}
      {imageSrc && showRemoveButton && handleRemove ? (
        <IconButton
          onClick={handleRemove}
          className='bg-black-1 absolute top-[0.7rem] right-[0.7rem] flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full'
        >
          <IconClose className='text-black-10 h-[2.4rem] w-[2.4rem]' />
        </IconButton>
      ) : null}
    </div>
  );
}
