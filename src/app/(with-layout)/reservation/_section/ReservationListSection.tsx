import { Divider } from '@/ui';
import { EmptyView, ReservationCard } from '../components';
import type { ReservationListItemMock } from '../mock/reservationList.mock';

type ReservationListSectionProps = {
  reservations: ReservationListItemMock[];
};

export default function ReservationListSection({ reservations }: ReservationListSectionProps) {
  const data = reservations;

  return data.length === 0 ? (
    <EmptyView title='예약 문의한 상품이 없어요' description='원하는 상품을 예약해보세요.' />
  ) : (
    <section className='flex flex-col gap-[1.2rem] p-[1.2rem]'>
      {data.map(({ reservation }, reservationIndex) => (
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
          />
          {reservationIndex !== data.length - 1 && (
            <Divider thickness='large' color='bg-black-3' className='-mx-[2rem] mt-[1.2rem]' />
          )}
        </div>
      ))}
    </section>
  );
}
