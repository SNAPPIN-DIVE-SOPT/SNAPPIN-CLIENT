import Link from 'next/link';
import Image from 'next/image';
import { formatShortDate } from '@/utils/formatDate';
import { ReviewStar } from '@snappin/design-system';
import { cn } from '@snappin/design-system/lib';
import { Section } from './SectionLayout';

type ReviewDetailProps = {
  id: number;
  reviewer: string;
  rating: number;
  createdAt: string;
  images: string[];
  content: string;
  layoutClassName?: string;
  contentClassName?: string;
};

export default function ReviewDetail({
  id,
  reviewer,
  rating,
  createdAt,
  images,
  content,
  layoutClassName,
  contentClassName = 'caption-14-rg',
}: ReviewDetailProps) {
  return (
    <Section title='리뷰 상세'>
      <div className='flex flex-col gap-[1.2rem]'>
        <div className={cn('flex flex-col items-start gap-[0.6rem]', layoutClassName)}>
          <div className='flex w-full items-center justify-between'>
            <ReviewStar starSize='small' starFillColor='text-black-9' rating={rating} />
            <span className='caption-12-md text-black-7'>{formatShortDate(createdAt)}</span>
          </div>
          <span className='caption-12-md text-black-7'>{reviewer}</span>
        </div>

        <div className={cn('scrollbar-hide flex gap-[0.4rem] overflow-scroll', layoutClassName)}>
          {images.map((image, idx) => (
            <Link
              key={image}
              href={{
                pathname: `/review-photo/${id}`,
                query: { image: idx },
              }}
              className='relative h-[14rem] w-[14rem] shrink-0'
            >
              <Image src={image} alt={reviewer} fill className='object-cover' />
            </Link>
          ))}
        </div>

        <p className={contentClassName}>{content}</p>
      </div>
    </Section>
  );
}
