import Input from '@/ui/input/base/Input';
import { cn } from '@/utils/cn';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  required?: boolean;
  errorText?: string;
};

export default function InputField({ id, label, required, errorText, ...rest }: InputFieldProps) {
  return (
    <div className={cn('flex w-full flex-col')}>
      {label && (
        <label htmlFor={id} className='caption-14-md mb-[1rem] inline-block'>
          {label}
          {/* 피그마에 required 표시가 따로 없어 필요하지않다면 삭제 */}
          {required && <span className='ml-2 text-red-500'>*</span>}
        </label>
      )}

      <Input
        id={id}
        aria-invalid={!!errorText}
        hasError={!!errorText}
        aria-describedby={errorText ? `${id}-error` : undefined}
        {...rest}
      />

      {/* 피그마에는 에러 메시지 UI가 따로 없어 필요하지 않다면 삭제 */}
      {errorText && (
        <p className='caption-12-md mt-2 text-red-500' id={`${id}-error`}>
          {errorText}
        </p>
      )}
    </div>
  );
}
