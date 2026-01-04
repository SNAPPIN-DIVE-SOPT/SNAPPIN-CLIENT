import { Meta, StoryObj } from '@storybook/react';
import DatePicker from '@/ui/date/picker/DatePicker';
import { useState } from 'react';
import { JANUARY_AVAILABILITY_MOCK } from '@/ui/date/picker/constants/date';
import { toISO } from '@/ui/date/picker/utils/date';

const meta: Meta<typeof DatePicker> = {
  title: 'date/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    handleDateChange: { action: 'change' },
  },
};

export default meta;

function ControlledTemplate(args: React.ComponentProps<typeof DatePicker>) {
  const [viewMonth, setViewMonth] = useState<Date>(new Date());
  const [value, setValue] = useState<string | undefined>(
    () => args.selectedDate ?? (args.viewDateMonth ? toISO(args.viewDateMonth) : undefined),
  );

  return (
    <div className='bg-white p-[1.6rem]'>
      <DatePicker
        {...args}
        selectedDate={value}
        viewDateMonth={viewMonth}
        handleMonthChange={setViewMonth}
        handleDateChange={(next) => {
          setValue(next);
          args.handleDateChange?.(next); // action도 같이 찍히게
        }}
      />
      <div className='text-black-7 caption-12-md mt-[1.2rem]'>selected: {value}</div>
    </div>
  );
}

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: (args) => <ControlledTemplate monthAvailability={JANUARY_AVAILABILITY_MOCK} {...args} />,
};

export const DisablePastDates: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    // 오늘 기준 과거 비활성화 동작 확인용
    disablePastDates: true,
  },
};

export const MinMaxRange: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    selectedDate: '2025-12-18',
    disablePastDates: false,
    minDate: '2025-12-10',
    maxDate: '2025-12-24',
  },
};

export const MinOnly: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    viewDateMonth: new Date('2025-12-01'),
    selectedDate: '2025-12-18',
    disablePastDates: false,
    minDate: '2025-12-15',
  },
};

export const MaxOnly: Story = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    viewDateMonth: new Date('2025-12-18'),
    selectedDate: '2025-12-19',
    disablePastDates: false,
    maxDate: '2025-12-20',
  },
};
