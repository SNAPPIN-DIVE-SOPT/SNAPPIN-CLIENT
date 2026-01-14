import { Divider } from '@/ui';
import { EmptyView, ReservationCard } from '../components';
import type { ReservationListItemMock } from '../mock';

type ShootCompletedListProps = {
  reservations: ReservationListItemMock[];
};

export default function ShootCompletedListSection({ reservations }: ShootCompletedListProps) {
  return reservations.length === 0 ? (
    <EmptyView
      title='촬영 완료 내역이 없어요'
      description='촬영이 완료되면 이곳에서 확인할 수 있어요.'
    />
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
            reviewHref={`/review/write?reservationId=${reservation.reservationId}`}
          />
          {reservationIndex !== reservations.length - 1 && (
            <Divider thickness='large' color='bg-black-3' className='mt-[1.2rem]' />
          )}
        </div>
      ))}
    </section>
  );
}
