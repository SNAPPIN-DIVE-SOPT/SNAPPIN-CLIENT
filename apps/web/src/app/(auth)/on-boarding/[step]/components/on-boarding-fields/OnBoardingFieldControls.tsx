import type { ReactNode } from 'react';
import { Button, CheckBox, FieldMessage } from '@snappin/design-system';

type BaseFieldProps = {
  label: string;
  error?: boolean;
  errorText?: string;
};

type LayoutProps = BaseFieldProps & {
  children: ReactNode;
};

const Layout = ({ label, children, error, errorText }: LayoutProps) => {
  return (
    <div className='flex w-full flex-col gap-[0.3rem]'>
      <p className='font-16-md'>{label}</p>
      {children}
      {error && errorText && (
        <FieldMessage id={`${label}-message`} message={errorText} variant='error' />
      )}
    </div>
  );
};

export type SelectFieldProps<T extends string> = BaseFieldProps & {
  value: string;
  options: readonly T[];
  labels: Record<T, string>;
  onChange: (value: T) => void;
};

export const SelectField = <T extends string>({
  label,
  value,
  onChange,
  error,
  errorText,
  options,
  labels,
}: SelectFieldProps<T>) => {
  return (
    <Layout label={label} error={error} errorText={errorText}>
      <div className='flex gap-[0.8rem] pt-[1.2rem]'>
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onChange(option)}
            color={value === option ? 'black' : 'white'}
            className='caption-12-rg'
          >
            {labels[option]}
          </Button>
        ))}
      </div>
    </Layout>
  );
};

export type CheckboxFieldProps<T extends string> = BaseFieldProps & {
  value: string[];
  options: readonly T[];
  labels: Record<T, string>;
  onChange: (value: T) => void;
};

export const CheckboxField = <T extends string>({
  label,
  value,
  onChange,
  error,
  errorText,
  options,
  labels,
}: CheckboxFieldProps<T>) => {
  return (
    <Layout label={label} error={error} errorText={errorText}>
      <div className='flex flex-col gap-[2.5rem] pt-[1.2rem]'>
        {options.map((option) => {
          return (
            <label key={option} className='flex items-center gap-[1rem]'>
              <CheckBox isChecked={value.includes(option)} onClick={() => onChange(option)} />
              <span className='font-16-md'>{labels[option]}</span>
            </label>
          );
        })}
      </div>
    </Layout>
  );
};
