'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAiCuration } from '../hooks/useAiCuration';
import MoodAnimationResult from './components/mood-animation-result-state/MoodAnimationResult';
import MoodAnimationPending from './components/mood-animation-pending-state/MoodAnimationPending';
import { MOOD_RESULT_MOCK } from './mock/result.mock';

export default function Page() {
  const { selectedByStep } = useAiCuration();
  console.info(selectedByStep);

  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<typeof MOOD_RESULT_MOCK | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(MOOD_RESULT_MOCK);
      setIsPending(false);
    }, 3000);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className='bg-neon-black h-dvh'>
      <AnimatePresence mode='wait'>
        {isPending ? <MoodAnimationPending /> : data ? <MoodAnimationResult data={data} /> : null}
      </AnimatePresence>
    </div>
  );
}
