import Link from 'next/link';
import Image from 'next/image';
import { formatShortDate } from '@/utils/formatNumberWithComma';
import { ReviewStar } from '@/ui/review-star';

type ReviewDetailProps = {
  id: number;
  reviewId: number;
  reviewer: string;
  rating: number;
  createdAt: string;
  images: string[];
  content: string;
};

export default function ReviewDetail({
  id,
  reviewId,
  reviewer,
  rating,
  createdAt,
  images,
  content,
}: ReviewDetailProps) {
  return (
    <div className='bg-black-1 flex flex-col gap-[2rem] px-[2rem] pt-[1.7rem] pb-[2rem]'>
      <p className='caption-14-bd'>리뷰 상세</p>
      <div className='flex flex-col gap-[1.2rem]'>
        <div className='flex flex-col items-start gap-[0.6rem]'>
          <div className='flex w-full items-center justify-between'>
            <ReviewStar starSize='small' starFillColor='text-black-9' rating={rating} />
            <span className='caption-12-md text-black-7'>{formatShortDate(createdAt)}</span>
          </div>
          <span className='caption-12-md text-black-7'>{reviewer}</span>
        </div>

        <div className='scrollbar-hide flex gap-[0.4rem] overflow-scroll'>
          {images.map((image) => (
            <Link key={image} href={`/photo-final-detail/${id}/photos/${reviewId}`} className='shrink-0 w-[14rem] h-[14rem]'>
              <Image src={image} alt={reviewer} width={140} height={140} className='object-cover' />
            </Link>
          ))}
        </div>
        <p className='caption-14-md'>{content}</p>
      </div>
    </div>
  );
}
