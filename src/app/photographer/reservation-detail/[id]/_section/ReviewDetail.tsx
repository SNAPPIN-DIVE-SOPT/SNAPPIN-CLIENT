import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/formatNumberWithComma';
import ReviewStar from '@/ui/review-star/ReviewStar';

type ReviewDetailProps = {
  id: number;
  reviewer: string;
  rating: number;
  createdAt: string;
  images: string[];
  content: string;
};

export default function ReviewDetail({
  id,
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
            <span className='caption-12-md text-black-7'>{formatDate(createdAt)}</span>
          </div>
          <span className='caption-12-md text-black-7'>{reviewer}</span>
        </div>
      </div>
      <div className='scrollbar-hide flex gap-[0.4rem] overflow-scroll'>
        {images.map((image) => (
          <Link
            key={image}
            href={`/photographer/reservation-detail/${id}/photos`}
            className='shrink-0'
          >
            <Image src={image} alt={reviewer} width={140} height={140} className='object-cover' />
          </Link>
        ))}
      </div>

      <p className='caption-14-md'>{content}</p>
    </div>
  );
}
