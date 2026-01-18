'use client';

import { useMemo } from 'react';
import { useExtraPrices } from './useExtraPrices';
import { useRouter } from 'next/navigation';

// 결제 요약 관리
export const usePaymentSummary = (id: number, basePrice: number) => {
  const router = useRouter();
  const { extraPrices } = useExtraPrices();

  const totalAmount = useMemo(
    () => extraPrices.reduce((acc, cur) => acc + cur.amount, basePrice),
    [extraPrices, basePrice],
  );

  const submitPayment = () => {
    console.info('id', id);
    console.info('basePrice', basePrice);
    console.info('extraPrices', extraPrices);
    console.info('totalAmount', totalAmount);
    // TODO: API
    //쿼리키 무효화

    router.push(`/photographer/reservation-detail/${id}`);
  };

  return { extraPrices, totalAmount, submitPayment };
};
