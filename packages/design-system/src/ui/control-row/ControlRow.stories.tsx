import { Stepper } from '@/ui';
import ControlRow from './ControlRow';
import { useState } from 'react';

const meta = {
  title: 'layout/ControlRow',
  component: ControlRow,
  tags: ['autodocs'],
};

export default meta;

function ControlRowExample() {
  const MAX = 10;
  const MIN = 1;

  const [value, setValue] = useState(3);

  const handleMinus = () => {
    if (value <= MIN) return;
    setValue((prev) => prev - 1);
  };
  const handleAdd = () => {
    setValue((prev) => prev + 1);
  };

  return (
    <div className='w-[320px] border p-4'>
      <ControlRow
        leftLabel={<span className='caption-14-md'>ÃÔ¿µ ÀÎ¿ø</span>}
        rightControl={
          <Stepper
            value={value}
            handleClickAdd={handleAdd}
            handleClickMinus={handleMinus}
            isDisabledAdd={value === MAX}
            isDisabledMinus={value === MIN}
          />
        }
      />
    </div>
  );
}

export const WithStepper = {
  render: () => <ControlRowExample />,
};
