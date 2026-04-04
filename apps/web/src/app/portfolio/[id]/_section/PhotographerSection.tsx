import Link from 'next/link';
import { Profile } from '@/ui';
import { ROUTES } from '@/constants/routes/routes';

type PhotographerSectionProps = {
  id: number;
  name: string;
  bio: string;
  specialties: string[];
  locations: string[];
  imageUrl: string;
};

export default function PhotographerSection({
  id,
  name,
  bio,
  specialties,
  locations,
  imageUrl,
}: PhotographerSectionProps) {
  return (
    <Link
      href={ROUTES.PHOTOGRAPHER(id)}
      aria-label={`${name} 작가 상세 페이지로 이동`}
      className='bg-black-1 flex w-full items-center gap-[1.2rem] px-[2rem] pb-[2rem]'
    >
      <Profile className='border-1 border-black-4 rounded-[0.6rem]'>
        <Profile.Avatar size='sm' src={imageUrl} />
        <Profile.Content lines={2}>
          <Profile.Item>
            <Profile.Title>{name}</Profile.Title>
            <Profile.Description>{bio}</Profile.Description>
          </Profile.Item>
          <Profile.Item>
            <Profile.Row>
              <Profile.Meta>촬영 상품</Profile.Meta>
              <Profile.Meta>{specialties.join(', ')}</Profile.Meta>
            </Profile.Row>
            <Profile.Row>
              <Profile.Meta>활동 지역</Profile.Meta>
              <Profile.Meta>{locations.join(', ')}</Profile.Meta>
            </Profile.Row>
          </Profile.Item>
        </Profile.Content>
        <Profile.Trailing />
      </Profile>
    </Link>
  );
}
