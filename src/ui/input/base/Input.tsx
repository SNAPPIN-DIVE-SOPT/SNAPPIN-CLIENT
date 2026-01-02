import { cn } from '@/utils/cn';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export default function Input({ hasError, className, ...rest }: InputProps) {
  return (
    <input
      className={cn(
        'bg-black-1 border-black-5 caption-14-rg placeholder:text-black-6 focus:border-black-10 w-full rounded-[0.6rem] border px-[1.2rem] py-[1.1rem]',
        hasError && 'border-red-500 focus:border-red-500 focus:ring-red-200',
        className,
      )}
      {...rest}
    />
  );
}
