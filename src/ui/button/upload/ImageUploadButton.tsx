'use client';

import { Button } from '@/ui';
import { IconAddPhotoAlternate } from '@/assets';
import { useRef } from 'react';
import { IMAGE_ACCEPT } from '@/ui/button/upload/constants/image';

type ImageUploadButtonProps = {
  handleUploadAction: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
};

export default function ImageUploadButton({
  handleUploadAction,
  accept = IMAGE_ACCEPT.BASIC,
  multiple = true,
}: ImageUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    handleUploadAction(files);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type='file'
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
        hidden
      />
      <Button
        type='button'
        display='inline'
        color='muted'
        size='upload'
        className='gap-[0.4rem]'
        onClick={handleClick}
      >
        <IconAddPhotoAlternate />
        이미지 업로드
      </Button>
    </>
  );
}
