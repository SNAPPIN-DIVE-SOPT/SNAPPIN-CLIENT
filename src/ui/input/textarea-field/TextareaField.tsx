import { FieldMessage, Textarea } from '@/ui';

type TextareaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label?: string;
  helpText?: string;
  hasError?: boolean;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextareaField({
  id,
  label,
  required,
  helpText,
  hasError,
  onChange,
  placeholder,
  value,
  ...props
}: TextareaFieldProps) {
  const messageId = `${id}-message`;
  return (
    <div className='flex w-full flex-col'>
      {label && (
        <label htmlFor={id} className='caption-14-md mb-[1rem] inline-block'>
          {label}
          {required && <span className='ml-2 text-red-500'>*</span>}
        </label>
      )}

      <Textarea
        id={id}
        value={value}
        aria-invalid={hasError || undefined}
        hasError={hasError}
        aria-describedby={helpText ? messageId : undefined}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />

      <FieldMessage id={messageId} message={helpText} variant={hasError ? 'error' : 'help'} />
    </div>
  );
}
