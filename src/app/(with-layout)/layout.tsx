import { Footer } from '@/ui';
import { USER_TYPE } from '@/auth/constant/userType';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col'>
      {children}
      <Footer userRole={USER_TYPE.CLIENT} />
    </div>
  );
}
