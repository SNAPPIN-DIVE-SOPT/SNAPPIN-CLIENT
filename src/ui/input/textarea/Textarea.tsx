import { cn } from '@/utils/cn';
import './Textarea.css';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

export default function Textarea({ hasError, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'custom-scrollbar bg-black-1 border-black-5 caption-14-rg placeholder:text-black-6 focus:border-black-10 w-full rounded-[0.6rem] border px-[1.2rem] py-[1.1rem] focus:outline-none',
        hasError && 'border-red-error focus:border-red-error focus:ring-red-200',
        className,
      )}
      {...props}
    />
  );
}
