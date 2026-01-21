import { ProductCardSkeleton, Divider } from '@/ui';
import { DetailLayout } from '@/app/photographer/reservation-detail/[id]/components/detail-layout/DetailLayout';

export default function SectionSkeleton() {
  return (
    <div>
      <div className='bg-black-1 flex flex-col px-[2rem] pt-[1.7rem] pb-[1.2rem]'>
        <span className='caption-14-md'>예약 요청 상품</span>
          <ProductCardSkeleton  className='pt-[1.2rem]' />
          <div className='bg-black-3 h-[2.7rem] w-full mt-[1.7rem]' />
      </div>
      <Divider thickness='large' color='bg-black-3' />
      <DetailLayout title='예약 상세'>
      <div className='bg-black-3 h-[1.2rem] w-[15rem] mb-[0.4rem]' />
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className='bg-black-3 h-[1.6rem] w-[15rem]' />
        ))}
      </DetailLayout>
    </div>
  );
}
