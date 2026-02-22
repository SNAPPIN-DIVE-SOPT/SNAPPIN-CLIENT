import { Footer } from '@/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-full min-h-0 flex-col'>
      {children}
      <Footer />
    </div>
  );
}
