import { cn } from '@/utils/cn';

type FieldMessageProps = {
  id: string;
  message?: string;
  variant?: 'help' | 'error';
};

export default function FieldMessage({ id, message, variant = 'help' }: FieldMessageProps) {
  if (!message) return null;

  const messageTheme = {
    help: 'text-black-7',
    error: 'text-red-500',
  } as const;

  const role = variant === 'error' ? 'alert' : undefined;

  return (
    <p className={cn('caption-12-md mt-2', messageTheme[variant])} id={id} role={role}>
      {message}
    </p>
  );
}
