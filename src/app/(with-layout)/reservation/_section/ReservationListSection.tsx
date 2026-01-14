import { Divider } from '@/ui';
import { EmptyView, ReservationCard } from '../components';
import type { ReservationListItemMock } from '../mock';
import { createReservationCardProps } from '../utils';

type ReservationListSectionProps = {
  reservations: ReservationListItemMock[];
};

export default function ReservationListSection({ reservations }: ReservationListSectionProps) {
  // TODO: EmptyView 확인을 위한 데이터 주석 처리
  // const data = reservations;
  const data = reservations.slice(0, 0);

  return data.length === 0 ? (
    <EmptyView title='예약 문의한 상품이 없어요' description='원하는 상품을 예약해보세요.' />
  ) : (
    <section className='flex flex-col gap-[1.2rem] p-[1.2rem]'>
      {data.map(({ reservation }, reservationIndex) => (
        <div key={reservation.reservationId}>
          <ReservationCard {...createReservationCardProps(reservation)} />
          {reservationIndex !== data.length - 1 && (
            <Divider thickness='large' color='bg-black-3' className='-mx-[2rem] mt-[1.2rem]' />
          )}
        </div>
      ))}
    </section>
  );
}
