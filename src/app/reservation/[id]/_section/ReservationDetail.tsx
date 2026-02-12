import type { StateCode } from '@/types/stateCode';
import { formatReservationDateTime } from '@/utils/formatDate';
import { Section } from '@/components/layout/reservation/SectionLayout';

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
    <Section title='예약 상세' stateCode={status}>
      <Section.Card className='gap-[2.4rem]'>
        <Section.Header createdAt={createdAt} />
        <Section.Body>
          <Section.Row label='날짜 및 시간' value={formatReservationDateTime(date, startTime)} />
          <Section.Row label='촬영 시간' value={`${durationTime}시간`} />
          <Section.Row label='장소' value={place} />
          <Section.Row label='인원' value={`${peopleCount}인`} />
          <Section.Row label='기타 요청 사항' value={requestNoteText} />
        </Section.Body>
      </Section.Card>
    </Section>
  );
}
