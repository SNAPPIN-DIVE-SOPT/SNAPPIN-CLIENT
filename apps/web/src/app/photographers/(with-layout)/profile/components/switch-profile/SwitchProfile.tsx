import { Divider } from '@snappin/design-system';
import { UserTypeToggle } from '@/ui/user-type-toggle';
import { USER_TYPE, UserType } from '@snappin/shared/types';

type SwitchProfileProps = {
  userType: UserType;
  onClick: () => void;
  disabled?: boolean;
};

export default function SwitchProfile({ userType, onClick, disabled }: SwitchProfileProps) {
  return (
    <>
      <Divider color='bg-black-3' className='h-[0.6rem]' />
      <section className='bg-black-1'>
        <div className='flex h-[6.2rem] items-center justify-between px-[2rem] py-[1.5rem]'>
          <p className='caption-14-md text-black-10'>
            {userType === USER_TYPE.PHOTOGRAPHER
              ? '고객 계정으로 전환하기'
              : '작가 계정으로 전환하기'}
          </p>

          <UserTypeToggle selectedType={userType} onClick={onClick} disabled={disabled} />
        </div>
      </section>
    </>
  );
}
