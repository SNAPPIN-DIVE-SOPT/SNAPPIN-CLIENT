'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CancelModal from '@/app/product/[id]/reservation-form/@modal/(.)cancel-modal/CancelModal';
import CopyModal from '@/app/product/[id]/reservation-form/@modal/(.)copy-modal/CopyModal';
import { ReservationFormWrapper } from '@/app/product/[id]/reservation-form/_form';
import { ClientHeader } from '@/app/product/[id]/reservation-form/components';
import { ROUTES } from '@/constants/routes/routes';

type PageClientProps = {
  productId: number;
  photographerId: number;
};

export default function PageClient({ productId, photographerId }: PageClientProps) {
  const router = useRouter();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

  const handleBackClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleExit = () => {
    router.back();
    setIsCancelModalOpen(false);
  };

  const handleCopySuccess = () => {
    setIsCopyModalOpen(true);
  };

  const handleMovePhotographer = () => {
    setIsCopyModalOpen(false);
    router.push(ROUTES.PHOTOGRAPHER(photographerId));
  };

  return (
    <>
      <ClientHeader handleClickBack={handleBackClick} />
      <ReservationFormWrapper productId={productId} handleCopySuccess={handleCopySuccess} />

      <CancelModal
        open={isCancelModalOpen}
        handleOpenChange={setIsCancelModalOpen}
        handleClickExit={handleExit}
      />
      <CopyModal
        open={isCopyModalOpen}
        handleOpenChange={setIsCopyModalOpen}
        handleClickConfirm={handleMovePhotographer}
      />
    </>
  );
}
