import { DetailRow } from '../components';
import { StateChip } from '@/ui';
import type { StateCode } from '@/types/stateCode';
import { formatCreatedAt, formatReservationDateTime } from '@/utils/formatNumberWithComma';

type ReservationDetailProps = {
  reservationStatus: StateCode;
  reservationInfo: {
    date: string;
    startTime: string;
    durationTime: number;
    place: string;
    peopleCount: number;
    requestNote: string;
    createdAt: string;
  };
};

export default function ReservationDetail({
  reservationStatus,
  reservationInfo,
}: ReservationDetailProps) {
  const { date, startTime, durationTime, place, peopleCount, requestNote, createdAt } =
    reservationInfo;

  return (
    <section className='bg-black-1 px-[2rem] pt-[1.7rem] pb-[2.4rem]'>
      <div className='flex justify-between'>
        <span className='caption-14-bd text-black-10'>예약 상세</span>
        <StateChip label={reservationStatus} />
      </div>
      <div className='border-black-5 mt-[1.2rem] rounded-[0.6rem] border-[0.07rem] px-[1.7rem] py-[1.3rem]'>
        <div className='caption-10-md text-black-7 mb-[2.4rem]'>{formatCreatedAt(createdAt)}</div>
        <div className='flex flex-col gap-[2rem]'>
          <DetailRow label='날짜 및 시간' value={formatReservationDateTime(date, startTime)} />
          <DetailRow label='촬영 시간' value={`${durationTime}시간`} />
          <DetailRow label='장소' value={place} />
          <DetailRow label='인원' value={`${peopleCount}인`} />
          <DetailRow label='요청 사항' value={requestNote} />
        </div>
      </div>
    </section>
  );
}
