'use client';

import { useEffect, useMemo, useState } from 'react';
import { useExtraPrices } from './useExtraPrices';
import { useRouter } from 'next/navigation';
import { useRequestPayment } from '../api';

// 결제 요약 관리
export const usePaymentSummary = (reservationId: number, basePrice: number) => {
  const [currentBasePrice, setCurrentBasePrice] = useState(basePrice);

  const router = useRouter();
  const { extraPrices, resetExtraPrices } = useExtraPrices();

  const totalAmount = useMemo(
    () => extraPrices.reduce((acc, cur) => acc + cur.amount, currentBasePrice),
    [extraPrices, currentBasePrice],
  );
  
  useEffect(() => {
    setCurrentBasePrice(basePrice);
  }, [basePrice]);

  const requestPaymentMutation = useRequestPayment(reservationId);
  
  const handleSubmitPayment = () => {
    requestPaymentMutation.mutate({
        basePrice: currentBasePrice,
        extraPrices: extraPrices.map((extraPrice) => ({
          name: extraPrice.name,
          amount: extraPrice.amount,
        })),
        totalPrice: totalAmount,
    });
    
    resetExtraPrices();
    router.replace(`/photographer/reservation-detail/${reservationId}`);
  };

  return { extraPrices, totalAmount, handleSubmitPayment, resetExtraPrices };
};
