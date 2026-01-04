import Image from 'next/image';
import { IconButton } from '@/ui';
import { cn } from '@/utils/cn';
import { IconClose } from '@/assets';

type ImagePreviewProps = {
  imageSrc?: string;
  imageAlt?: string;
  handleRemove: () => void;
  className?: string;
  showRemoveButton?: boolean;
};

export default function ImagePreview({
  imageSrc,
  imageAlt,
  handleRemove,
  className,
  showRemoveButton = true,
}: ImagePreviewProps) {
  const shouldShowRemoveButton = Boolean(imageSrc && showRemoveButton);

  return (
    <div className={cn('relative h-[14rem] w-[14rem] overflow-hidden', className)}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt ?? '이미지 미리보기'}
          fill
          sizes='14rem'
          className='object-cover'
        />
      ) : (
        <div className='bg-black-3 h-full w-full' />
      )}
      {shouldShowRemoveButton ? (
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
