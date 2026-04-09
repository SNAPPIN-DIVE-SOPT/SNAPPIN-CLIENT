'use client';

import { motion } from 'framer-motion';
import { IconChips } from '@snappin/design-system/assets';

type MovingChipsProps = {
  duration?: number;
  tiltDeg?: number;
};

export default function MovingChips({
  duration = 25,
  tiltDeg = -8,
}: MovingChipsProps) {
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