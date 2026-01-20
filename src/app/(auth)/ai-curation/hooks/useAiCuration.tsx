'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { AiCurationStep } from '../[step]/constants/steps';
import { TOTAL_STEP_COUNT } from '../[step]/constants/steps';

type AiCurationState = {
  selectedByStep: Record<AiCurationStep, number | null>;
  currentStep: AiCurationStep;
};

type AiCurationActions = {
  setCurrentStep: (step: AiCurationStep) => void;
  selectImageId: (id: number) => void;
  toggleImageId: (id: number) => void;
};

type AiCurationContextValue = AiCurationState & AiCurationActions;

type AiCurationProviderProps = {
  children: React.ReactNode;
};

const AiCurationContext = createContext<AiCurationContextValue | null>(null);

const EMPTY_SELECTED_BY_STEP: Record<AiCurationStep, number | null> = Object.fromEntries(
  Array.from({ length: TOTAL_STEP_COUNT }, (_, i) => [i + 1, null]),
) as Record<AiCurationStep, number | null>;

export function AiCurationProvider({ children }: AiCurationProviderProps) {
  const [currentStep, setCurrentStep] = useState<AiCurationStep>(1);
  const [selectedByStep, setSelectedByStep] =
    useState<Record<AiCurationStep, number | null>>(EMPTY_SELECTED_BY_STEP);

  const selectImageId = useCallback(
    (id: number) => {
      setSelectedByStep((prev) => ({
        ...prev,
        [currentStep]: id,
      }));
    },
    [currentStep],
  );

  const toggleImageId = useCallback(
    (id: number) => {
      setSelectedByStep((prev) => ({
        ...prev,
        [currentStep]: prev[currentStep] === id ? null : id,
      }));
    },
    [currentStep],
  );

  const value = useMemo(
    () => ({
      currentStep,
      selectedByStep,
      setCurrentStep,
      selectImageId,
      toggleImageId,
    }),
    [currentStep, selectedByStep, selectImageId, toggleImageId],
  );

  return <AiCurationContext.Provider value={value}>{children}</AiCurationContext.Provider>;
}

export function useAiCuration() {
  const ctx = useContext(AiCurationContext);
  if (!ctx) throw new Error('useAiCuration는 AiCurationProvider 내에서 사용해야 합니다.');
  return ctx;
}
