import { Stepper, UserTypeToggle } from '@/ui';
import ControlRow from '@/ui/control-row/ControlRow';
import { useState } from 'react';
import { UserType } from '@/auth/constant/userType';

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
        leftLabel={<span className='caption-14-md'>촬영 인원</span>}
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

function ControlRowExample2() {
  const [type, setType] = useState<UserType>('CLIENT');

  const handleToggle = () => {
    setType((prev) => (prev === 'CLIENT' ? 'PHOTOGRAPHER' : 'CLIENT'));
  };

  return (
    <div className='w-[320px] border p-4'>
      <ControlRow
        centered={true}
        leftLabel={<span className='caption-14-md'>고객 계정으로 전환하기</span>}
        rightControl={<UserTypeToggle selectedType={type} onClick={handleToggle} />}
      />
    </div>
  );
}

export const WithStepper = {
  render: () => <ControlRowExample />,
};

export const WithToggle = {
  render: () => <ControlRowExample2 />,
};
