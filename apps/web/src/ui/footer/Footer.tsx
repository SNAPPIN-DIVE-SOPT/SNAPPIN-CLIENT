import FooterClient from './Footer.client';
import { getUserType } from '@/auth/userType';
import { isValidUserType } from '@snappin/shared/types/userType';

export default async function Footer() {
  const userType = await getUserType();

  return (
    <div className='z-20'>
      <div className='bg-black-1 footer-height pointer-events-none' aria-hidden />
      <footer className='border-black-5 footer-height fixed-center bg-black-1 bottom-0 flex items-center justify-between border-t-[0.5px] px-[2rem] pt-[0.2rem] pb-[0.6rem]'>
        <FooterClient initialUserType={userType && isValidUserType(userType) ? userType : null} />
      </footer>
    </div>
  );
}
