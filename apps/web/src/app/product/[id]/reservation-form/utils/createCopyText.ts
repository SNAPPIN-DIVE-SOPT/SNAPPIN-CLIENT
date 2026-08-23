import { formatShortDate } from '@/utils/formatDate';
import {
  SCHEDULE_CHOICE,
  SCHEDULE_CHOICE_KEY,
  UPLOAD_CONSENT_STATUS,
} from '@/app/product/[id]/reservation-form/constants';
import type {
  ReservationApplicant,
  ReservationCopyFormValue,
} from '@/app/product/[id]/reservation-form/types/copy';
import { hasCompletedSchedule } from '@/app/product/[id]/reservation-form/utils/reservationCopyForm';

type CreateCopyTextProps = {
  applicant: ReservationApplicant;
  reservationCopyFormValue: ReservationCopyFormValue;
};

/**
 * 예약 신청 폼 내용을 클립보드 복사용 텍스트로 변환합니다. 완료된 지망만
 * 일정 목록에 포함합니다.
 * @param props 신청자 정보와 예약 복사 폼 값
 * @param props.applicant 신청자 정보 (이름, 전화번호, 이메일)
 * @param props.reservationCopyFormValue 예약 복사 폼 값
 * @returns 줄바꿈으로 구분된 복사용 텍스트
 * @example const text = createCopyText({ applicant, reservationCopyFormValue });
 */
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
  const scheduleLines = SCHEDULE_CHOICE_KEY.filter((key) =>
    hasCompletedSchedule(schedules[key]),
  ).map((key) => {
    const scheduleSelection = schedules[key];
    const formattedScheduleDate = formatShortDate(scheduleSelection.date).replaceAll('.', '/');

    return `• ${SCHEDULE_CHOICE[key]}: ${formattedScheduleDate} ${scheduleSelection.time}`;
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
