type ReservationFormInformation = {
  uploadConsent: {
    agreeNote: string | null;
    disagreeNote: string | null;
  };
  additionalRequest: Array<{
    title: string;
    content: string[];
  }> | null;
};

const RESERVATION_FORM_INFORMATION_MOCK: ReservationFormInformation = {
  uploadConsent: {
    agreeNote: '보정본 1장 추가 제공',
    disagreeNote: '비동의 시 제공 범위가 달라질 수 있습니다.',
  },
  additionalRequest: [
    {
      title: '학위복 대여안내',
      content: ['연세대 S/M 사이즈 2벌', '성균관대 L 사이즈 4벌', '숙명여대 M 사이즈 1벌'],
    },
    {
      title: '대여 가능 소품',
      content: ['연세대 : 학위증, 학교 인형', '성균관대 : 학위증, 학교 인형'],
    },
  ],
};

export default RESERVATION_FORM_INFORMATION_MOCK;
