import { ProductCardSkeleton, Divider } from '@/ui';

type ReservationCardSkeletonProps = {
  length?: number;
};

export default function ReservationCardSkeleton({ length = 5 }: ReservationCardSkeletonProps) {
  return (
    <div className='flex flex-col gap-[1.2rem] p-[1.6rem]'>
      {Array.from({ length: length }).map((_, i) => (
        <div key={i}>
          <div className='border-black-4 w-full gap-[1.2rem] rounded-[0.6rem] border-[0.07rem] bg-transparent p-[1.2rem]'>
            <div className='flex flex-col gap-[0.6rem]'>
              <div className='bg-black-3 h-[1.2rem] w-[9.1rem]' />
              <div className='mb-[1.2rem] flex justify-between'>
                <div className='bg-black-3 h-[1.8rem] w-[5.4rem]' />
                <div className='bg-black-3 h-[1.4rem] w-[5.2rem]' />
              </div>
            </div>
            <ProductCardSkeleton />
          </div>

          {i < length - 1 && (
            <Divider thickness='large' color='bg-black-3' className='-mx-[2rem] mt-[1.6rem]' />
          )}
        </div>
      ))}
    </div>
  );
}
