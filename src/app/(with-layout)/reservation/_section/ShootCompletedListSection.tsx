import { Divider } from '@/ui';
import { EmptyView, ReservationCard } from '../components';
import type { ReservationListItemMock } from '../mock';
import { createReservationCardProps } from '../utils';

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
      {data.map(({ reservation }, reservationIndex) => (
        <div key={reservation.reservationId}>
          <ReservationCard
            {...createReservationCardProps(reservation, {
              reviewHref: `/review/write/${reservation.reservationId}`,
            })}
          />
          {reservationIndex !== data.length - 1 && (
            <Divider thickness='large' color='bg-black-3' className='-mx-[2rem] mt-[1.2rem]' />
          )}
        </div>
      ))}
    </section>
  );
}
