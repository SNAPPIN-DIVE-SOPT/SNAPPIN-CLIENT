import { StateCode } from '@/types/stateCode';
import { DetailLayout, DetailRow } from '../components/detail-layout/DetailLayout';
import { formatCreatedAt, formatReservationDateTime } from '@/utils/formatNumberWithComma';

type ReservationDetailProps = {
  status: StateCode;
  date: string;
  startTime: string;
  durationTime?: number;
  place: string;
  peopleCount: number;
  requestNote: string | null;
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
  createdAt,
}: ReservationDetailProps) {
  const requestNoteText = requestNote === null || requestNote.length === 0 ? '-' : requestNote;

  return (
    <DetailLayout title='예약 상세' subtitle={status}>
      <span className='caption-10-md text-black-7 mb-[0.4rem]'>{formatCreatedAt(createdAt)}</span>
      <DetailRow label='날짜 및 시간' value={formatReservationDateTime(date, startTime)} />
      <DetailRow label='촬영 시간' value={`${durationTime}시간`} />
      <DetailRow label='촬영 장소' value={place} />
      <DetailRow label='촬영 인원' value={`${peopleCount}인`} />
      <DetailRow label='기타 요청 사항' value={requestNoteText} />
    </DetailLayout>
  );
}
