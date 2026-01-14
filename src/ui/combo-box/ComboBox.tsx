'use client';

import { useEffect, useRef, useState } from 'react';
import { Command, CommandList, CommandEmpty, CommandGroup, CommandItem } from './base/command';
import { cn } from '@/utils/cn';
import { Input } from '@/ui';

type ComboBoxProps = {
  options: string[];
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  inputClassName?: string;
  optionClassName?: string;
  optionWrapperClassName?: string;
};

export default function ComboBox({
  options,
  placeholder = '검색어를 입력해주세요',
  value,
  onChange,
  inputClassName,
  optionClassName,
  optionWrapperClassName,
}: ComboBoxProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [uncontrolledQuery, setUncontrolledQuery] = useState('');

  const query = isControlled ? value : uncontrolledQuery;

  const setQuery = (next: string) => {
    if (!isControlled) setUncontrolledQuery(next);
    onChange?.(next);
  };

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, []);

  const handleOptionSelect = (v: string) => {
    setQuery(v);
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className='relative w-full'>
      <Command className='h-[4.2rem] w-full'>
        <Input
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          value={query}
          className={cn('h-[4.2rem] w-full', inputClassName)}
        />

        {isOpen && (
          <div className='absolute top-[calc(4.2rem+0.5rem)] left-0 w-full'>
            <CommandList
              className={cn(
                'max-h-[20rem] overflow-auto rounded-[0.4rem] bg-white p-[0.4rem] shadow-[0_0_12px_0_rgba(69,66,90,0.14)]',
                optionWrapperClassName,
              )}
            >
              <CommandEmpty className='caption-12-md text-black-6 p-[1rem]'>
                결과가 없습니다.
              </CommandEmpty>

              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => handleOptionSelect(option)}
                    className={cn(
                      'caption-12-md hover:bg-black-3 rounded-[0.4rem] p-[1rem] hover:cursor-pointer',
                      optionClassName,
                    )}
                  >
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
}
