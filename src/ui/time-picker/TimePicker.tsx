import { TimeButton } from './TimeButton';
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
  value: string | null;
  onChange?: (time: string) => void;
};

export const TimePicker = ({ sections, value, onChange }: TimePickerProps) => {
  const handleSelect = (time: string) => {
    onChange?.(time);
  };

  const getState = (time: string, disabled: boolean): TimeButtonState =>
    disabled ? 'disabled' : value === time ? 'selected' : 'default';

  return (
    <div className='bg-black-1 p-5'>
      {sections.map((section) => (
        <section key={section.label} className='mb-6 last:mb-2'>
          <p className='caption-12-md text-black-8 mb-1'>{section.label}</p>

          <div className='grid grid-cols-4 gap-[0.5rem]'>
            {section.slots.map(({ time, disabled }) => (
              <TimeButton
                key={time}
                time={time}
                state={getState(time, disabled)}
                onClick={handleSelect}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
