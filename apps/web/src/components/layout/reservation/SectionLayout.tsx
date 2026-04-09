import React from 'react';
import { cn } from '@snappin/design-system/lib/cn';

type FrameProps = React.PropsWithChildren<{
  title: string;
  right?: React.ReactNode;
  className?: string;
}>;

type CardProps = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

type HeaderProps = React.PropsWithChildren;

type BodyProps = React.PropsWithChildren;

type RowProps = {
  label: string;
  value: string;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
};

type FooterProps = {
  label: string;
  value: React.ReactNode;
};

const Frame = ({ title, right, children, className }: FrameProps) => {
  return (
    <div className='bg-black-1 flex flex-col px-[2rem] pt-[1.7rem]'>
      <div className='flex items-center justify-between'>
        <p className='caption-14-bd'>{title}</p>
        {right}
      </div>
      <div className={cn('pt-[1.2rem] pb-[2.4rem]', className)}>{children}</div>
    </div>
  );
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        'border-black-5 flex flex-col gap-[2rem] rounded-[0.6rem] border-[0.7px] px-[1.7rem] py-[1.3rem]',
        className,
      )}
    >
      {children}
    </div>
  );
};

const Header = ({ children }: HeaderProps) => {
  return <div className='flex flex-col gap-[0.4rem]'>{children}</div>;
};

const Body = ({ children }: BodyProps) => {
  return <div className='flex flex-col gap-[2rem]'>{children}</div>;
};

const Row = ({ label, value, labelClassName, className, valueClassName }: RowProps) => {
  return (
    <div className={cn('caption-12-md flex items-start gap-[1rem]', className)}>
      <p className={cn('text-black-7 min-w-[8rem]', labelClassName)}>{label}</p>
      <p className={cn('text-black-10', valueClassName)}>{value}</p>
    </div>
  );
};

const Footer = ({ label, value }: FooterProps) => {
  return (
    <div className='flex items-center justify-between'>
      <span className='caption-14-bd'>{label}</span>
      {value}
    </div>
  );
};

export const Section = Object.assign(Frame, {
  Card,
  Header,
  Body,
  Row,
  Footer,
});
