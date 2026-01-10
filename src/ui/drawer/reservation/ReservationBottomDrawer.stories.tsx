import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useMemo, useState } from 'react';
import { Button } from '@/ui';
import ReservationBottomDrawer from './ReservationBottomDrawer';
import { ReservationDraft } from '@/ui/drawer/reservation/types/reservation';

const meta: Meta<typeof ReservationBottomDrawer> = {
  title: 'drawer/ReservationBottomDrawer',
  component: ReservationBottomDrawer,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ReservationBottomDrawer>;

const initialDraft: ReservationDraft = {
  date: null,
  time: null,
  durationHours: 1,
  participantCount: 1,
  place: '',
  request: '',
};

function ReservationBottomDrawerStory() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<ReservationDraft>(initialDraft);

  const viewDateMonth = useMemo(() => new Date(), []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 제출 로직 추가 작성 가능
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>열기</Button>

      <ReservationBottomDrawer
        isOpen={isOpen}
        productId={3}
        amount={10000}
        handleOpenChangeAction={setIsOpen}
        viewDateMonth={viewDateMonth}
        reservationConstraints={{ minDurationHours: 2, maxParticipantCount: 8 }}
        draft={draft}
        handleDraftChangeAction={setDraft}
        onFormSubmitAction={handleSubmit}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <ReservationBottomDrawerStory />,
};
