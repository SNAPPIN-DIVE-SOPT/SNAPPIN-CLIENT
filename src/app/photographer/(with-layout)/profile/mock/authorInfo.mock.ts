export const authorInfoMock = {
  success: true,
  status: 200,
  message: '성공적으로 유저 정보를 조회했습니다.',
  code: 'USER_200_001',
  data: {
    id: 1,
    role: 'PHOTOGRAPHER',
    profileImageUrl:
      'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg',
    hasPhotographerProfile: true,
    clientInfo: null,
    photographerInfo: {
      name: '김수빈',
      bio: '일상의 아름다움을 포착합니다',
      specialties: ['졸업스냅', '개인스냅'],
      locations: ['서울'],
    },
  },
};
