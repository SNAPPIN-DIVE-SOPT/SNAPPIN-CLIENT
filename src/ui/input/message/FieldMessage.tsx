import { cn } from '@/utils/cn';
import Image from 'next/image';

type FieldMessageProps = {
  id: string;
  message?: string;
  variant?: 'help' | 'error' | 'success';
  showIcon?: boolean;
};

export default function FieldMessage({
  id,
  message,
  variant = 'help',
  showIcon,
}: FieldMessageProps) {
  if (!message) return null;

  const messageTheme = {
    help: 'text-black-6',
    error: 'text-red-error',
    success: 'text-green-success',
  } as const;

  const role = variant === 'error' ? 'alert' : undefined;

  const iconMap = {
    help: null,
    error: '/src/assets/svg-fill/icon-error.svg',
    success: '/src/assets/svg-fill/icon-success.svg',
  };

  return (
    <div className='flex min-h-[2.4rem] flex-row items-center'>
      {showIcon && variant !== 'help' && (
        <Image width={24} height={24} src={iconMap[variant]} alt={`${variant} icon`} />
      )}
      <p className={cn('caption-10-md', messageTheme[variant])} id={id} role={role}>
        {message}
      </p>
    </div>
  );
}
