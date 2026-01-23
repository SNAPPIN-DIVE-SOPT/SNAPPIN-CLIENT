import { ProductCardSkeleton, Divider } from '@/ui';
import { DetailLayout } from '../components/detail-layout/DetailLayout';

export default function SectionSkeleton() {
  return (
    <div>
      <div className='bg-black-1 flex flex-col pt-[1.7rem] pb-[1.2rem]'>
        <span className='caption-14-bd px-[2rem]'>예약 요청 상품</span>
        <ProductCardSkeleton className='pt-[1.2rem]' />
        <div className='px-[2rem]'>
          <div className='bg-black-3 h-[2.7rem] w-full rounded-[0.6rem]' />
        </div>
      </div>
      <Divider thickness='large' color='bg-black-3' />

      <DetailLayout title='예약 상세'>
        <div className='mt-[0.2rem] -mb-[0.5rem] flex flex-col gap-[0.6rem]'>
          <div className='bg-black-3 h-[2.0rem] w-[5.8rem]' />
          <div className='bg-black-3 h-[1.3rem] w-[10.2rem]' />
        </div>
        <Divider className='-mb-[0.5rem]' />
        <div className='bg-black-3 mb-[0.4rem] h-[1.2rem] w-[15rem]' />
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='bg-black-3 h-[1.4rem] w-[15rem]' />
        ))}
      </DetailLayout>
      <Divider thickness='large' color='bg-black-3' />
      <DetailLayout title='결제 상세' className='gap-[1.5rem]'>
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className='bg-black-3 w-full] h-[1.4rem]' />
        ))}
        <Divider thickness='small' color='bg-black-3' />
        <div className='bg-black-3 h-[2.8rem] w-full' />
      </DetailLayout>
    </div>
  );
}
