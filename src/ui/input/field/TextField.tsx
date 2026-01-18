import { FieldMessage, Input } from '@/ui';
import { cn } from '@/utils/cn';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  helpText?: string;
  hasError?: boolean;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  showMaxLength?: boolean;
};

export default function TextField({
  id,
  label,
  required,
  helpText,
  hasError,
  onChange,
  placeholder,
  value,
  maxLength,
  showMaxLength = false,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className={cn('flex w-full flex-col', className)}>
      {label && (
        <label htmlFor={id} className='caption-14-md mb-[1rem] inline-block'>
          {label}
          {required && <span className='ml-2 text-red-500'>*</span>}
        </label>
      )}

      <Input
        id={id}
        type='text'
        value={value}
        aria-invalid={hasError || undefined}
        hasError={hasError}
        aria-describedby={hasError ? `${id}` : undefined}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      <div className='flex items-center justify-between'>
        <FieldMessage id={id} message={helpText} variant={hasError ? 'error' : 'help'} />
        {showMaxLength && maxLength && (
          <span className='caption-10-md text-black-6'>
            {value?.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
