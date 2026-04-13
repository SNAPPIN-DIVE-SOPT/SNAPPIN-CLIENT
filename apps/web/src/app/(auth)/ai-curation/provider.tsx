'use client';

import {
  AiCurationProvider,
  type AiCurationProviderProps,
} from '@/app/(auth)/ai-curation/hooks/useAiCuration';

export default function AiCurationProviderBridge({ children }: AiCurationProviderProps) {
  return <AiCurationProvider>{children}</AiCurationProvider>;
}
