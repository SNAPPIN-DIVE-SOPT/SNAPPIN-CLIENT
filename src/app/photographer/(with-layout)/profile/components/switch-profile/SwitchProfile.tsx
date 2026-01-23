import { Divider, UserTypeToggle } from '@/ui';
import { USER_TYPE, UserType } from '@/auth/constant/userType';
import { useSwitchUserProfile } from '@/auth/apis';

type SwitchProfileProps = {
  userType: UserType | null;
  onChange: (type: UserType) => void;
  onSwitchStart: () => void;
  onSwitchEnd: () => void;
}


export default function SwitchProfile({ userType, onChange, onSwitchStart, onSwitchEnd }: SwitchProfileProps) {
  const { mutateAsync, isPending } = useSwitchUserProfile();

  const handleClick = async () => {
    onSwitchStart();
  
    try {
      const data = await mutateAsync();
      if (data.role) onChange(data.role as UserType);
    } finally {
      onSwitchEnd();
    }
  };

  if (isPending || !userType) return null;

  return (
    <>
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <section className='bg-black-1'>
        <div className='flex  h-[6.2rem] items-center justify-between px-[2rem] py-[1.5rem]'>
          <p className='caption-14-md text-black-10'>
            {userType === USER_TYPE.PHOTOGRAPHER ? '고객 계정으로 전환하기' : '작가 계정으로 전환하기'}
          </p>
          <UserTypeToggle selectedType={userType} onClick={handleClick}  disabled={isPending}/>
        </div>
      </section>
    </>
  );
}