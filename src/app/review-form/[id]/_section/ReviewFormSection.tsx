import { TextareaField } from '@/ui';
import ReviewStar from '@/ui/review-star/ReviewStar';

type ReviewForm = {
  rating: number;
};

const MAX_RATING = 5;
const MAX_REVIEW_IMAGES_COUNT = 5;

export default function ReviewForm({ rating }: ReviewForm) {
  return (
    <section className='bg-black-1 px-[2.4rem] pt-[1.7rem] pb-[2rem]'>
      <div className='mb-[2.8rem] flex flex-col gap-[0.8rem]'>
        <span className='caption-14-md text-black-10'>이번 촬영은 어떠셨나요?</span>
        <ReviewStar starSize='large' rating={rating} />
      </div>

      <div>
        <span className='caption-14-md text-black-10'>자세한 스냅 촬영 리뷰를 작성해주세요</span>
      </div>
    </section>
  );
}
