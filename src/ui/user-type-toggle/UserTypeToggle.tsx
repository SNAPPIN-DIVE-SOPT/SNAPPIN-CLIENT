import { cn } from '@/utils/cn';
import { USER_TYPE_LABEL, USER_TYPE, UserType } from '@/auth/constant/userType';
import { TOGGLE_THEME_BY_TYPE } from './constants/toggleTheme';

export type UserTypeToggleProps = {
  selectedType: UserType | null;
  className?: string;
  onClick: () => void;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export default function UserTypeToggle({
  selectedType,
  className,
  onClick,
  ...props
}: UserTypeToggleProps) {
  console.log('selectedType', selectedType);
  if (!selectedType) return null;
  const { trackClassName, thumbClassName, labelClassName } = TOGGLE_THEME_BY_TYPE[selectedType];

  return (
    <button
      type='button'
      className={cn('flex h-[3.2rem] w-[7.7rem] items-center justify-center', className)}
      onClick={onClick}
      {...props}
    >
      <div
        className={cn(
          'flex h-[3.2rem] w-[7.7rem] shrink-0 flex-col rounded-[2.4rem] p-[0.3rem] transition-[transform_background-color] duration-500 ease-in-out',
          trackClassName,
        )}
      >
        <div
          className={cn(
            'flex h-[2.5rem] w-[4.4rem] shrink-0 items-center justify-center rounded-[1.9rem] px-[1.3rem] py-[0.8rem] transition-[transform_background-color] duration-500 ease-in-out',
            thumbClassName,
          )}
        >
          {Object.values(USER_TYPE).map((type) => (
            <span
              key={type}
              className={cn(
                'caption-12-md absolute transition-opacity duration-300 ease-in-out',
                selectedType === type ? 'opacity-100' : 'opacity-0',
                labelClassName,
              )}
            >
              {USER_TYPE_LABEL[type]}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
