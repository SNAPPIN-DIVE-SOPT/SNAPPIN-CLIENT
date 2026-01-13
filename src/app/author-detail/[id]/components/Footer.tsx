import { BottomCTAButton } from '@/ui';
import { useAuth } from '@/auth/hooks/useAuth';
import { useToast } from '@/ui/toast/hooks/useToast';

export default function Footer() {
  const { isLogIn } = useAuth();
  const { alert } = useToast();

  const handleContact = () => alert('메시지 기능은 준비 중이에요. 조금만 기다려주세요!', 3000, 'w-full max-w-[43rem] bottom-[8.4rem]');

  return (
    <div className='fixed bottom-0 w-full max-w-[45rem] px-[2rem] pt-[0.8rem] pb-[2.4rem] bg-black-1'>
      <BottomCTAButton className='w-full'>
        <BottomCTAButton.Single
          color='black'
          onClick={handleContact}
          disabled={!!isLogIn}
        >
          문의하기
        </BottomCTAButton.Single>
      </BottomCTAButton>
    </div>
  );
}