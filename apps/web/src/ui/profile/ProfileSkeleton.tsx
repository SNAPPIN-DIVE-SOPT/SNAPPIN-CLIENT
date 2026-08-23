import { cn } from '@snappin/design-system/lib';
import { IconArrowForward } from '@snappin/design-system/assets';

export default function ProfileSkeleton() {
  return (
    <div className='bg-black-1 flex h-[11.5rem] items-center gap-[1.2rem] p-[2rem] pb-[2.9rem]'>
      <div className='bg-black-3 h-[6.4rem] w-[6.4rem] rounded-full' />
      <div className='bg-black-3 h-[1.7rem] w-[4rem] rounded-[0.2rem]' />
    </div>
  );
}

type ProfileRowSkeletonProps = {
  gapClassName?: string;
  iconClassName?: string;
};

export function ProfileRowSkeleton({
  gapClassName = 'gap-[1.2rem]',
  iconClassName,
}: ProfileRowSkeletonProps) {
  return (
    <div className='px-[2rem] pb-[2rem]'>
      <div className='border-black-4 rounded-[0.6rem] border-1 px-[2rem] pt-[2.2rem] pb-[2.1rem]'>
        <div className={cn('flex items-center', gapClassName)}>
          <div className='bg-black-3 relative h-[6.4rem] w-[6.4rem] shrink-0 rounded-full' />
          <div className='flex flex-1 shrink flex-col gap-[0.8rem]'>
            <div className='flex flex-col gap-[0.4rem]'>
              <div className='bg-black-3 h-[1.7rem] w-[3.7rem] rounded-[0.2rem]' />
              <div className='bg-black-3 h-[1.2rem] w-[9rem] rounded-[0.2rem]' />
            </div>
            <div className='flex flex-col gap-[0.4rem]'>
              <div className='bg-black-3 h-[1.2rem] w-[15.8rem] rounded-[0.2rem]' />
              <div className='bg-black-3 h-[1.2rem] w-[3.7rem] rounded-[0.2rem]' />
            </div>
          </div>
          <IconArrowForward className={cn('text-black-6', iconClassName)} />
        </div>
      </div>
    </div>
  );
}
