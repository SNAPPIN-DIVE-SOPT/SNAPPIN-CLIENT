import React from 'react';

type MoodChipProps = {
  iconLayout: 'left' | 'right';
  icon: React.ReactNode;
  mood: string;
};

export default function MoodChip({ iconLayout, icon, mood }: MoodChipProps) {
  return (
    <div className='bg-black-10 flex h-[9.6rem] w-[30rem] items-center justify-center gap-[1rem] rounded-[15.6rem]'>
      {iconLayout === 'left' && icon}
      <div className='title-30-eb text-neon-black'>{mood}</div>
      {iconLayout === 'right' && icon}
    </div>
  );
}
