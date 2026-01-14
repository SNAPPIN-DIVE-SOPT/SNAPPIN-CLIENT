import { Divider } from '@/ui';
import { EmptyView, ReservationCard } from '../components';
import type { ReservationListItemMock } from '../mock/reservationList.mock';
import { STATE_CODES } from '@/types/stateCode';

type ShootCompletedListSectionProps = {
  reservations: ReservationListItemMock[];
};

export default function ShootCompletedListSection({ reservations }: ShootCompletedListSectionProps) {
  const data = reservations;

  return data.length === 0 ? (
    <EmptyView
      title='촬영 완료 내역이 없어요'
      description='촬영이 완료되면 이곳에서 확인할 수 있어요.'
    />
  ) : (
    <section className='flex flex-col gap-[1.2rem] p-[1.2rem]'>
      {data.map(({ reservation }, reservationIndex) => {
        const reviewWriteHref =
          reservation.status === STATE_CODES.SHOOT_COMPLETED && !reservation.product.isReviewed
            ? `/review/write/${reservation.reservationId}`
            : undefined;

        return (
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
              reviewHref={reviewWriteHref}
            />
            {reservationIndex !== data.length - 1 && (
              <Divider thickness='large' color='bg-black-3' className='-mx-[2rem] mt-[1.2rem]' />
            )}
          </div>
        );
      })}
    </section>
  );
}
