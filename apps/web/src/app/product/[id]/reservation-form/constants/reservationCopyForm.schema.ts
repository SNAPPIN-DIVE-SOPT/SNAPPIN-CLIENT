import { z } from 'zod';
import {
  DURATION_HOURS,
  PEOPLE_COUNT,
  PRIMARY_SCHEDULE_CHOICE_KEY,
  RESERVATION_COPY_FORM_ERROR_MESSAGE,
  REQUEST_CONTENT,
  SCHEDULE_CHOICES,
} from './copyForm';
import { hasCompletedSchedule } from '../utils/reservationCopyForm';

// 각 일정 선택이 날짜와 시간 모두 선택되었는지 검증
const reservationScheduleSelectionSchema = z
  .object({
    date: z.string(),
    time: z.string(),
  })
  .superRefine((scheduleSelectionValue, context) => {
    const hasAnySelectedScheduleValue =
      scheduleSelectionValue.date.length > 0 || scheduleSelectionValue.time.length > 0;
    const hasCompletedScheduleSelection = hasCompletedSchedule(scheduleSelectionValue);

    if (!hasAnySelectedScheduleValue || hasCompletedScheduleSelection) {
      return;
    }

    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['date'],
      message: RESERVATION_COPY_FORM_ERROR_MESSAGE.SCHEDULE_PAIR_REQUIRED,
    });
  });

// 1~3지망 각각의 일정 선택
const reservationSchedulesSchemaShape = Object.fromEntries(
  SCHEDULE_CHOICES.map(({ key }) => {
    return [key, reservationScheduleSelectionSchema];
  }),
) as Record<(typeof SCHEDULE_CHOICES)[number]['key'], typeof reservationScheduleSelectionSchema>;

// 1~3지망 중 하나라도 완료된 일정이 있는지 검증
const reservationSchedulesSchema = z
  .object(reservationSchedulesSchemaShape)
  .superRefine((scheduleSelections, context) => {
    const hasAnyCompletedSchedule = SCHEDULE_CHOICES.some(({ key }) => {
      return hasCompletedSchedule(scheduleSelections[key]);
    });

    if (hasAnyCompletedSchedule) {
      return;
    }

    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: [PRIMARY_SCHEDULE_CHOICE_KEY, 'date'],
      message: RESERVATION_COPY_FORM_ERROR_MESSAGE.SCHEDULE_REQUIRED,
    });
  });

// 예약 폼 전체 스키마
export const reservationCopyFormSchema = z.object({
  placeId: z.string().min(1, RESERVATION_COPY_FORM_ERROR_MESSAGE.PLACE_ID_REQUIRED),
  placeKeyword: z.string().min(1, RESERVATION_COPY_FORM_ERROR_MESSAGE.PLACE_KEYWORD_REQUIRED),
  durationHours: z.number().min(DURATION_HOURS.MIN).max(DURATION_HOURS.MAX),
  peopleCount: z.number().min(PEOPLE_COUNT.MIN).max(PEOPLE_COUNT.MAX),
  schedules: reservationSchedulesSchema,
  uploadConsentStatus: z
    .enum(['', 'agree', 'disagree'])
    .refine((value) => value !== '', {
      message: RESERVATION_COPY_FORM_ERROR_MESSAGE.UPLOAD_CONSENT_REQUIRED,
    }),
  requestContent: z
    .string()
    .max(REQUEST_CONTENT.MAX_LENGTH, RESERVATION_COPY_FORM_ERROR_MESSAGE.REQUEST_CONTENT_MAX),
});

export type ReservationCopyFormInput = z.input<typeof reservationCopyFormSchema>;
export type ReservationCopyFormOutput = z.output<typeof reservationCopyFormSchema>;
