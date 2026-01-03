'use client';

import { IconAdd, IconRemove } from '@/assets';
import { cn } from '@/utils/cn';

type ButtonAddMinusProps = {
  value: string | number;
  handleClickMinus: () => void;
  handleClickAdd: () => void;
  isDisabledMinus?: boolean;
  isDisabledAdd?: boolean;
  className?: string;
};

export default function ButtonAddMinus({
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
      <IconRemove
        aria-disabled={isDisabledMinus}
        onClick={isDisabledMinus ? undefined : handleClickMinus}
        className={cn('cursor-pointer', isDisabledMinus && 'cursor-not-allowed')}
      />
      <span className='bg-black-1 font-16-md flex h-[3rem] items-center justify-center px-[1.8rem] py-[0.2rem] text-center'>
        {value}
      </span>
      <IconAdd
        aria-disabled={isDisabledAdd}
        onClick={isDisabledAdd ? undefined : handleClickAdd}
        className={cn('cursor-pointer', isDisabledAdd && 'cursor-not-allowed')}
      />
    </div>
  );
}
