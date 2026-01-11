import { formatDate } from '@/utils/formatNumberWithComma';
import ReviewStar from '@/ui/review-star/ReviewStar';
import { ImageSlide, NavigationClient } from './components';
import { RESERVATION_DETAIL_MOCK } from '../mock/reservationDetail.mock';

export default function Page() {
  //TODO: 서버 데이터 연동( 파라미터에 id 추가)
  const data = RESERVATION_DETAIL_MOCK;

  return (
    <div className='bg-black-10 flex min-h-dvh flex-col items-center justify-around'>
      <NavigationClient />
      <ImageSlide images={data.reviewInfo.images.map((image) => ({ src: image }))} />
      <div className='flex w-full flex-col gap-[1.2rem] px-[2rem]'>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='flex items-center justify-between'>
            <ReviewStar
              starSize='small'
              starFillColor='text-neon-black'
              rating={data.reviewInfo.rating}
            />
            <span className='caption-12-md text-black-7'>
              {formatDate(data.reviewInfo.createdAt)}
            </span>
          </div>
          <span className='caption-12-md text-black-7'>{data.reviewInfo.reviewer}</span>
        </div>
        <p className='caption-14-bd text-black-1'>{data.reviewInfo.content}</p>
      </div>
    </div>
  );
}
