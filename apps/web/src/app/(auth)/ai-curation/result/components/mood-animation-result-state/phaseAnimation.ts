import { Variants } from 'framer-motion';

export type Phase = 'intro' | 'chips' | 'switching' | 'done';

export const INTRO_TEXT: Variants = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
};

export const COMPLETE_TEXT: Variants = {
  initial: { opacity: 0, y: -14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeInOut' },
  },
};

export const CTA: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut', delay: 0.05 },
  },
};

export const CHIPS_CONTAINER = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.8,
      delayChildren: 0.1,
    },
  },
} as const;

export const CHIP_VARIANTS: Variants = {
  hidden: (custom: { rotate: number }) => ({
    opacity: 0,
    scale: 0.9,
    rotate: custom.rotate,
  }),
  show: {
    opacity: 1,
    scale: [0.9, 1.2, 1],
    transition: { type: 'tween', duration: 0.3, ease: 'easeInOut' },
  },
};

export const CHIP_POSES = [{ rotate: -9 }, { rotate: 6 }, { rotate: 0 }] as const;
