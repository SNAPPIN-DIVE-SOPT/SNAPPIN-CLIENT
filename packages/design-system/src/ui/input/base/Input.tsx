import { cn } from '../../../lib/cn';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  hasBorder?: boolean;
};

export default function Input({ hasError, hasBorder = true, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'bg-black-1 caption-14-md placeholder:text-black-6 w-full px-[0.7rem] py-[1.2rem]',
        hasBorder && 'border-black-5 focus:border-black-10 rounded-[0.6rem] border',
        hasError &&
          (hasBorder
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'text-red-500 placeholder:text-red-300'),
        className,
      )}
      {...props}
    />
  );
}
