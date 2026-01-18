'use client';

import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { ExtraPricesAtom, type ExtraPrice } from './paymentExtraPrice.atom';

// 추가 비용 리스트(atom) 관리 훅
export const useExtraPrices = () => {
  const [extraPrices, setExtraPrices] = useAtom(ExtraPricesAtom);

  const addExtraPrice = useCallback(
    (item: ExtraPrice) => {
      setExtraPrices((prev) => [...prev, item]);
    },
    [setExtraPrices],
  );

  return { extraPrices, addExtraPrice };
};
