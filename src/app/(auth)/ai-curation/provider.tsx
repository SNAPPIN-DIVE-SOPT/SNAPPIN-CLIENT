'use client';

import { AiCurationProvider } from './hooks/useAiCuration';

export default function AiCurationProviders({ children }: { children: React.ReactNode }) {
  return <AiCurationProvider>{children}</AiCurationProvider>;
}
