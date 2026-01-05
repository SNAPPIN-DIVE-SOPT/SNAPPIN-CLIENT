import { Footer } from '@/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen flex-col'>
      <div id='app-scroll' className='scrollbar-hide flex-1 overflow-y-auto'>
        {children}
      </div>
      <Footer userRole='user' />
    </div>
  );
}
