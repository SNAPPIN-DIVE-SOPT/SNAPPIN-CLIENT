'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useOnBoardingForm } from '@/app/(auth)/on-boarding/[step]/hooks/useOnBoardingForm';

type OnBoardingFormContextValue = ReturnType<typeof useOnBoardingForm>;

const OnBoardingFormContext = createContext<OnBoardingFormContextValue | null>(null);

export function OnBoardingFormProvider({ children }: { children: ReactNode }) {
  const value = useOnBoardingForm();

  return <OnBoardingFormContext.Provider value={value}>{children}</OnBoardingFormContext.Provider>;
}

export function useOnBoardingFormContext() {
  const context = useContext(OnBoardingFormContext);

  if (!context) {
    throw new Error('useOnBoardingFormContext는 OnBoardingFormProvider 안에서 사용되어야 합니다.');
  }

  return context;
}
