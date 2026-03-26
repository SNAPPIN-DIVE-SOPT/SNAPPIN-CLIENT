'use client';

import { motion } from 'framer-motion';
import { IconChips } from '@/src/assets';

type EscalatorChipsProps = {
  duration?: number;
  tiltDeg?: number;
};

export default function MoodAnimation({
  duration = 25,
  tiltDeg = -8,
}: EscalatorChipsProps) {
  return (
    <div className="relative w-full mt-[3rem]">
      {/* 위 띠: 왼 → 오 */}
      <div
        className="relative"
        style={{ transform: `rotate(${tiltDeg}deg)` }}
      >
        <motion.div
          className="flex w-max items-center gap-[0.63rem] will-change-transform"
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <IconChips />
          <IconChips />
        </motion.div>
      </div>

      {/* 아래 띠: 오 → 왼 */}
      <div
        className="relative pt-[1rem]"
        style={{ transform: `rotate(${tiltDeg}deg)` }}
      >
        <motion.div
          className="flex w-max items-center gap-[0.63rem] will-change-transform"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <IconChips />
          <IconChips />
        </motion.div>
      </div>
    </div>
  );
}