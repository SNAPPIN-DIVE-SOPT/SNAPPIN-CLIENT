import TimeButton from './TimeButton';
import type { TimeButtonState } from './constants/buttonState';
import { ProductAvailableTimeSectionResponse } from '@/swagger-api/data-contracts';

export type TimeSlot = {
  time: string;
  isAvailable: boolean;
};

export type TimeSlotSection = {
  label: string;
  slots: TimeSlot[];
};

type TimePickerProps = {
  sections: ProductAvailableTimeSectionResponse[];
  value?: string;
  handleChange?: (time: string) => void;
};

export default function TimePicker({ sections, value, handleChange }: TimePickerProps) {
  const handleSelect = (time: string) => {
    handleChange?.(time);
  };

  const getState = (time: string): TimeButtonState => (value === time ? 'selected' : 'default');

  return (
    <div className='bg-black-1 flex flex-col gap-[1.2rem]'>
      {sections.map((section) => (
        <section key={section.label} className='flex flex-col gap-[0.8rem]'>
          <p className='caption-12-md text-black-8'>{section.label === 'am' ? '오전' : '오후'}</p>

          <div className='grid grid-cols-4 gap-[0.8rem]'>
            {section.slots?.map(({ time, isAvailable }) => (
              <TimeButton
                key={time}
                time={time ?? ''}
                state={getState(time ?? '')}
                isAvailable={isAvailable}
                onClick={() => handleSelect(time ?? '')}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
