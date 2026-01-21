import { ProductCardSkeleton, Divider } from '@/ui';
import { DetailLayout } from '@/app/photo-final-detail/[id]/components/detail-layout/DetailLayout';
/*
TODO: 스프린트 때  to.. 승혜ㅎㅎㅎㅎ - 동희가
1. photo-final-detail, reservation-detail 분리할 필요가 있었을까??
- 왜냐하면 헤더 text 빼고는 사실 똑같은 것 같음(중복된 코드가 많음)

2. (분리한다면) 현재는 photo-final-detail는 detail-layout , detail-row 를 사용 o, 하지만 reservation-detail는 detail-layout , detail-row 를 사용 x
구조를 통일 시켜도 될듯!
분리한다면 공통 layout으로 만들어서 사용해도 될듯!(현재 넘 중복됨, 스켈레톤도 중복됨 ㅜㅜ) -> 작가뷰애서도 중복이 되서 디자인과 gap 통일해서 공통으로 둬도 좋을 것 같음!

3. 리펙토링 시작할 때 바로 개발 시작하지 말고 먼저 구조 짜보고 시작하기! -> 저한테도 왜 그렇게 짰는지 설명해주세여
***/
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
            <div key={index} className='bg-black-3 h-[1.4rem] w-[15rem]' />
          ))}
      </DetailLayout>
      <Divider thickness='large' color='bg-black-3' />
        <DetailLayout title='결제 상세' className='gap-[1.5rem]'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className='bg-black-3 h-[1.4rem] w-full]' />
          ))}
          <Divider thickness='small' color='bg-black-3' />
          <div className='bg-black-3 h-[2.8rem] w-full' />
      </DetailLayout>
    </div>
  );
}
