'use client';

import { BottomCTAButton } from '@/ui';
import { type ClientFooterConfig } from './clientFooterConfig';

type ClientFooterProps = {
  config: ClientFooterConfig;
};

export default function ClientFooter({ config }: ClientFooterProps) {
  const { label, color, disabled, onClick } = config;

  return (
    <>
      <div className='h-[8.4rem]' />
      <BottomCTAButton background='white' hasPadding fixed>
        <BottomCTAButton.Single
          size='large'
          type='button'
          color={color}
          disabled={disabled}
          onClick={onClick}
        >
          {label}
        </BottomCTAButton.Single>
      </BottomCTAButton>
    </>
  );
}
