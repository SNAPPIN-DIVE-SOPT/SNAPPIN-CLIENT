import { cn } from '@/shared/lib/cn';

type StateLabel = 
  | '예약 요청'
  | '작가 확인 중'
  | '결제 요청'
  | '결제 완료'
  | '예약 확정'
  | '예약 취소'
  | '촬영 완료';

type StateStyle = {
  chipColor: string;
  labelColor: string;
};

const STATE_STYLE_BY_LABEL: Record<StateLabel, StateStyle> = {
  '예약 요청': { chipColor: 'bg-yellow', labelColor: 'text-yellow-text' },
  '작가 확인 중': { chipColor: 'bg-yellow', labelColor: 'text-yellow-text' },
  '결제 요청': { chipColor: 'bg-yellow', labelColor: 'text-yellow-text' },
  '결제 완료': { chipColor: 'bg-blue', labelColor: 'text-blue-text' },
  '예약 확정': { chipColor: 'bg-green', labelColor: 'text-green-text' },
  '예약 취소': { chipColor: 'bg-red', labelColor: 'text-red-text' },
  '촬영 완료': { chipColor: 'bg-black-4', labelColor: 'text-black-8' },
};

type StateProps = {
  label: StateLabel;
  className?: string;
};

export default function State({
  label,
  className
}: StateProps) {
  const { chipColor, labelColor } = STATE_STYLE_BY_LABEL[label];

  return (
    <div
      className={cn(
        'inline-flex justify-center items-center w-fit px-[0.5rem] py-[0.2rem] gap-[1rem] rounded-[0.3rem]',
        chipColor,
        className
      )}
    >
      <span className={cn('caption-12-md', labelColor)}>
        {label}
      </span>
    </div>
  );
}