import { StateCode } from '@/types/stateCode';
import { DetailLayout, DetailRow } from '../components/detail-layout/DetailLayout';
import {
  formatCreatedAt,
  formatDurationTime,
  formatReservationDateTime,
} from '@/utils/formatNumberWithComma';
import { Divider } from '@/ui';

type ReservationDetailProps = {
  status: StateCode;
  date: string;
  startTime: string;
  durationTime: number;
  place: string;
  peopleCount: number;
  requestNote: string;
  client: string;
  createdAt: string;
};

export default function ReservationDetail({
  status,
  date,
  startTime,
  durationTime,
  place,
  peopleCount,
  requestNote,
  client,
  createdAt,
}: ReservationDetailProps) {
  const requestNoteText = requestNote === null || requestNote.length === 0 ? '-' : requestNote;

  return (
    <DetailLayout title='예약 상세' subtitle={status}>
      <div className='flex flex-col gap-[1.5rem]'>
        <div className='flex flex-col gap-[0.4rem]'>
          <div className='flex items-center gap-[0.2rem]'>
            <span className='font-16-bd'>{client}</span>
            <span className='font-16-md'>님</span>
          </div>
          <span className='caption-10-md text-black-7'>{formatCreatedAt(createdAt)}</span>
        </div>
        <Divider thickness='small' color='bg-black-5' />
      </div>
      <DetailRow
        label='날짜 및 시간'
        value={formatReservationDateTime(date, startTime)}
        className='mt-[-0.5rem]'
      />
      <DetailRow label='촬영 시간' value={formatDurationTime(durationTime)} />
      <DetailRow label='촬영 장소' value={place} />
      <DetailRow label='촬영 인원' value={`${peopleCount}인`} />
      <DetailRow label='기타 요청 사항' value={requestNoteText} />
    </DetailLayout>
  );
}
