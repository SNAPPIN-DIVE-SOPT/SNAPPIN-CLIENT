'use client';

import { IconButton } from '@/ui';
import { cn } from '@/utils/cn';
import { IconAdd, IconRemove } from '@/assets';

type ButtonAddMinusProps = {
  value: string | number;
  handleClickMinus: () => void;
  handleClickAdd: () => void;
  isDisabledMinus?: boolean;
  isDisabledAdd?: boolean;
  className?: string;
};

export default function Stepper({
  value,
  handleClickMinus,
  handleClickAdd,
  isDisabledMinus,
  isDisabledAdd,
  className,
}: ButtonAddMinusProps) {
  return (
    <div
      className={cn(
        'bg-black-3 flex h-[3.6rem] w-fit items-center gap-[1rem] rounded-[0.4rem] px-[0.8rem] py-[0.3rem]',
        className,
      )}
    >
      <IconButton
        disabled={isDisabledMinus}
        onClick={isDisabledMinus ? undefined : handleClickMinus}
      >
        <IconRemove />
      </IconButton>
      <span className='bg-black-1 font-16-md flex h-[3rem] items-center justify-center px-[1.8rem] py-[0.2rem] text-center'>
        {value}
      </span>
      <IconButton disabled={isDisabledAdd} onClick={isDisabledAdd ? undefined : handleClickAdd}>
        <IconAdd />
      </IconButton>
    </div>
  );
}
