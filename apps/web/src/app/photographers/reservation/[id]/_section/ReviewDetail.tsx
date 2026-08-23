import BaseReviewDetail from '@/components/layout/reservation/ReviewDetail';

type ReviewDetailProps = {
  id: number;
  reviewer: string;
  rating: number;
  createdAt: string;
  images: string[];
  content: string;
};

export default function ReviewDetail(props: ReviewDetailProps) {
  return (
    <BaseReviewDetail {...props} layoutClassName='pr-[2rem]' contentClassName='caption-14-md pr-[2rem]' />
  );
}
