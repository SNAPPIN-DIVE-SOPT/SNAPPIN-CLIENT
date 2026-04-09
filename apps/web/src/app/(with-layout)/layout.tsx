import { Footer } from '@/ui/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col'>
      {children}
      <Footer />
    </div>
  );
}
