import { Logo } from '@snappin/design-system/assets';
import { ImageSlide } from '@snappin/design-system';
import { readReturnToContext } from '@/auth/utils/returnTo';
import { ClientNavigation, LoginButton } from './components';

type PageProps = {
  searchParams: Promise<{
    error?: string;
    returnTo?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { error, returnTo: rawReturnTo } = await searchParams;
  const returnTo = readReturnToContext(
    new URLSearchParams({
      returnTo: rawReturnTo ?? '',
    }),
  ).returnTo;

  return (
    <div className='bg-black-10 h-full'>
      <ClientNavigation />
      <div className='mt-[6.4rem] flex flex-col gap-[2.4rem]'>
        <div className='flex flex-col items-center gap-[1.2rem]'>
          <Logo className='text-neon-black h-[2.8rem] w-[15.8rem]' />
          <p className='title-20-md text-black-1'>나만의 무드에서 시작되는 스냅</p>
        </div>
        <ImageSlide />
        <div className='flex justify-center px-[2rem]'>
          <LoginButton returnTo={returnTo} loginError={error} />
        </div>
      </div>
    </div>
  );
}
