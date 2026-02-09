import React from 'react';
import { Footer } from '@/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col'>
      {children}
      <Footer />
    </div>
  );
}
