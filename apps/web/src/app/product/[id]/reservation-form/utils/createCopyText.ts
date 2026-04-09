import { formatShortDate } from '@/utils/formatDate';
import { SCHEDULE_CHOICES, UPLOAD_CONSENT_STATUS } from '@/app/product/[id]/reservation-form/constants';
import type {
  ReservationApplicant,
  ReservationCopyFormValue,
} from '@/app/product/[id]/reservation-form/types/copy';
import { hasCompletedSchedule } from '@/app/product/[id]/reservation-form/utils/reservationCopyForm';

type CreateCopyTextProps = {
  applicant: ReservationApplicant;
  reservationCopyFormValue: ReservationCopyFormValue;
};

// 텍스트 복사 시, form의 각 항목 노출 방식 정의
const createCopyText = ({
  applicant,
  reservationCopyFormValue: {
    placeKeyword,
    durationHours,
    peopleCount,
    schedules,
    uploadConsentStatus,
    requestContent,
  },
}: CreateCopyTextProps) => {
  // 완료된 일정만 복사 텍스트에 포함
  const scheduleLines = SCHEDULE_CHOICES.filter(({ key }) => {
    return hasCompletedSchedule(schedules[key]);
  }).map(({ key, label }) => {
    const scheduleSelection = schedules[key];
    const formattedScheduleDate = formatShortDate(scheduleSelection.date).replaceAll('.', '/');

    return `• ${label}: ${formattedScheduleDate} ${scheduleSelection.time}`;
  });
  const uploadConsentStatusLabel =
    uploadConsentStatus === 'agree' || uploadConsentStatus === 'disagree'
      ? UPLOAD_CONSENT_STATUS[uploadConsentStatus]
      : '-';

  return [
    `1) 이름: ${applicant.name}`,
    `2) 전화번호: ${applicant.phoneNumber}`,
    `3) 이메일: ${applicant.email}`,
    `4) 촬영 장소: ${placeKeyword}`,
    `5) 촬영 시간: ${durationHours}시간`,
    `6) 촬영 인원: ${peopleCount}명`,
    `7) 촬영 일정`,
    ...scheduleLines,
    `8) 업로드 동의 여부: ${uploadConsentStatusLabel}`,
    `9) 기타 요청 사항: ${requestContent || '-'}`,
  ].join('\n');
};

export default createCopyText;
