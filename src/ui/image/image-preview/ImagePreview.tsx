import Image from 'next/image';
import { IconButton } from '@/ui';
import { cn } from '@/utils/cn';
import { IconClose } from '@/assets';

type ImagePreviewProps = React.ComponentProps<'div'> & {
  imageSrc: string;
  imageAlt: string;
  handleRemove?: () => void;
  handleClickImage?: () => void;
  imageClassName?: string;
  showRemoveButton?: boolean;
  imageWidthRem?: string;
  imageHeightRem?: string;
};

export default function ImagePreview({
  imageSrc,
  imageAlt,
  handleRemove,
  handleClickImage,
  className,
  style,
  imageClassName,
  showRemoveButton = true,
  imageWidthRem = '14rem',
  imageHeightRem = '14rem',
  ...props
}: ImagePreviewProps) {
  const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleRemove?.();
  };
  const canRemove = Boolean(showRemoveButton && handleRemove);
  const imagePreviewStyle = { ...style, width: imageWidthRem, height: imageHeightRem };

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={imagePreviewStyle}
      {...props}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes={imageWidthRem}
        className={cn('object-cover', imageClassName)}
      />
      {handleClickImage ? (
        <button
          type='button'
          onClick={handleClickImage}
          aria-label={imageAlt}
          className='absolute inset-0 z-10 cursor-pointer'
        />
      ) : null}
      {canRemove ? (
        <IconButton
          onClick={handleRemoveClick}
          aria-label='이미지 삭제'
          className='bg-black-1 absolute top-[0.7rem] right-[0.7rem] z-20 flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full'
        >
          <IconClose className='text-black-10 h-[2.4rem] w-[2.4rem]' />
        </IconButton>
      ) : null}
    </div>
  );
}
