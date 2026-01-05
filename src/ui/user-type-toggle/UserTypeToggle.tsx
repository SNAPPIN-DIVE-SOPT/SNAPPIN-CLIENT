import { cn } from '@/utils/cn';
import { UserType } from './types/userType';
import { TOGGLE_THEME_BY_TYPE } from './constants/toggleTheme';

export type UserTypeToggleProps = {
  selectedType: UserType;
  className?: string;
  onClick: () => void;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'>;

export default function UserTypeToggle({
  selectedType,
  className,
  onClick,
  ...props
}: UserTypeToggleProps) {
  const { trackClassName, thumbClassName, labelClassName, label } = TOGGLE_THEME_BY_TYPE[selectedType];

  return (
    <button
      type='button'
      className={cn('flex justify-center items-center w-[7.7rem] h-[3.2rem]', className)}
      onClick={onClick}
      {...props}
    >
      <div className={cn(
        'flex flex-col shrink-0 w-[7.7rem] h-[3.2rem] p-[0.3rem] rounded-[2.4rem] transition-[transform_background-color] duration-500 ease-in-out',
        trackClassName
      )}>
        <div className={cn(
          'flex shrink-0 justify-center items-center w-[4.4rem] h-[2.5rem] px-[1.3rem] py-[0.8rem] rounded-[1.9rem] transition-[transform_background-color] duration-500 ease-in-out',
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