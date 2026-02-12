import { StateCode } from '@/types/stateCode';
import { formatReservationDateTime } from '@/utils/formatDate';
import { Divider } from '@/ui';
import { Section } from '@/components/layout/reservation/SectionLayout';

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
    <Section title='예약 상세' stateCode={status}>
      <Section.Card className='gap-[1.5rem]'>
        <Section.Header client={client} createdAt={createdAt} />
        <Divider thickness='small' color='bg-black-5' />
        <Section.Body>
          <Section.Row label='날짜 및 시간' value={formatReservationDateTime(date, startTime)} />
          <Section.Row label='촬영 시간' value={`${durationTime}시간`} />
          <Section.Row label='촬영 장소' value={place} />
          <Section.Row label='촬영 인원' value={`${peopleCount}인`} />
          <Section.Row label='기타 요청 사항' value={requestNoteText} />
        </Section.Body>
      </Section.Card>
    </Section>
  );
}
