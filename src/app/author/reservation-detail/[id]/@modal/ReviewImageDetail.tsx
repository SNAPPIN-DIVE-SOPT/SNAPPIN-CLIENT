'use client';

import { Navigation } from '@/ui';
import { IconClose } from '@/assets';
import Image from 'next/image';
import { formatDate } from '@/utils/formatNumberWithComma';

type ReviewImageDetailProps = {
  reviewer: string;
  image: string;
  handleClose: () => void;
  rating: number;
  createdAt: string;
  content: string;
};

export default function ReviewImageDetail({
  reviewer,
  image,
  handleClose,
  rating,
  createdAt,
  content,
}: ReviewImageDetailProps) {
  return (
    <div className='bg-black-10 absolute inset-0 top-0 right-0 bottom-0 left-0 h-full w-full'>
      <Navigation
        isFixed={true}
        left={<IconClose onClick={handleClose} />}
        center={<p>포토 리뷰</p>}
      />
      <div className='flex w-full items-center justify-center gap-[2.4rem] p-[2rem]'>
        <Image src={image} alt='review image' fill className='object-cover' onClick={} />
        <div className='flex flex-col gap-[0.4rem]'>
          <span className='caption-14-bd text-black-1'>{reviewer}</span>
          <div className='flex items-center justify-between'>
            <span className='caption-14-bd'>{rating}</span>
            <span className='caption-12-md text-black-7'>{formatDate(createdAt)}</span>
          </div>
        </div>
        <p className='caption-14-bd text-black-1'>{content}</p>
      </div>
    </div>
  );
}
