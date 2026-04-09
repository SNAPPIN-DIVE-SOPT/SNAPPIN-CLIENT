import { cn } from '../../lib/cn';
import { IconStar } from '../../assets';

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

function getStarFillPercent(rating: number, index: number) {
  const filledAmount = Math.max(0, Math.min(1, rating - index));
  const adjustedFilledAmount = adjustStarFillAmount(filledAmount);

  return adjustedFilledAmount * 100;
}

function adjustStarFillAmount(fillAmount: number) {
  if (fillAmount <= 0 || fillAmount >= 1) {
    return fillAmount;
  }

  const roundedFillAmount = Math.round(fillAmount * 10) / 10;
  const fillAmountMap: Record<number, number> = {
    0.1: 0.22,
    0.2: 0.32,
    0.3: 0.4,
    0.4: 0.45,
    0.5: 0.5,
    0.6: 0.55,
    0.7: 0.60,
    0.8: 0.68,
    0.9: 0.78,
  };

  return fillAmountMap[roundedFillAmount] ?? fillAmount;
}

export default function ReviewStar({
  rating,
  max = 5,
  starSize = 'small',
  starFillColor = 'text-black-9',
  className,
}: ReviewStarProps) {
  const starSizeClass = STAR_SIZE[starSize];

  const safeRating = Math.max(0, Math.min(max, rating));

  return (
    <div
      className={cn('flex items-center gap-[0.5rem]', className)}
      aria-label={`${safeRating} out of ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => {
        const fillPercent = getStarFillPercent(safeRating, i);

        return (
          <span
            key={`review-star-${i}`}
            className={cn('relative inline-flex shrink-0', starSizeClass)}
          >
            <IconStar aria-hidden className="h-full w-full text-black-5" />
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${fillPercent}%` }}
            >
              <IconStar className={cn(starFillColor, starSizeClass)} />
            </span>
          </span>
        );
      })}
    </div>
  );
}
