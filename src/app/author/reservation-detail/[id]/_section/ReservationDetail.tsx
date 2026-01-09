import { StateCode } from '@/types/stateCode';
import { DetailLayout, DetailRow } from '../components/detail-layout/DetailLayout';
import { formatReservationDateTime } from '@/utils/formatNumberWithComma';

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
  return (
    <DetailLayout title='예약 상세' subtitle={status}>
      <DetailRow label='날짜 및 시간' value={formatReservationDateTime(date, startTime)} />
      <DetailRow label='촬영 시간' value={`${durationTime}분`} />
      <DetailRow label='촬영 장소' value={place} />
      <DetailRow label='촬영 인원' value={`${peopleCount}인`} />
      <DetailRow label='기타 요청 사항' value={requestNote} />
    </DetailLayout>
  );
}
