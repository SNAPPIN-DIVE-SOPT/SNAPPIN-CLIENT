'use client';

import { useEffect, useState, startTransition } from 'react';
import { AnimatePresence } from 'framer-motion';
import MoodAnimationResult from './components/mood-animation-result-state/MoodAnimationResult';
import MoodAnimationPending from './components/mood-animation-pending-state/MoodAnimationPending';
import { useGetAiCurationResult } from './api';

export default function Page() {
  const { data } = useGetAiCurationResult();

  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsPending(false);
    }, 3000);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (data && isPending) {
      startTransition(() => {
        setIsPending(false);
      });
    }
  }, [data, isPending]);

  return (
    <div className='bg-neon-black h-dvh'>
      <AnimatePresence mode='wait'>
        {isPending ? <MoodAnimationPending /> : data ? <MoodAnimationResult data={data} /> : null}
      </AnimatePresence>
    </div>
  );
}
