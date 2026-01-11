import TimeButton from './TimeButton';
import type { TimeButtonState } from './constants/buttonState';

export type TimeSlot = {
  time: string;
  disabled: boolean;
};

export type TimeSlotSection = {
  label: string;
  slots: TimeSlot[];
};

type TimePickerProps = {
  sections: TimeSlotSection[];
  value?: string;
  handleChange?: (time: string) => void;
};

export default function TimePicker({ sections, value, handleChange }: TimePickerProps) {
  const handleSelect = (time: string) => {
    handleChange?.(time);
  };

  const getState = (time: string): TimeButtonState => (value === time ? 'selected' : 'default');

  return (
    <div className='bg-black-1'>
      {sections.map((section) => (
        <section key={section.label} className='mb-[1.5rem] last:mb-[0.5rem]'>
          <p className='caption-12-md text-black-8 mb-[0.25rem]'>{section.label}</p>

          <div className='grid grid-cols-4 gap-[0.5rem]'>
            {section.slots.map(({ time, disabled }) => (
              <TimeButton
                key={time}
                time={time}
                state={getState(time)}
                disabled={disabled}
                onClick={() => handleSelect(time)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
