import { StateCode } from '@/ui/chip/state-chip/types/stateCode';
import { DetailLayout, DetailRow } from '../components/detail-layout/DetailLayout';

type ReservationDetailProps = {
  status: StateCode;
  date: string;
  startTime: string;
  durationTime: number;
  place: string;
  peopleCount: number;
  requestNote: string;
};

export default function ReservationDetail({
  status,
  date,
  startTime,
  durationTime,
  place,
  peopleCount,
  requestNote,
}: ReservationDetailProps) {
  const [_, month, day] = date.split('-');
  const [hour, minute] = startTime.split(':');
  const dateValue = `${Number(month)}/${Number(day)} ${Number(hour)}시 ${Number(minute) !== 0 ? `${Number(minute)}분` : ''}`;

  return (
    <DetailLayout title='예약 상세' subtitle={status}>
      <DetailRow label='날짜 및 시간' value={dateValue} />
      <DetailRow label='촬영 시간' value={`${durationTime}분`} />
      <DetailRow label='촬영 장소' value={place} />
      <DetailRow label='촬영 인원' value={`${peopleCount}인`} />
      <DetailRow label='기타 요청 사항' value={requestNote} />
    </DetailLayout>
  );
}
