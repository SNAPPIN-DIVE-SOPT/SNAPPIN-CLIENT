import { TimeButton } from './TimeButton';
import type { TimeButtonState } from './constants/buttonState';

export type TimeSlot = {
  time: string;
  state: TimeButtonState;
};

export type TimeSlotSection = {
  label: string;
  slots: TimeSlot[];
};

type TimePickerProps = {
  sections: TimeSlotSection[];
  value: string;
  handleChange?: (time: string) => void;
};

export const TimePicker = ({ sections, value, handleChange }: TimePickerProps) => {
  const handleSelect = (time: string) => {
    handleChange?.(time);
  };

  const getState = (time: string, state: TimeButtonState): TimeButtonState =>
    state === 'disabled' ? 'disabled' : value === time ? 'selected' : state;

  return (
    <div className='bg-black-1 p-[1.25rem]'>
      {sections.map((section) => (
        <section key={section.label} className='mb-[1.5rem] last:mb-[0.5rem]'>
          <p className='caption-12-md text-black-8 mb-[0.25rem]'>{section.label}</p>

          <div className='grid grid-cols-4 gap-[0.5rem]'>
            {section.slots.map(({ time, state }) => (
              <TimeButton
                key={time}
                time={time}
                state={getState(time, state)}
                handleClick={handleSelect}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
