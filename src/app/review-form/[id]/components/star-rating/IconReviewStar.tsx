import type { SVGProps } from 'react';
import { cn } from '@/utils/cn';
import { STAR_LEVEL, type StarLevel } from '../../constants/starLevel';

export type StarProps = SVGProps<SVGSVGElement> & {
  level?: StarLevel;
};

const IconReviewStar = ({ level = STAR_LEVEL.EMPTY, className, ...props }: StarProps) => {
  return (
    <svg
      viewBox='0 0 24 24'
      width={24}
      height={24}
      className={cn('transition-colors duration-200', className)}
      {...props}
    >
      {/* 기본 별 */}
      <path
        d='m12 0 4.153 6.966L24 8.8l-5.28 6.14.696 8.1L12 19.869 4.584 23.04l.696-8.1L0 8.8l7.847-1.834z'
        className='fill-black-5'
      />

      {/* 활성화 별 */}
      {level === STAR_LEVEL.FULL && (
        <path
          d='m12 0 4.153 6.966L24 8.8l-5.28 6.14.696 8.1L12 19.869 4.584 23.04l.696-8.1L0 8.8l7.847-1.834z'
          className='fill-black-10'
        />
      )}
    </svg>
  );
};

export default IconReviewStar;
