import { ProfileCard } from '@/ui';
import { authorInfoMock } from '../../mock/authorInfo.mock';

export default function ClientProfileCard() {
  // TODO: API 연동 후 수정
  const authorInfo = authorInfoMock.data;
  //TODO: 로그인 여부 확인 후 수정
  const isLoggedIn = true;

  return (
    <ProfileCard
      profileImageUrl={authorInfo.profileImageUrl}
      name={authorInfo.photographerInfo.name}
      bio={authorInfo.photographerInfo.bio}
      specialties={authorInfo.photographerInfo.specialties}
      locations={authorInfo.photographerInfo.locations}
      isLoggedIn={isLoggedIn}
    />
  );
}
