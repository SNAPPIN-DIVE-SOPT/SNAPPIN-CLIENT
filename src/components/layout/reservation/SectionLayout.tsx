import React from 'react';
import { cn } from '@/utils/cn';
import { StateChip } from '@/ui/chip';
import { StateCode } from '@/types/stateCode';
import { formatCreatedAt } from '@/utils/formatDate';

type SectionFrameProps = React.PropsWithChildren<
  {
    title: string;
    stateCode?: StateCode;
  } & React.HTMLAttributes<HTMLDivElement>
>;

type SectionCardProps = React.PropsWithChildren<{ className?: string }>;

type SectionHeaderProps = {
  client?: string;
  createdAt: string;
};

type SectionBodyProps = React.PropsWithChildren<{}>;

type SectionRowProps = {
  label: string;
  value: string;
  labelClassName?: string;
  className?: string;
  valueClassName?: string;
};

type SectionFooterProps = {
  label: string;
  value: string;
};

const Frame = ({ title, stateCode, children, className }: SectionFrameProps) => {
  return (
    <div className='bg-black-1 flex flex-col px-[2rem] pt-[1.7rem]'>
      <div className='flex items-center justify-between'>
        <p className='caption-14-bd'>{title}</p>
        {stateCode && <StateChip label={stateCode} />}
      </div>
      <div className={cn('pt-[1.2rem] pb-[2.4rem]', className)}>{children}</div>
    </div>
  );
};

const Card = ({ children, className }: SectionCardProps) => {
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

const Header = ({ client, createdAt }: SectionHeaderProps) => {
  return (
    <div className='flex flex-col gap-[0.4rem]'>
      {client && (
        <div className='flex items-center gap-[0.2rem]'>
          <span className='font-16-bd'>{client}</span>
          <span className='font-16-md'>님</span>
        </div>
      )}
      <span className='caption-10-md text-black-7'>{formatCreatedAt(createdAt)}</span>
    </div>
  );
};

const Body = ({ children }: SectionBodyProps) => {
  return <div className='flex flex-col gap-[2rem]'>{children}</div>;
};

const Row = ({ label, value, labelClassName, className, valueClassName }: SectionRowProps) => {
  return (
    <div className={cn('caption-12-md flex items-start gap-[1rem]', className)}>
      <p className={cn('text-black-7 min-w-[8rem]', labelClassName)}>{label}</p>
      <p className={cn('text-black-10', valueClassName)}>{value}</p>
    </div>
  );
};

const Footer = ({ label, value }: SectionFooterProps) => {
  return (
    <div className='flex items-center justify-between'>
      <span className='caption-14-bd'>{label}</span>
      <div className='flex items-center gap-[0.2rem]'>
        <span className='title-23-eb'>{value}</span>
        <span className='caption-14-md'>원</span>
      </div>
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
