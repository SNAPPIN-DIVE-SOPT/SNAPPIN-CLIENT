import { FieldMessage, Input } from '@/ui';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  helpText?: string;
  hasError?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextField({
  id,
  label,
  required,
  helpText,
  hasError,
  onChange,
  ...rest
}: InputFieldProps) {
  return (
    <div className={'flex w-full flex-col'}>
      {label && (
        <label htmlFor={id} className='caption-14-md mb-[1rem] inline-block'>
          {label}
          {required && <span className='ml-2 text-red-500'>*</span>}
        </label>
      )}

      <Input
        id={id}
        aria-invalid={hasError || undefined}
        hasError={hasError}
        aria-describedby={hasError ? `${id}` : undefined}
        required={required}
        onChange={onChange}
        {...rest}
      />

      <FieldMessage id={id} message={helpText} variant={hasError ? 'error' : 'help'} />
    </div>
  );
}
