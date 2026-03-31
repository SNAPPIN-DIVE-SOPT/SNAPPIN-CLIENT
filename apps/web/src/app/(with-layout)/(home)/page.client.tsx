'use client';

import { MOOD_CODE } from '@snappin/shared/types';
import { FilterChip } from '@snappin/design-system';
import { useNavVisibility } from '@/hooks/useNavVisibility';
import { useSelectedMoodCode } from '@/app/(with-layout)/(home)/hooks/useSelectedMoodCode';
import { ProductInformationFrameList } from '@/ui';
import { ClientHeader, AiCurationButton } from './components';
import { MOCK } from './mock/mock';

export default function PageClient() {
  const { isVisible } = useNavVisibility();
  const { isSelectedMoodCode, toggleMoodCode } = useSelectedMoodCode();

  return (
    <div className='relative flex w-full flex-col'>
      <ClientHeader isVisible={isVisible} />
      <div>
        {/*  배너 영역 */}
        {/*  포폴 추천 영역 */}
        <section className='flex w-full flex-col items-start gap-[0.4rem] pt-[3rem]'>
          <h2 className='font-16-bd px-[2rem]'>인기 무드의 사진을 빠르게 검색</h2>
          <div className='w-full'>
            <div className='scrollbar-hide w-full overflow-x-auto'>
              <div className='flex gap-[0.4rem] px-[2rem] py-[1.2rem]'>
                {MOOD_CODE.map((mood) => (
                  <FilterChip
                    key={mood}
                    label={mood}
                    isSelected={isSelectedMoodCode(mood)}
                    onClick={toggleMoodCode}
                  />
                ))}
                <div className='w-[2rem] shrink-0' />
              </div>
            </div>
            <ProductInformationFrameList products={MOCK} />
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
