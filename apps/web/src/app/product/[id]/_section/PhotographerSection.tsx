import Link from 'next/link';
import { GetProductPhotographerInfoResponseV2 } from '@/swagger-api';
import { ROUTES } from '@/constants/routes/routes';
import { Profile } from '@/ui';

type PhotographerSectionProps = {
  photographerInfo: GetProductPhotographerInfoResponseV2 | undefined;
};

export default function PhotographerSection({ photographerInfo }: PhotographerSectionProps) {
  if (!photographerInfo?.id) {
    return null;
  }

  return (
    <section className='bg-black-1 px-[2rem] pt-[1rem] pb-[2rem]'>
      <Link href={ROUTES.PHOTOGRAPHER(photographerInfo.id)}>
        <Profile className='border-1 border-black-4 rounded-[0.6rem]'>
          <Profile.Avatar size='sm' src={photographerInfo.profileImageUrl} />
          <Profile.Content lines={2}>
            <Profile.Item>
              <Profile.Title>{photographerInfo.name}</Profile.Title>
              <Profile.Description>{photographerInfo.bio}</Profile.Description>
            </Profile.Item>
            <Profile.Item>
              <Profile.Row>
                <Profile.Meta>촬영 상품</Profile.Meta>
                <Profile.Meta className='text-black-9'>{photographerInfo.specialties?.join(', ')}</Profile.Meta>
              </Profile.Row>
              <Profile.Row>
                <Profile.Meta>활동 지역</Profile.Meta>
                <Profile.Meta className='text-black-9'>{photographerInfo.locations?.join(', ')}</Profile.Meta>
              </Profile.Row>
            </Profile.Item>
          </Profile.Content>
          <Profile.Trailing />
        </Profile>
      </Link>
    </section>
  );
}
