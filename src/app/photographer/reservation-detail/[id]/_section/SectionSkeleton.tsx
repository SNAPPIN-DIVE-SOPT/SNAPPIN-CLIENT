import { ProductCardSkeleton, Divider } from '@/ui';
import { DetailLayout } from '../components/detail-layout/DetailLayout';

export default function SectionSkeleton() {
  return (
    <div>
      <DetailLayout title='예약 상세'>
        <div className='flex flex-col gap-[1.5rem]'>
          <ProductCardSkeleton className='border-none py-0 px-0' />
          <div className='bg-black-3 h-[2.7rem] w-full' />
        </div>
      </DetailLayout>
      <Divider thickness='large' color='bg-black-3' />
      <DetailLayout title='예약 상세'>
        <div className='flex flex-col gap-[1.5rem]'>
          <div className='flex flex-col gap-[0.4rem]'>
            <div className='flex items-center gap-[0.2rem]'>
              <div className='bg-black-3 h-[2.4rem] w-[6rem]' />
            </div>
            <div className='bg-black-3 h-[1.6rem] w-[9rem]' />
          </div>
          <Divider thickness='small' color='bg-black-5' />
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='bg-black-3 h-[1.6rem] w-[15rem]' />
        ))}
      </DetailLayout>
    </div>
  );
}