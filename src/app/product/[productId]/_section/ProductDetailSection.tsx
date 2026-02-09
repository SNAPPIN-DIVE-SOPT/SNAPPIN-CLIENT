import { TagChip, Divider } from '@/ui';

type ProductDetailSectionProps = {
  productInfo: {
    snapCategory: string;
    regions: string[];
    moods: string[];
    maxPeople: string;
    photographerCount: string;
    durationTime: string;
    provideRaw?: string;
    provideOriginalJpg?: string;
    originalJpgCount?: string;
    originalDeliveryTime?: string;
    provideVideo?: string;
    freeRevisionCount?: string;
    finalCutCount?: string;
    finalDeliveryTime?: string;
    description?: string;
    processDescription?: string;
    equipment?: string;
    caution?: string;
  };
};

type Detail = {
  label: string;
  content?: string;
};

function removeEmptyDetail(items: Detail[]) {
  return items.filter((item): item is { label: string; content: string } => item.content !== null);
}

export default function ProductDetailSection({ productInfo }: ProductDetailSectionProps) {
  const optionalDetailList = removeEmptyDetail([
    { label: 'RAW 파일 제공 여부', content: productInfo.provideRaw },
    { label: '원본 JPG 제공 여부', content: productInfo.provideOriginalJpg },
    { label: '원본 JPG 제공 장수', content: productInfo.originalJpgCount },
    { label: '원본 제공 시점', content: productInfo.originalDeliveryTime },
    { label: '동영상 제공 여부', content: productInfo.provideVideo },
    { label: '무료 수정 횟수', content: productInfo.freeRevisionCount },
    { label: '최종 결과물 제공 장수', content: productInfo.finalCutCount },
    { label: '최종 결과물 전달 소요시간', content: productInfo.finalDeliveryTime },
  ]);

  return (
    <section className='bg-black-1 mb-[7.4rem] flex flex-col gap-[3.2rem] p-[2rem]'>
      <div className='flex flex-col gap-[1.2rem]'>
        {/* 첫번째 박스 - 촬영 종류, 촬영 장소, 스냅 무드 */}
        <div className='border-black-4 flex flex-col gap-[1.2rem] rounded-[0.6rem] border-1 p-[1.6rem]'>
          <div className='flex gap-[1rem]'>
            <span className='caption-12-md text-black-7 w-[8rem]'>촬영 종류</span>
            <span className='caption-12-md text-black-10'>{productInfo.snapCategory}</span>
          </div>
          <div className='flex gap-[1rem]'>
            <span className='caption-12-md text-black-7 w-[8rem]'>촬영 장소</span>
            <span className='caption-12-md text-black-10'>{productInfo.regions.join(', ')}</span>
          </div>
          <div className='flex items-center gap-[1rem]'>
            <span className='caption-12-md text-black-7 w-[8rem]'>스냅 무드</span>
            <div className='flex items-center gap-[0.4rem]'>
              {productInfo.moods.map((mood) => (
                <TagChip key={mood} variant='neon' label={mood} />
              ))}
            </div>
          </div>
        </div>
        {/* 두번째 박스 - 최대 촬영 인원 ~ 최종 결과물 전달 소요시간 */}
        <div className='border-black-4 flex flex-col gap-[1rem] rounded-[0.6rem] border-1 p-[2rem]'>
          <div className='flex flex-col gap-[1.2rem]'>
            <DetailLayout
              detailList={[
                { label: '최대 촬영 인원', content: `${productInfo.maxPeople}` },
                { label: '촬영 작가 인원', content: `${productInfo.photographerCount}` },
                { label: '촬영 시간', content: `${productInfo.durationTime}` },
              ]}
            />
            {optionalDetailList.length > 0 && (
              <>
                <Divider thickness='small' color='bg-black-5' className='w-full' />
                <DetailLayout detailList={optionalDetailList} />
              </>
            )}
          </div>
        </div>
      </div>
      <DetailParagraph label='상품 소개' content={productInfo.description ?? '-'} />
      <DetailParagraph label='촬영 진행 순서' content={productInfo.processDescription ?? '-'} />
      <DetailParagraph label='사용장비' content={productInfo.equipment ?? '-'} />
      <DetailParagraph label='기타 주의 사항' content={productInfo.caution ?? '-'} />
    </section>
  );
}

function DetailLayout({ detailList }: { detailList: Detail[] }) {
  return (
    <div className='flex flex-col gap-[0.8rem]'>
      {detailList.map((detail) => (
        <div key={detail.label} className='flex gap-[4rem]'>
          <span className='caption-12-md text-black-7 w-[12.2rem]'>{detail.label}</span>
          <span className='caption-12-md text-black-10'>{detail.content}</span>
        </div>
      ))}
    </div>
  );
}

function DetailParagraph({ label, content }: { label: string; content: string }) {
  return (
    <div className='flex flex-col gap-[0.6rem]'>
      <span className='caption-12-md text-black-7'>{label}</span>
      <p className='caption-14-rg text-black-10 whitespace-pre-line'>{content}</p>
    </div>
  );
}
