'use client'
import Button from '@/src/components/Button'
import { useRouter } from 'next/navigation';

type ClientButtonProps = {
  buttonText: string;
  route: string;
}

export default function ClientButton({ buttonText, route }: ClientButtonProps) {
  const router = useRouter();
  
  const handleButtonClick = () => {
    window.gtag?.('event', 'button_click', {
      button_name: `${buttonText}_click`,
      page_path: '/client',
    });
    router.push(route);
  }

  return (
    <Button buttonText={buttonText} onClick={handleButtonClick} className='mt-[5.1rem]' />
  );
}
