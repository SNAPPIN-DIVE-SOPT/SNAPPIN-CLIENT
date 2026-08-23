import { cn } from '@snappin/design-system/lib';
import BaseReservationCardSkeleton from '@/app/(with-layout)/reservations/components/reservation-card/ReservationCardSkeleton';

type ReservationCardSkeletonProps = {
  length?: number;
  className?: string;
};

export default function ReservationCardSkeleton({
  length,
  className,
}: ReservationCardSkeletonProps) {
  return <BaseReservationCardSkeleton length={length} className={cn('p-[1.6rem]', className)} />;
}
