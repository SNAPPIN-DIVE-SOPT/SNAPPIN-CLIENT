import { StateCode } from '@/types/stateCode';
import { formatReservationDateTime } from '@/utils/formatDate';
import { Divider, StateChip } from '@/ui';
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
    <Section title='예약 상세' right={<StateChip label={status} />}>
      <Section.Card className='gap-[1.5rem]'>
        <Section.Header>
          <div className='flex items-center gap-[0.2rem]'>
            <span className='font-16-bd'>{client}</span>
            <span className='font-16-md'>님</span>
          </div>
          <span className='caption-10-md text-black-7'>{createdAt}</span>
        </Section.Header>
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
