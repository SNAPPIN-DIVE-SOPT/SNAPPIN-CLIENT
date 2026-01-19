import { ProductCardSkeleton, Divider } from '@/ui';
import { DetailLayout } from '../components/detail-layout/DetailLayout';

export default function SectionSkeleton() {
  return (
    <div>
      <DetailLayout title='예약 상세'>
        <div className='flex flex-col gap-[1.5rem]'>
          <ProductCardSkeleton />
          <div className='w-full h-[2.7rem] bg-black-3' />
        </div>
      </DetailLayout>
      <Divider thickness='large' color='bg-black-3' />
      <DetailLayout title='예약 상세'>
        <div className='flex flex-col gap-[1.5rem]'>
          <div className='flex flex-col gap-[0.4rem]'>
            <div className='flex items-center gap-[0.2rem]'>
              <div className='w-[6rem] h-[2.4rem] bg-black-3' />
            </div>
            <div className='w-[9rem] h-[1.6rem] bg-black-3' />
          </div>
          <Divider thickness='small' color='bg-black-5' />
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='w-[15rem] h-[1.6rem] bg-black-3' />
        ))}
      </DetailLayout>
    </div>
  );
}
