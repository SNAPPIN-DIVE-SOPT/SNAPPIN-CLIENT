import { useAvailableTimes } from '@/app/product-detail/[productId]/api';
import { BottomDrawer, TimePicker } from '@/ui';

type AvailableTimeSectionProps = {
  productId: string;
  date: string;
  time: string | null;
  onChangeTime: (nextTime: string) => void;
};

export default function AvailableTimeSection({
  productId,
  date,
  time,
  onChangeTime,
}: AvailableTimeSectionProps) {
  const { data } = useAvailableTimes(productId, date);

  if (data.sections?.length === 0) return null;

  return (
    <BottomDrawer.Row className='flex flex-col gap-[1.2rem]'>
      <TimePicker
        sections={data.sections ?? []}
        value={time ?? undefined}
        handleChange={onChangeTime}
      />
      ;
    </BottomDrawer.Row>
  );
}
