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
  const { data: productAvailableTimesResponse } = useAvailableTimes(productId, date);

  if (productAvailableTimesResponse?.times?.length === 0) return null;

  return (
    <BottomDrawer.Row className='flex flex-col gap-[1.2rem] px-[2rem] py-[2rem]'>
      <BottomDrawer.Title>촬영 시작 시간을 선택해 주세요</BottomDrawer.Title>
      <TimePicker
        sections={productAvailableTimesResponse?.times ?? []}
        value={time ?? undefined}
        handleChange={onChangeTime}
      />
    </BottomDrawer.Row>
  );
}
