import { Divider } from '@/ui';
import { EmptyView, ReservationCard } from '../components';
import type { ReservationListItemMock } from '../mock';

type ReservationListProps = {
  reservations: ReservationListItemMock[];
};

export default function ReservationListSection({ reservations }: ReservationListProps) {
  return reservations.length === 0 ? (
    <EmptyView title='예약 내역이 없어요' description='원하는 상품을 예약해보세요.' />
  ) : (
    <section className='flex flex-col gap-[1.2rem] p-[1.2rem]'>
      {reservations.map(({ reservation }, reservationIndex) => (
        <div key={reservation.reservationId}>
          <ReservationCard
            image={{ src: reservation.product.imageUrl, alt: reservation.product.title }}
            name={reservation.product.title}
            rate={reservation.product.rate}
            reviewCount={reservation.product.reviewCount}
            photographer={reservation.product.photographer}
            price={reservation.product.price}
            moods={reservation.product.moods}
            status={reservation.status}
            date={reservation.createdAt}
            href={`/reservation-detail/${reservation.reservationId}`}
            isReviewed={reservation.product.isReviewed}
            reviewHref={`/review/write/${reservation.reservationId}`}
          />
          {reservationIndex !== reservations.length - 1 && (
            <div className='-mx-[2rem] pt-[1.2rem]'>
              <Divider className='h-[0.6rem]' color='bg-black-3' />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
