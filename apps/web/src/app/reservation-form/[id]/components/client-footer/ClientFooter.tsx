'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BottomCTAButton } from '@snappin/design-system';
import { ROUTES } from '@/constants/routes/routes';
import CopyModal from '../../@modal/(.)copy-modal/CopyModal';

type ClientFooterProps = {
  photographerId: number;
  disabled?: boolean;
  handleClick?: () => Promise<boolean>;
};

export default function ClientFooter({
  photographerId,
  disabled = false,
  handleClick,
}: ClientFooterProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleCopyButtonClick = async () => {
    const isCopied = handleClick ? await handleClick() : false;
    if (isCopied) {
      setOpen(true);
    }
  };

  const handleMovePhotographer = () => {
    setOpen(false);
    router.push(ROUTES.PHOTOGRAPHER(photographerId));
  };

  return (
    <>
      <div className='h-[8.4rem]'>
        <BottomCTAButton background='white' hasPadding fixed>
          <BottomCTAButton.Single
            color='black'
            size='large'
            disabled={disabled}
            onClick={handleCopyButtonClick}
          >
            신청 양식 복사하기
          </BottomCTAButton.Single>
        </BottomCTAButton>
      </div>
      <CopyModal
        open={open}
        handleOpenChange={setOpen}
        handleClickConfirm={handleMovePhotographer}
      />
    </>
  );
}
