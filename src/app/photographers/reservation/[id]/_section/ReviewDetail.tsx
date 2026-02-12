import Link from 'next/link';
import Image from 'next/image';
import { formatShortDate } from '@/utils/formatDate';
import { ReviewStar } from '@/ui';
import { Section } from '@/components/layout/reservation/SectionLayout';

type ReviewDetailProps = {
  reservationId: number;
  id: number;
  reviewer: string;
  rating: number;
  createdAt: string;
  images: string[];
  content: string;
};

export default function ReviewDetail({
  reservationId,
  id,
  reviewer,
  rating,
  createdAt,
  images,
  content,
}: ReviewDetailProps) {
  return (
    <Section title='리뷰 상세'>
      <div className='flex flex-col gap-[1.2rem]'>
        <div className='flex flex-col items-start gap-[0.6rem] pr-[2rem]'>
          <div className='flex w-full items-center justify-between'>
            <ReviewStar starSize='small' starFillColor='text-black-9' rating={rating} />
            <span className='caption-12-md text-black-7'>{formatShortDate(createdAt)}</span>
          </div>
          <span className='caption-12-md text-black-7'>{reviewer}</span>
        </div>

        <div className='scrollbar-hide flex gap-[0.4rem] overflow-scroll pr-[2rem]'>
          {images.map((image, idx) => (
            <Link
              key={image}
              href={{
                pathname: `/photographers/reservation/${reservationId}/photos/${id}`,
                query: { image: idx },
              }}
              className='relative h-[14rem] w-[14rem] shrink-0'
            >
              <Image src={image} alt={reviewer} fill className='object-cover' />
            </Link>
          ))}
        </div>

        <p className='caption-14-md pr-[2rem]'>{content}</p>
      </div>
    </Section>
  );
}
