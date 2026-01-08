import { IconStar, IconStarHalf } from '@/assets';
import { cn } from '@/utils/cn';

type ReviewStarProps = {
  //4.5
  rating: number;
  max?: number;
  starSize?: 'small' | 'medium' | 'large';
  starFillColor?: string;
  className?: string;
};

const STAR_SIZE: Record<NonNullable<ReviewStarProps['starSize']>, string> = {
  small: 'h-[1.4rem] w-[1.4rem]',
  medium: 'h-[2.1rem] w-[2.1rem]',
  large: 'h-[2.4rem] w-[2.4rem]',
};

export default function ReviewStar({
  rating,
  max = 5,
  starSize = 'small',
  starFillColor = 'text-black-9',
  className,
}: ReviewStarProps) {
  const starSizeClass = STAR_SIZE[starSize];

  const safeRating = Math.max(0, Math.min(max, rating));

  const full = Math.floor(safeRating);
  const hasHalf = safeRating - full >= 0.5;

  return (
    <div
      className={cn('flex items-center gap-[0.5rem]', className)}
      aria-label={`${safeRating} out of ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => {
        if (i < full) {
          return <IconStar key={i} className={cn(starFillColor, starSizeClass)} />;
        }

        if (i === full && hasHalf) {
          return <IconStarHalf key={i} className={cn(starFillColor, starSizeClass)} />;
        }

        return <IconStar key={i} className={cn('text-black-5', starSizeClass)} />;
      })}
    </div>
  );
}
