import { cn } from '@/utils/cn';
import { TabType } from './types/tabType';
import { TOGGLE_THEME_BY_TAB } from './constants/toggleTheme';

type ToggleProps = {
  tab: TabType;
  className?: string;
  handleOnClick: () => void;
} & React.HTMLAttributes<HTMLButtonElement>;

export default function Toggle({
  tab,
  className,
  handleOnClick,
  ...props
}: ToggleProps) {
  const { trackClassName, thumbClassName, labelClassName, label } = TOGGLE_THEME_BY_TAB[tab];

  return (
    <button
      type='button'
      className={cn('flex justify-center items-center w-[7.7rem] h-[3.2rem]', className)}
      onClick={handleOnClick}
      {...props}
    >
      <div className={cn(
        'flex flex-col shrink-0 gap-[1rem] w-[7.7rem] h-[3.2rem] p-[0.3rem] rounded-[2.4rem] transition-[transform_background-color] duration-500 ease-in-out',
        trackClassName
      )}>
        <div className={cn(
          'flex shrink-0 justify-center items-center gap-[1rem] w-[4.4rem] h-[2.5rem] px-[1.3rem] py-[0.8rem] rounded-[1.9rem] transition-[transform_background-color] duration-500 ease-in-out',
          thumbClassName
        )}>
          <span className={cn('caption-12-md transition-[color] duration-500 ease-in-out', labelClassName)}>
            {label}
          </span>
        </div>
      </div>
    </button>
  );
}