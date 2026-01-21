import { Divider, UserTypeToggle } from '@/ui';
import { USER_TYPE, UserType } from '@/auth/constant/userType';
import { useGetSwitchedUserProfile } from '@/auth/apis';

type SwitchProfileProps = {
  userType: UserType;
  onChange: (type: UserType) => void;
}

export default function SwitchProfile({ userType, onChange }: SwitchProfileProps) {
  const { mutate } = useGetSwitchedUserProfile();

  const handleClick = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        if (data.role) {
          onChange(data.role as UserType);
        }
      },
    });
  };

  return (
    <>
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <section className='bg-black-1'>
        <div className='flex items-center justify-between px-[2rem] py-[1.5rem]'>
          <p className='caption-14-md text-black-10'>
            {userType === USER_TYPE.PHOTOGRAPHER
              ? '고객 계정으로 전환하기'
              : '작가 계정으로 전환하기'}
          </p>
          <UserTypeToggle selectedType={userType} onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
