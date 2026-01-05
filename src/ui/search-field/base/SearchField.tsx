import { IconSearch } from '@/assets';
import { cn } from '@/utils/cn';
import React from 'react';

type SearchFieldBaseProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  containerClassName?: string;
  inputWrapperClassName?: string;
  iconClassName?: string;
  textContainerClassName?: string;
  headlineClassName?: string;
  supportingTextClassName?: string;
  headline?: string;
  supportingText?: string;
  icon?: React.ReactNode | null;
};

const SearchFieldBase = React.forwardRef<HTMLInputElement, SearchFieldBaseProps>(
  (
    {
      className,
      containerClassName,
      inputWrapperClassName,
      iconClassName,
      textContainerClassName,
      headlineClassName,
      supportingTextClassName,
      headline,
      supportingText,
      icon,
      type = 'search',
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const defaultValueText = Array.isArray(defaultValue)
      ? defaultValue.join(',')
      : typeof defaultValue === 'string' || typeof defaultValue === 'number'
        ? `${defaultValue}`
        : '';
    const [hasValue, setHasValue] = React.useState(defaultValueText.length > 0 ? true : false);
    const valueText = Array.isArray(value)
      ? value.join(',')
      : typeof value === 'string' || typeof value === 'number'
        ? `${value}`
        : '';
    const shouldUseControlledValue = typeof value !== 'undefined' ? true : false;
    const resolvedHasValue = shouldUseControlledValue ? valueText.length > 0 : hasValue;
    const headlineText = headline ?? '';
    const shouldRenderHeaderText = Boolean(headlineText || supportingText);
    const [isFocused, setIsFocused] = React.useState(false);
    const shouldHideHeaderText = shouldRenderHeaderText
      ? resolvedHasValue || isFocused
        ? true
        : false
      : false;
    const resolvedIcon =
      icon === null ? null : (icon ?? <IconSearch className={iconClassName} aria-hidden='true' />);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextHasValue = event.target.value.length > 0 ? true : false;
      setHasValue(nextHasValue);
      onChange?.(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    return (
      <div
        className={cn(containerClassName)}
        data-has-value={resolvedHasValue ? 'true' : 'false'}
        data-focused={isFocused ? 'true' : 'false'}
      >
        {resolvedIcon ? <span className='shrink-0'>{resolvedIcon}</span> : null}
        <div className={cn(inputWrapperClassName)}>
          <input
            type={type}
            ref={ref}
            value={shouldUseControlledValue ? value : undefined}
            defaultValue={shouldUseControlledValue ? undefined : defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(className)}
            {...props}
          />
          {shouldRenderHeaderText ? (
            <div
              className={cn(textContainerClassName)}
              aria-hidden={shouldHideHeaderText ? 'true' : undefined}
            >
              <span className={cn(headlineClassName)}>{headlineText}</span>
              {supportingText ? (
                <span className={cn(supportingTextClassName)}>{supportingText}</span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);

SearchFieldBase.displayName = 'SearchFieldBase';
export default SearchFieldBase;
