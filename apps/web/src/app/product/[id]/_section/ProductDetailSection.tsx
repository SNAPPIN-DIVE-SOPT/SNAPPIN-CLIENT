// TODO: API 구현 완료되면 주석 풀기
import { Fragment } from 'react';
import { TagChip, Divider } from '@snappin/design-system';
// import { GetProductInfoResponse } from '@/swagger-api';

type ProductDetailSectionProps = {
  // productInfo: GetProductInfoResponse | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productInfo: any;
};

const OPTIONAL_INFO_CONFIG = [
  { key: 'provideRaw', label: 'RAW 파일' },
  { key: 'provideOriginalJpg', label: '원본 JPG' },
  { key: 'originalJpgCount', label: '원본 JPG 제공 수량' },
  { key: 'originalDeliveryTime', label: '원본 제공 시점' },
  { key: 'provideVideo', label: '동영상 제공 여부' },
  { key: 'freeRevisionCount', label: '무료 수정 횟수' },
  { key: 'finalCutCount', label: '최종 결과물 제공 장수' },
  { key: 'addCount', label: '장수 추가 가능 여부' },
  { key: 'finalDeliveryTime', label: '최종 결과물 전달 소요시간' },
] as const;

export default function ProductDetailSection({ productInfo }: ProductDetailSectionProps) {
  const requiredInfoList = [
    { label: '최대 촬영 인원', content: productInfo?.maxPeople },
    { label: '촬영 작가 인원', content: productInfo?.photographerCount },
    { label: '촬영 시간', content: productInfo?.durationTime },
  ];
  
  const optionalInfoList = OPTIONAL_INFO_CONFIG
    .filter(({ key }) => productInfo?.[key] !== null)
    .map(({ key, label }) => (
      { label: label, content: productInfo?.[key], isPaid: productInfo?.paidOptions.includes(key) }
    ));

  return (
    <section className='bg-black-1 mb-[7.6rem] flex flex-col gap-[3.2rem] p-[2rem]'>
      {/* 상품 정보 */}
      <div className='flex flex-col gap-[0.6rem]'>
        <span className='caption-12-rg text-black-7'>상품 정보</span>
        <div className='flex flex-col gap-[0.8rem] p-[1.6rem] border-1 border-black-4 rounded-[0.6rem]'>
          {/* 필수 - 최대 촬영 인원, 촬영 작가 인원, 촬영 시간 */}
          <div className='flex gap-[0.4rem]'>
            {
              requiredInfoList.map((info) => (
                <div key={info.label} className='bg-black-3 flex flex-col gap-[1rem] w-full p-[1rem] rounded-[0.4rem]'>
                  <span className='caption-10-md text-black-7'>{info.label}</span>
                  <span className='caption-14-md text-black-10'>{info.content}</span>
                </div>
              ))
            }
          </div>
          {/* 선택 - RAW 파일 ~ 최종 결과물 전달 소요시간 */}
          {
            optionalInfoList.length > 0 && optionalInfoList.map((info) => (
              <Fragment key={info.label}>
                <Divider thickness='small' />
                <div className='flex justify-between items-center'>
                  <span className='caption-11-md text-black-8'>{info.label}</span>
                  <div className='flex gap-[0.6rem] items-center'>
                    <span className='caption-12-rg text-black-10'>{info.content}</span>
                    { info.isPaid && <TagChip variant='gray' label='유료' /> }
                  </div>
                </div>
              </Fragment>
            ))
          }
        </div>
      </div>
      {/* 상품 소개 */}
      {
        productInfo?.description && (
          <div className='flex flex-col gap-[0.6rem]'>
            <span className='caption-12-md text-black-7'>상품 소개</span>
            <p className='caption-14-rg text-black-10 whitespace-pre-line'>{productInfo.description}</p>
          </div>
        )
      }
    </section>
  );
}
