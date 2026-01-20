import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, FilterChip } from '@/ui';
import { MoodCategoryLabel, MoodCode } from '@/types/moodCode';
import { GetMoodFilterResponse } from '@/swagger-api/data-contracts';

type ExploreFilterPanelProps = {
  moodList?: GetMoodFilterResponse[];
  selectedMoodIds: number[];
  handlePanelClose: () => void;
};

const CATEGORIES: MoodCategoryLabel[] = ['분위기', '스타일', '장면구성']

export default function ExploreFilterPanel({
  moodList,
  selectedMoodIds,
  handlePanelClose,
}: ExploreFilterPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [draftMoodIds, setDraftMoodIds] = useState<number[]>(() => selectedMoodIds);

  const toggleMood = (moodId: number) => {
    setDraftMoodIds((prev) =>
      prev.includes(moodId) ? prev.filter((value) => value !== moodId) : [...prev, moodId],
    );
  };

  const handleFilterApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (draftMoodIds.length === 0) {
      params.delete('moodIds');
    } else {
      params.set('moodIds', draftMoodIds.join(','));
    }

    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname);
    handlePanelClose();
  };

  return (
    <section aria-label='무드 필터' className='border-black-3 relative z-100 border-[0.1rem]'>
      <div className='px-[2rem] py-[1.2rem]'>
        <h2 className='sr-only'>무드 필터</h2>

        <div className='flex flex-col gap-[0.7rem]'>
          {CATEGORIES.map((category) => {
            const moodsInCategory = moodList?.filter((m) => m.category === category);
            return (
              <div key={category} className='grid grid-cols-[5rem_1fr] items-start gap-x-[0.8rem]'>
                <span className='caption-12-md text-black-9 py-[0.6rem] whitespace-nowrap'>
                  {category}
                </span>

                <div className='flex flex-wrap gap-[0.8rem]'>
                  {moodsInCategory?.map((mood) => (
                    <FilterChip
                      key={mood.id}
                      label={mood.name as MoodCode}
                      isSelected={draftMoodIds.includes(mood.id ?? 0)}
                      onClick={() => toggleMood(mood.id ?? 0)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        color='transparent'
        size='medium'
        className='ml-auto h-[4.2rem] w-fit border-0 px-[2rem]'
        onClick={handleFilterApply}
      >
        완료
      </Button>
    </section>
  );
}
