import { ProductStatus, Recipt, ReservationDetail, ReviewDetail } from './_section';
import NavigationClient from './components/navigation-client/Navigation.client';
import { RESERVATION_DETAIL_MOCK } from './mock/reservationDetail.mock';
import { StateCode } from '@/types/stateCode';
import { MoodCode } from '@/types/moodCode';
import { Divider } from '@/ui';

export default function page() {
  //TODO: 서버 데이터 연동( 파라미터에 id 추가)
  const data = RESERVATION_DETAIL_MOCK;

  return (
    <div className='bg-black-3 flex flex-col'>
      <NavigationClient />
      <div className='flex flex-col'>
        <ProductStatus
          id={data.productInfo.id}
          status={data.status as StateCode}
          imageUrl={data.productInfo.imageUrl}
          title={data.productInfo.title}
          rate={data.productInfo.rate}
          reviewCount={data.productInfo.reviewCount}
          photographer={data.productInfo.photographer}
          price={data.productInfo.price}
          moods={data.productInfo.moods as MoodCode[]}
        />
        <Divider thickness='large' color='bg-black-3' />
        <ReservationDetail
          status={data.status as StateCode}
          date={data.reservationInfo.date}
          startTime={data.reservationInfo.startTime}
          durationTime={data.reservationInfo.durationTime}
          place={data.reservationInfo.place}
          peopleCount={data.reservationInfo.peopleCount}
          requestNote={data.reservationInfo.requestNote}
        />
        {data.paymentInfo && (
          <>
            <Divider thickness='large' color='bg-black-3' />
            <Recipt
              basePrice={data.paymentInfo.basePrice}
              extraPrice={data.paymentInfo.extraPrice}
              totalPrice={data.paymentInfo.totalPrice}
            />
          </>
        )}
        {data.reviewInfo && (
          <>
            <Divider thickness='large' color='bg-black-3' />
            <ReviewDetail
              id={data.reviewInfo.id}
              reviewer={data.reviewInfo.reviewer}
              rating={data.reviewInfo.rating}
              createdAt={data.reviewInfo.createdAt}
              images={data.reviewInfo.images}
              content={data.reviewInfo.content}
            />
          </>
        )}
      </div>
    </div>
  );
}
