'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

type AiCurationState = {
  selectedImageIds: number[];
};

type AiCurationActions = {
  toggleImageId: (id: number) => void;
  clearSelectedImageIds: () => void;
  setSelectedImageIds: (ids: number[]) => void;
};

type AiCurationContextValue = AiCurationState & AiCurationActions;

const AiCurationContext = createContext<AiCurationContextValue | null>(null);

export function AiCurationProvider({ children }: { children: React.ReactNode }) {
  const [selectedImageIds, setSelectedImageIds] = useState<number[]>([]);

  const toggleImageId = (id: number) => {
    setSelectedImageIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const clearSelectedImageIds = () => setSelectedImageIds([]);

  const value = useMemo(
    () => ({
      selectedImageIds,
      toggleImageId,
      clearSelectedImageIds,
      setSelectedImageIds,
    }),
    [selectedImageIds],
  );

  return <AiCurationContext.Provider value={value}>{children}</AiCurationContext.Provider>;
}

export function useAiCuration() {
  const ctx = useContext(AiCurationContext);
  if (!ctx) throw new Error('useAiCuration는 AiCurationProvider 내에서 사용해야 합니다.');
  return ctx;
}
