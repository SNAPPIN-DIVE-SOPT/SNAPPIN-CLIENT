import { cn } from '../../../lib/cn';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export default function Input({ hasError, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'bg-black-1 caption-14-md placeholder:text-black-6 border-black-10 w-full border-b border-black px-[0.7rem] py-[1.2rem]',
        hasError && 'border-red-500 focus:border-red-500 focus:ring-red-200',
        className,
      )}
      {...props}
    />
  );
}
