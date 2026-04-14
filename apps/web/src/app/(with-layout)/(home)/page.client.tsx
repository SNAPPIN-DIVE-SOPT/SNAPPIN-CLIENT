'use client';

import Image from 'next/image';
import { FilterChip } from '@snappin/design-system';
import { MOOD_CODE, MOOD_CODE_INDEX } from '@snappin/shared/types';
import { useNavVisibility } from '@/hooks/useNavVisibility';
import { ProductInformationFrameList, ProductInformationFrameListSkeleton } from '@/ui';
import { useGetMoodIdList } from '@/queries/mood';
import { useSelectedMoodCode } from '@/app/(with-layout)/(home)/hooks/useSelectedMoodCode';
import { ClientHeader, AiCurationButton } from '@/app/(with-layout)/(home)/components';
import { useGetPopularProducts } from '@/app/(with-layout)/(home)/api';

import Banner from '../../../../public/imgs/image-home-banner.png';

const MOOD_ID_PENDING = -1;

export default function PageClient() {
  const { isVisible } = useNavVisibility();
  const { data: moods = [] } = useGetMoodIdList();
  const initialMoodId =
    moods.find((mood) => mood.name === MOOD_CODE[MOOD_CODE_INDEX.따스한])?.id || MOOD_ID_PENDING;
  const { selectedMoodCodeId, toggleMoodCode } = useSelectedMoodCode(initialMoodId);

  const { data, isPending } = useGetPopularProducts(selectedMoodCodeId);

  return (
    <div className='relative flex w-full flex-col'>
      <ClientHeader isVisible={isVisible} />
      <div>
        {/*  배너 영역 */}
        <section className='relative w-full'>
          <Image src={Banner} alt='home-banner' priority />
          <div className='absolute bottom-[3rem] left-[2rem]'>
            <AiCurationButton />
          </div>
        </section>

        {/*  포폴 추천 영역 */}
        <section className='flex w-full flex-col items-start gap-[0.4rem] pt-[3rem]'>
          <h2 className='font-16-bd px-[2rem]'>인기 무드의 사진을 빠르게 검색</h2>
          <div className='w-full'>
            <div className='scrollbar-hide min-h-[5.6rem] w-full overflow-x-auto'>
              <div className='flex gap-[0.4rem] px-[2rem] py-[1.2rem]'>
                {moods.map((mood) => {
                  return (
                    <FilterChip
                      key={mood.id}
                      label={mood.name || ''}
                      isSelected={selectedMoodCodeId === mood.id}
                      onClick={() => toggleMoodCode(mood.id ?? MOOD_ID_PENDING)}
                    />
                  );
                })}
                <div className='w-[2rem] shrink-0' />
              </div>
            </div>
            {isPending ? (
              <ProductInformationFrameListSkeleton />
            ) : (data?.length ?? 0) === 0 ? (
              <div className='flex flex-col items-center justify-center gap-[0.4rem] py-[12rem]'>
                <p className='font-18-bd text-black-9'>상품을 준비 중입니다</p>
                <span className='caption-14-md text-black-6'>다른 무드를 선택해 보세요</span>
              </div>
            ) : (
              <ProductInformationFrameList products={data || []} />
            )}
          </div>
        </section>
        {/*  무드 큐레이션 영역 */}
        <section className='flex w-full flex-col items-start gap-[3.2rem] px-[2rem] pt-[3.9rem] pb-[3.3rem]'>
          <h1 className='title-24-md'>
            1분만에
            <br />내 무드에 딱 맞는
            <br />
            스냅작가 발견
          </h1>
          <AiCurationButton />
        </section>
      </div>
    </div>
  );
}
