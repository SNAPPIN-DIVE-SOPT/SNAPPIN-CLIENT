import React from 'react';
import { Footer } from '@/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex h-screen flex-col'>
      <div className='mb-footer flex-1 overflow-y-auto'>{children}</div>
      <Footer userRole='author' />
    </div>
  );
}
