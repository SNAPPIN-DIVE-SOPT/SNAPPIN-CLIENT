import {
  ProductStatus,
  Receipt,
  ReservationDetail,
  ReviewDetail,
  DetailPageFooter,
} from './_section';
import NavigationClient from './components/navigation-client/Navigation.client';
import { StateCode } from '@/types/stateCode';
import { Divider } from '@/ui';
import { RESERVATION_DETAIL_MOCK } from './mock/reservationDetail.mock';

export default function Page() {
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
          moods={data.productInfo.moods}
        />
        <Divider thickness='large' color='bg-black-3' />
        <ReservationDetail
          client={data.reservationInfo.client}
          createdAt={data.reservationInfo.createdAt}
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
            <Receipt
              basePrice={data.paymentInfo.basePrice}
              extraPrice={data.paymentInfo.extraPrice}
              totalPrice={data.paymentInfo.totalPrice}
            />
          </>
        )}

        {data.reviewInfo ? (
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
            <div className='h-[6.3rem]' />
          </>
        ) : (
          <>
            <DetailPageFooter
              id={data.productInfo.id}
              date={data.reservationInfo.date}
              startTime={data.reservationInfo.startTime}
              status={data.status as StateCode}
            />
            <div className='bg-black-1 h-[6.3rem]' />
          </>
        )}
      </div>
    </div>
  );
}
