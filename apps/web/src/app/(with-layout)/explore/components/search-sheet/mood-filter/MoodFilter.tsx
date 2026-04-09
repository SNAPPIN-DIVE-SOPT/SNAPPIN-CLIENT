'use client';

import { FilterChip } from '@snappin/design-system';
import { GetMoodFilterResponse } from '@/swagger-api';
import { useGetMoodIdList } from '@/queries/mood';

const MAX_VISIBLE_MOODS = 6;

type MoodFilterProps = {
  selectedMoodIds: number[];
  onToggleMoodAction: (moodId: number) => void;
};

export default function MoodFilter({ selectedMoodIds, onToggleMoodAction }: MoodFilterProps) {
  const { data = [] } = useGetMoodIdList();
  const moods = data
    .filter((mood): mood is GetMoodFilterResponse & { id: number } => typeof mood.id === 'number')
    .slice(0, MAX_VISIBLE_MOODS);

  return (
    <div className='grid grid-cols-3 gap-x-[0.6rem] gap-y-[1rem]'>
      {moods.map((mood) => (
        <FilterChip
          key={mood.id}
          label={mood.name ?? ''}
          isSelected={selectedMoodIds.includes(mood.id)}
          onClick={() => onToggleMoodAction(mood.id)}
          className='w-full'
        />
      ))}
    </div>
  );
}
