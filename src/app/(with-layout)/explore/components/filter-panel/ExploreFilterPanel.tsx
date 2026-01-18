import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, FilterChip } from '@/ui';
import { Mood, MOOD_CATEGORY_MAP, MoodCategory, MoodCode } from '@/types/moodCode';

type ExploreFilterPanelProps = {
  moodList: Mood[];
  selectedMoodIds: number[];
  handlePanelClose: () => void;
};

const groupByCategory = (moods: Mood[]) => {
  return moods.reduce<Record<MoodCategory, Mood[]>>(
    (acc, mood) => {
      acc[mood.category].push(mood);
      return acc;
    },
    {
      ATMOSPHERE: [],
      STYLE: [],
      COMPOSITION: [],
    },
  );
};

export default function ExploreFilterPanel({
  moodList,
  selectedMoodIds,
  handlePanelClose,
}: ExploreFilterPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [draftMoodIds, setDraftMoodIds] = useState<number[]>(() => selectedMoodIds);
  const groupedMoods = groupByCategory(moodList);

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
    <section
      aria-label='무드 필터'
      className='border-black-3 relative z-100 border-[0.1rem] px-[2rem] py-[1.2rem]'
    >
      <h2 className='sr-only'>무드 필터</h2>

      <div className='flex flex-col gap-[0.7rem]'>
        {(Object.keys(groupedMoods) as MoodCategory[]).map((category) => (
          <div key={category} className='grid grid-cols-[5rem_1fr] items-start gap-x-[0.8rem]'>
            {/* 카테고리 Label */}
            <span className='caption-12-md text-black-9 py-[0.6rem] whitespace-nowrap'>
              {MOOD_CATEGORY_MAP[category]}
            </span>
            {/* 칩 목록 */}
            <div className='flex flex-wrap gap-[0.8rem]'>
              {groupedMoods[category].map((mood) => (
                <FilterChip
                  key={`${mood.id}-${mood.name}`}
                  label={mood.name as MoodCode}
                  isSelected={draftMoodIds.includes(mood.id)}
                  onClick={() => toggleMood(mood.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button
        color='transparent'
        size='medium'
        className='ml-auto w-fit border-0 px-[2rem]'
        onClick={handleFilterApply}
      >
        완료
      </Button>
    </section>
  );
}
