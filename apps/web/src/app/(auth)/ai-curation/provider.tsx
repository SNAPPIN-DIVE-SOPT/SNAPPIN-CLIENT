'use client';

import { AiCurationProvider } from '@/app/(auth)/ai-curation/hooks/useAiCuration';

export default function AiCurationProviders({ children }: { children: React.ReactNode }) {
  return <AiCurationProvider>{children}</AiCurationProvider>;
}
