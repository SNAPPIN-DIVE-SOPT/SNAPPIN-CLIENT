import ReviewStar from '@/ui/review-star/ReviewStar';

type ReviewStarSectionProps = {
  rating: number;
  handleChangeRating: (rating: number) => void;
  errorMessage?: string;
  maxRating: number;
};

export default function ReviewStarSection({
  rating,
  handleChangeRating,
  maxRating,
}: ReviewStarSectionProps) {
  const handleClickStar = (index: number) => {
    handleChangeRating(index + 1);
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value);
    handleChangeRating(Math.max(0, Math.min(maxRating, next)));
  };

  return (
    <section className='bg-black-1 flex flex-col gap-[0.8rem] p-[2.4rem_2rem_2.8rem_2rem]'>
      <span className='caption-14-md text-black-10'>이번 촬영은 어떠셨나요?</span>
      <div className='relative inline-flex w-fit' role='group' aria-label='별점 선택'>
        <ReviewStar
          starSize='large'
          rating={rating}
          starFillColor='text-black-10'
          className='pointer-events-none'
        />
        <div className='absolute inset-0 flex items-center gap-[0.5rem]'>
          {Array.from({ length: maxRating }).map((_, idx) => (
            <button
              key={idx}
              type='button'
              className='h-full w-[2.4rem] cursor-pointer'
              onClick={() => handleClickStar(idx)}
              aria-label={`${idx + 1}점`}
            />
          ))}
        </div>
        <input
          type='range'
          min={0}
          max={maxRating}
          step={1}
          value={rating}
          onChange={handleRangeChange}
          className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
        />
      </div>
    </section>
  );
}
