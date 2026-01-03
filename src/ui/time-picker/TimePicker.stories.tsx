import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { TimePicker } from './TimePicker';
import { MOCK_TIME_SLOTS } from './constants/mockTimeSlots';

const meta: Meta<typeof TimePicker> = {
  title: 'UI/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    sections: MOCK_TIME_SLOTS,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const TimePickerTemplate = (args: React.ComponentProps<typeof TimePicker>) => {
  const [selectedTime, setSelectedTime] = useState<string | undefined>(args.value);

  return <TimePicker {...args} value={selectedTime} handleChange={setSelectedTime} />;
};

export const Default: Story = {
  render: (args) => <TimePickerTemplate {...args} />,
};
