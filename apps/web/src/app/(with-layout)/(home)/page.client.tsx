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

export default function PageClient() {
  const { isVisible } = useNavVisibility();
  const { data: moods = [] } = useGetMoodIdList();
  const initialMoodId =
    moods.find((mood) => mood.name === MOOD_CODE[MOOD_CODE_INDEX.따스한])?.id || 0;
  const { selectedMoodCodeId, toggleMoodCode } = useSelectedMoodCode(initialMoodId);

  const { data, isPending } = useGetPopularProducts(
    selectedMoodCodeId && selectedMoodCodeId > 0 ? String(selectedMoodCodeId) : undefined,
  );

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
                      onClick={() => toggleMoodCode(mood.id)}
                    />
                  );
                })}
                <div className='w-[2rem] shrink-0' />
              </div>
            </div>
            {isPending ? (
              <ProductInformationFrameListSkeleton />
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
