'use client';

import { StateChip } from '@/ui';
import type { StateCode } from '@/types/stateCode';
import type { ReservationDetailMockReservationInfo } from '@/app/client/reservation-detail/[id]/mock/reservationDetail.mock';

type ReservationInfoField = {
  label: string;
  value: string;
};

type ReservationDetailProps = {
  reservationStatus: StateCode;
  reservationInfo: ReservationDetailMockReservationInfo;
};

const createDurationTimeLabel = (durationTime: number) => {
  const hours = Math.floor(durationTime / 60);
  const minutes = durationTime % 60;

  return hours === 0
    ? `${minutes}분`
    : minutes === 0
      ? `${hours}시간`
      : `${hours}시간 ${minutes}분`;
};

const createReservationDateTimeLabel = (date: string, startTime: string) => {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = startTime.split(':').map(Number);

  const hasValidDate = ![year, month, day].some((value) => Number.isNaN(value));
  const hasValidTime = ![hour, minute].some((value) => Number.isNaN(value));

  return hasValidDate && hasValidTime
    ? `${month}/${day} ${hour < 12 ? '오전' : '오후'} ${hour % 12 === 0 ? 12 : hour % 12}시${
        minute === 0 ? '' : ` ${minute}분`
      }`
    : `${date} ${startTime}`;
};

const createReservationInfoFieldsByReservationInfo = ({
  date,
  startTime,
  durationTime,
  place,
  peopleCount,
  requestNote,
}: ReservationDetailMockReservationInfo): ReservationInfoField[] => [
  { label: '날짜 및 시간', value: createReservationDateTimeLabel(date, startTime) },
  { label: '촬영 시간', value: createDurationTimeLabel(durationTime) },
  { label: '장소', value: `${place}학교` },
  { label: '인원', value: `${peopleCount}인` },
  { label: '요청 사항', value: requestNote },
];

export default function ReservationDetail({
  reservationStatus,
  reservationInfo,
}: ReservationDetailProps) {
  const reservationInfoFields = createReservationInfoFieldsByReservationInfo(reservationInfo);

  return (
    <section className='bg-black-1 h-auto px-[2rem] pt-[1.7rem] pb-[2.4rem]'>
      <div className='flex justify-between'>
        <span className='caption-14-bd text-black-10'>예약 상세</span>
        <StateChip label={reservationStatus} />
      </div>
      <div className='border-black-5 mt-[1.2rem] rounded-[0.6rem] border-[0.07rem] px-[1.7rem] py-[1.3rem]'>
        <div className='caption-10-md text-black-7 mb-[2.4rem]'>예약 정보</div>
        <div className='flex flex-col gap-[2rem]'>
          {reservationInfoFields.map(({ label, value }) => (
            <div key={label} className='flex'>
              <div className='caption-12-md text-black-7 w-[8rem]'>{label}</div>
              <div className='caption-12-md text-black-10 flex-1'>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
