'use client';

import {
  BottomCTAButton,
  BottomDrawer,
  DatePicker,
  Divider,
  DrawerDescription,
  DrawerTitle,
  Stepper,
  TextField,
  TimePicker,
} from '@/ui';
import { MOCK_TIME_SLOTS } from '@/ui/time-picker/constants/mockTimeSlots';
import TextareaField from '@/ui/input/textarea-field/TextareaField';
import { formatNumberWithComma } from '@/utils/formatNumberWithComma';
import { useEffect, useRef } from 'react';
import {
  ReservationConstraints,
  ReservationDraft,
} from '@/ui/drawer/reservation/types/reservation';

type ReservationBottomDrawerProps = {
  isOpen: boolean;
  productId: number;
  amount: number;
  handleOpenChange: (open: boolean) => void;
  viewDateMonth?: Date;
  draft: ReservationDraft;
  handleDraftChange: (next: ReservationDraft) => void;
  reservationConstraints: ReservationConstraints;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const DURATION_HOURS_STEP = 1;
const PARTICIPANT_COUNT_STEP = 1;

export default function ReservationBottomDrawer({
  isOpen,
  productId,
  amount,
  handleOpenChange,
  viewDateMonth,
  draft,
  handleDraftChange,
  reservationConstraints,
  onSubmit,
}: ReservationBottomDrawerProps) {
  const timeSectionRef = useRef<HTMLDivElement>(null);

  // todo useSuspenseQueries 연결
  // 1. 휴뮤일 조회
  // 2. 시간 슬롯
  const queries = productId;
  const { date, time, durationHours, place, participantCount, request } = draft;
  const {
    minDurationHours,
    maxDurationHours = 5,
    minParticipantCount = 1,
    maxParticipantCount,
  } = reservationConstraints;
  const patch = (p: Partial<ReservationDraft>) => handleDraftChange({ ...draft, ...p });
  const isButtonDisabled = !date || !time;

  const formattedTime = `${durationHours}시간`;
  const formattedCount = `${participantCount}명`;

  useEffect(() => {
    if (!date) return;

    requestAnimationFrame(() => {
      timeSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, [date]);

  return (
    <BottomDrawer isOpen={isOpen} handleOpenChange={handleOpenChange} className='max-h-[92dvh]!'>
      {/* 접근성 위한 title & description (숨김처리) */}
      <DrawerTitle className='sr-only'>예약 정보 입력</DrawerTitle>
      <DrawerDescription className='sr-only'>
        예약 날짜, 시간, 촬영 시간, 촬영 인원, 장소와 요청 사항을 입력하는 화면입니다.
      </DrawerDescription>

      {/* 예약 폼 */}
      <form id='reservation-form' onSubmit={onSubmit} className='scrollbar-hide overflow-y-auto'>
        {/* 날짜 선택 */}
        <BottomDrawer.Row>
          <BottomDrawer.Title className='px-[3rem] py-[2rem]'>
            희망 날짜 및 시간을 선택해 주세요
          </BottomDrawer.Title>
          <DatePicker
            viewDateMonth={viewDateMonth}
            selectedDate={date ?? undefined}
            handleDateChangeAction={(nextDate) => patch({ date: nextDate })}
          />
          <div ref={timeSectionRef} aria-hidden />
        </BottomDrawer.Row>

        {/* 촬영 시작할 시간 선택 */}
        {date && (
          <BottomDrawer.Row className='flex flex-col gap-[1.2rem] px-[2rem] py-[2rem]'>
            <BottomDrawer.Title>촬영 시작 시간을 선택해 주세요</BottomDrawer.Title>
            <TimePicker
              sections={MOCK_TIME_SLOTS}
              value={time ?? undefined}
              handleChange={(nextTime) => patch({ time: nextTime })}
            />
          </BottomDrawer.Row>
        )}
        <Divider thickness='large' color='bg-black-3' />

        <div className='flex flex-col gap-[2.4rem] p-[2rem]'>
          {/* 촬영 시간 선택 */}
          <BottomDrawer.Row className='flex justify-between'>
            <BottomDrawer.Title as='span' className='caption-14-md'>
              촬영 시간
            </BottomDrawer.Title>
            <Stepper
              value={formattedTime}
              handleClickMinus={() =>
                patch({
                  durationHours: Math.max(minDurationHours, durationHours - DURATION_HOURS_STEP),
                })
              }
              handleClickAdd={() =>
                patch({
                  durationHours: Math.min(maxDurationHours, durationHours + DURATION_HOURS_STEP),
                })
              }
            />
          </BottomDrawer.Row>

          {/* 촬용 장소 입력 */}
          <BottomDrawer.Row className='flex items-center'>
            <TextField
              id='reservation-place'
              label='촬영 장소'
              value={place}
              onChange={(e) => patch({ place: e.target.value })}
              placeholder='작가님의 활동 지역 내 장소만 검색할 수 있어요'
            />
          </BottomDrawer.Row>

          {/* 촬영 인원 선택 */}
          <BottomDrawer.Row className='flex justify-between'>
            <BottomDrawer.Title as='span' className='caption-14-md'>
              촬영 인원
            </BottomDrawer.Title>
            <Stepper
              value={formattedCount}
              handleClickMinus={() =>
                patch({
                  participantCount: Math.max(
                    minParticipantCount,
                    participantCount - PARTICIPANT_COUNT_STEP,
                  ),
                })
              }
              handleClickAdd={() =>
                patch({
                  participantCount: Math.min(
                    maxParticipantCount,
                    participantCount + PARTICIPANT_COUNT_STEP,
                  ),
                })
              }
            />
          </BottomDrawer.Row>

          {/* 기타 요청 사항 입력 */}
          <BottomDrawer.Row className='flex items-center'>
            <TextareaField
              id='reservation-etc'
              label='기타 요청 사항'
              rows={2}
              value={request}
              placeholder='추가 문의 사항 혹은 유료 서비스 포함 여부를 작성해주세요'
              helpText={`${request.length}/500자까지 작성 가능합니다.`}
              onChange={(e) => patch({ request: e.target.value })}
            />
          </BottomDrawer.Row>
        </div>
      </form>

      {/* 하단 버튼 영역 */}
      <BottomDrawer.Footer className='border-black-3 border-t-[0.1rem] px-[1.6rem] pt-[0.8rem] pb-[2.4rem]'>
        <div className='flex flex-row'>
          <div className='text-black-10 flex flex-1 items-center gap-[0.4rem]'>
            <span className='font-12-md'>기본가</span>
            <strong className='title-23-eb'>{`${formatNumberWithComma(amount)}원`}</strong>
          </div>
          <BottomCTAButton className='flex-1'>
            <BottomCTAButton.Single
              size='medium'
              form='reservation-form'
              type='submit'
              disabled={isButtonDisabled}
            >
              예약하기
            </BottomCTAButton.Single>
          </BottomCTAButton>
        </div>
      </BottomDrawer.Footer>
    </BottomDrawer>
  );
}
