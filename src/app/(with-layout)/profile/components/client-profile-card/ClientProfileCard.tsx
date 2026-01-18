import { INFO_MOCK } from '../../mock/Info.mock';
import Image from 'next/image';
import { Button } from '@/ui';
export default function ClientProfileCard() {
  // TODO: API 연동 후 수정
  const info = INFO_MOCK;
  //TODO: 로그인 여부 확인 후 수정
  const isLoggedIn = false;

  return (
    <div className='flex items-center gap-[1.2rem] p-[2rem]'>
      <Image
        src={info.profileImageUrl}
        alt='프로필 이미지'
        width={64}
        height={64}
        className='rounded-full'
      />
      <div className='flex w-full items-center justify-between'>
        <span className='caption-14-bd'>
          {isLoggedIn ? info.clientInfo.name : '로그인이 필요해요'}
        </span>
        {!isLoggedIn && (
          <Button size='small' color='black'>
            로그인
          </Button>
        )}
      </div>
    </div>
  );
}
