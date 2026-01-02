import React from 'react';
import { Footer } from '@/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative'>
      <div className='mb-[7.2rem] w-full'>{children}</div>
      <Footer />
    </div>
  );
}
