'use client';

import { FilterChip } from '@snappin/design-system';
import { useMoodFilters } from '@/app/(with-layout)/explore/api';
import { GetMoodFilterResponse } from '@/swagger-api';

const MAX_VISIBLE_MOODS = 6;

type MoodFilterProps = {
  selectedMoodIds: number[];
  onToggleMoodAction: (moodId: number) => void;
};

export default function MoodFilter({ selectedMoodIds, onToggleMoodAction }: MoodFilterProps) {
  const { data } = useMoodFilters();
  const moods = (data?.moods ?? [])
    .filter((mood): mood is GetMoodFilterResponse & { id: number } => typeof mood.id === 'number')
    .slice(0, MAX_VISIBLE_MOODS);

  return (
    <div className='py-[1.5rem]'>
      <span className='font-16-md text-black-10'>무드 선택</span>
      <div className='mt-[1rem] grid grid-cols-3 gap-x-[0.6rem] gap-y-[1rem]'>
        {moods.map((mood) => (
          <FilterChip
            key={mood.id}
            label={mood.name ?? ''}
            isSelected={selectedMoodIds.includes(mood.id)}
            onClick={() => onToggleMoodAction(mood.id)}
          />
        ))}
      </div>
    </div>
  );
}
