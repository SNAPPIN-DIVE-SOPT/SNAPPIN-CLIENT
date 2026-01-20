'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconArrowBack, IconHome } from '@/assets';
import { IconButton, Navigation } from '@/ui';
import CancelModal from '../../@modal/(.)cancel-modal/CancelModal';

export default function ClientHeader() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'home' | 'back' | null>(null);

  const handleOpenModal = (action: 'home' | 'back') => {
    setPendingAction(action);
    setOpen(true);
  };

  const handleConfirm = () => {
    if (pendingAction === 'home') {
      router.push('/');
    }
    if (pendingAction === 'back') {
      router.back();
    }
    setOpen(false);
    setPendingAction(null);
  };

  return (
    <>
      <Navigation
        left={
          <IconButton onClick={() => handleOpenModal('back')}>
            <IconArrowBack />
          </IconButton>
        }
        center={<span className='caption-14-bd text-black-10'>리뷰 작성</span>}
        right={
          <IconButton onClick={() => handleOpenModal('home')}>
            <IconHome />
          </IconButton>
        }
        className='border-black-5 items-center border-b'
        isFixed
      />
      <CancelModal open={open} handleOpenChange={setOpen} handleClickConfirm={handleConfirm} />
    </>
  );
}
