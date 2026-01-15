import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Divider, ReviewStar } from '@/ui';
import { formatDate } from '@/utils/formatNumberWithComma';
import { padNumber } from '@/utils/padNumber';
import { REVIEW_LIST_MOCK } from '../mock';

type ReviewListSectionProps = {
  productId: string;
}

type ReviewProps = {
  rate: number;
  createdAt: string;
  reviewer: string;
  images: string[];
  content: string;
}

export default function ReviewListSection({ productId }: ReviewListSectionProps) {
  // TODO: 상품 리뷰 목록 조회 API 연동 (request에 productId, cursor 전달)
  const reviewListMock = REVIEW_LIST_MOCK.data;

  return (
    <section className='mb-[8.4rem]'>
      {reviewListMock.reviews.length === 0
        ?
          <div className='flex justify-center items-center py-[8rem]'>
            <span className='caption-14-rg text-black-6 text-center'>
              아직 작성된 리뷰가 없어요
            </span>
          </div>
        :
          <>
            {reviewListMock.reviews.map((review, idx) => (
              <div key={review.id}>
                <Review
                  rate={review.rating}
                  createdAt={review.createdAt}
                  reviewer={review.reviewer}
                  images={review.images}
                  content={review.content}
                />
                {idx < reviewListMock.reviews.length - 1
                  && (<Divider thickness='large' color='bg-black-3' className='w-full' />)}
              </div>
            ))}
          </>
      }
    </section>
  );
}

function Review({
  rate,
  createdAt,
  reviewer,
  images,
  content
}: ReviewProps) {
  const pathname = usePathname();
  const reviewImages = images.map((image, idx) => ({ src: image, alt: `${reviewer}님의 리뷰 이미지 ${idx}` }));
  const formattedDate = formatDate(createdAt).slice(2).split('.').map((number) => padNumber(Number(number))).join('.');

  return (
    <div className='flex flex-col gap-[1.2rem] p-[2rem]'>
      {/* 별점, 날짜, 아이디 */}
      <div className='flex flex-col gap-[0.6rem]'>
        <div className='flex justify-between'>
          <ReviewStar rating={rate} starSize='small' />
          <span className='caption-12-md text-black-7'>{formattedDate}</span>
        </div>
        <span className='caption-12-md text-black-7'>{reviewer}</span>
      </div>
      {/* 이미지 캐러셀 */}
      <div className='flex gap-[0.4rem] w-full overflow-x-auto'>
        {reviewImages.map((image, idx) => (
          <Link
            href={`${pathname}/review/1`}
            key={idx}
            className='relative w-[14rem] h-[14rem] shrink-0'
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
            />
          </Link>
        ))}
      </div>
      {/* 리뷰 내용 */}
      <span className='caption-14-md text-black-10'>{content}</span>
    </div>
  );
}