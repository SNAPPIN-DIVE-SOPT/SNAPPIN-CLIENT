'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PHOTOGRAPHERS_ROUTES, ROUTES } from '@/constants/routes/routes';

type ExitTarget = 'back' | 'home' | null;

type UsePaymentPageActionsProps = {
  id: number;
  onSubmitPayment: () => void;
  onResetExtraPrices: () => void;
};

export const usePaymentPageActions = ({
  id,
  onSubmitPayment,
  onResetExtraPrices,
}: UsePaymentPageActionsProps) => {
  const router = useRouter();
  const [completeOpen, setCompleteOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [exitTarget, setExitTarget] = useState<ExitTarget>(null);

  const handleBackClick = () => {
    setExitTarget('back');
    setCancelOpen(true);
  };

  const handleHomeClick = () => {
    setExitTarget('home');
    setCancelOpen(true);
  };

  const handleExitConfirm = () => {
    onResetExtraPrices();
    setCancelOpen(false);

    if (exitTarget === 'back') router.back();
    if (exitTarget === 'home') router.push(ROUTES.HOME);

    setExitTarget(null);
  };

  const handleOpenPaymentModal = () => {
    setCompleteOpen(true);
  };

  const handlePaymentConfirm = () => {
    setCompleteOpen(false);
    onSubmitPayment();
  };

  const handleAddPayment = () => {
    router.push(PHOTOGRAPHERS_ROUTES.PAYMENT_ADD_PAYMENT(id));
  };

  return {
    completeOpen,
    cancelOpen,
    setCompleteOpen,
    setCancelOpen,
    handleBackClick,
    handleHomeClick,
    handleExitConfirm,
    handleOpenPaymentModal,
    handlePaymentConfirm,
    handleAddPayment,
  };
};
