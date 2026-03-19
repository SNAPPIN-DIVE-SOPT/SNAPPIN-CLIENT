import React from 'react';
import { Footer } from '@/ui/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col'>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
