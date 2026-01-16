'use client';

import {
  BottomCTAButton,
  BottomDrawer,
  ControlRow,
  DatePicker,
  Divider,
  DrawerDescription,
  DrawerTitle,
  FieldMessage,
  Stepper,
  TextareaField,
  TextField,
  TimePicker,
} from '@/ui';
import { MOCK_TIME_SLOTS } from '@/ui/time-picker/constants/mockTimeSlots';
import { formatNumberWithComma } from '@/utils/formatNumberWithComma';
import { useEffect, useRef, useState } from 'react';
import {
  DraftUpdater,
  ReservationConstraints,
  ReservationDraft,
} from '@/ui/drawer/reservation/types/reservation';

type ReservationBottomDrawerProps = {
  isOpen: boolean;
  productId: number;
  amount: number;
  handleOpenChangeAction: (open: boolean) => void;
  draft: ReservationDraft;
  handleDraftChangeAction: (next: DraftUpdater) => void;
  reservationConstraints: ReservationConstraints;
  onFormSubmitAction: (e: React.FormEvent<HTMLFormElement>) => void;
};

const DURATION_HOURS_STEP = 0.5;
const PARTICIPANT_COUNT_STEP = 1;
const REQUEST_TEXTAREA_MAX_LENGTH = 500;

export default function ReservationBottomDrawer({
  isOpen,
  productId,
  amount,
  handleOpenChangeAction,
  draft,
  handleDraftChangeAction,
  reservationConstraints,
  onFormSubmitAction,
}: ReservationBottomDrawerProps) {
  const timeSectionRef = useRef<HTMLDivElement>(null);
  const [viewMonth, setViewMonth] = useState<Date>(new Date());
  const [isRequestFocused, setIsRequestFocused] = useState(false);

  // todo useSuspenseQueries 연결
  // 1. 휴뮤일 조회
  // 2. 시간 슬롯
  const queries = productId;
  console.info(queries);
  const { date, time, durationHours, place, participantCount, request } = draft;
  const {
    minDurationHours,
    maxDurationHours = 5,
    minParticipantCount = 1,
    maxParticipantCount,
  } = reservationConstraints;
  const isButtonDisabled = !date || !time;
  const formattedTime = `${durationHours}시간`;
  const formattedCount = `${participantCount}명`;
  const requestLength = request.length;
  const isRequestTextareaError = requestLength > REQUEST_TEXTAREA_MAX_LENGTH;

  const patch = (p: Partial<ReservationDraft>) =>
    handleDraftChangeAction((prev) => ({ ...prev, ...p }));

  const decreaseDurationHours = () =>
    handleDraftChangeAction((prev) => ({
      ...prev,
      durationHours: Math.max(minDurationHours, prev.durationHours - DURATION_HOURS_STEP),
    }));

  const increaseDurationHours = () =>
    handleDraftChangeAction((prev) => ({
      ...prev,
      durationHours: Math.min(maxDurationHours, prev.durationHours + DURATION_HOURS_STEP),
    }));

  const decreaseParticipant = () =>
    handleDraftChangeAction((prev) => ({
      ...prev,
      participantCount: Math.max(
        minParticipantCount,
        prev.participantCount - PARTICIPANT_COUNT_STEP,
      ),
    }));

  const increaseParticipant = () =>
    handleDraftChangeAction((prev) => ({
      ...prev,
      participantCount: Math.min(
        maxParticipantCount,
        prev.participantCount + PARTICIPANT_COUNT_STEP,
      ),
    }));

  useEffect(() => {
    if (!date) return;

    const rafId = requestAnimationFrame(() => {
      timeSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
    return () => cancelAnimationFrame(rafId);
  }, [date]);

  return (
    <BottomDrawer
      isOpen={isOpen}
      handleOpenChange={handleOpenChangeAction}
      className='max-h-[92dvh]!'
    >
      {/* 접근성 위한 title & description (숨김처리) */}
      <DrawerTitle className='sr-only'>예약 정보 입력</DrawerTitle>
      <DrawerDescription className='sr-only'>
        예약 날짜, 시간, 촬영 시간, 촬영 인원, 장소와 요청 사항을 입력하는 화면입니다.
      </DrawerDescription>

      {/* 예약 폼 */}
      <form
        id='reservation-form'
        onSubmit={onFormSubmitAction}
        className='scrollbar-hide overflow-y-auto'
      >
        {/* 날짜 선택 */}
        <BottomDrawer.Section>
          <BottomDrawer.Row>
            <BottomDrawer.Title className='px-[3rem] py-[2rem]'>
              희망 날짜 및 시간을 선택해 주세요
            </BottomDrawer.Title>
            <DatePicker
              selectedDate={date ?? undefined}
              viewDateMonth={viewMonth}
              handleMonthChangeAction={setViewMonth}
              handleDateChangeAction={(nextDate) => patch({ date: nextDate, time: null })}
            />
            <div ref={timeSectionRef} aria-hidden />
          </BottomDrawer.Row>

          <Divider color='bg-black-3' thickness='small' className='mx-[2rem]' />

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
        </BottomDrawer.Section>

        <Divider thickness='large' color='bg-black-3' />

        <BottomDrawer.Section className='flex flex-col gap-[2.4rem] p-[2rem]'>
          {/* 촬영 시간 입력 */}
          <ControlRow
            leftLabel={
              <BottomDrawer.Title as='span' className='caption-14-md'>
                촬영 시간
              </BottomDrawer.Title>
            }
            rightControl={
              <Stepper
                value={formattedTime}
                handleClickMinus={decreaseDurationHours}
                handleClickAdd={increaseDurationHours}
                isDisabledMinus={durationHours <= minDurationHours}
                isDisabledAdd={durationHours >= maxDurationHours}
              />
            }
          />

          {/* 촬영 장소 입력 */}
          <TextField
            id='reservation-place'
            label='촬영 장소'
            value={place}
            onChange={(e) => patch({ place: e.target.value })}
            placeholder='작가님의 활동 지역 내 장소만 검색할 수 있어요'
          />

          {/* 촬영 인원 선택 */}
          <ControlRow
            leftLabel={
              <BottomDrawer.Title as='span' className='caption-14-md'>
                촬영 인원
              </BottomDrawer.Title>
            }
            rightControl={
              <Stepper
                value={formattedCount}
                handleClickMinus={decreaseParticipant}
                handleClickAdd={increaseParticipant}
                isDisabledMinus={participantCount <= minParticipantCount}
                isDisabledAdd={participantCount >= maxParticipantCount}
              />
            }
          />

          {/* 기타 요청 사항 입력 */}
          <TextareaField
            id='reservation-etc'
            label='기타 요청 사항'
            rows={4}
            value={request}
            placeholder={
              !isRequestFocused && request.length === 0
                ? `추가 문의 사항 혹은 유료 서비스 포함 여부를 작성해주세요`
                : '요청 사항 입력'
            }
            onFocus={() => setIsRequestFocused(true)}
            onBlur={() => setIsRequestFocused(false)}
            hasError={isRequestTextareaError}
            helpText={
              <div className='flex flex-row justify-between'>
                <FieldMessage
                  id='revervation-etc-error'
                  message={
                    isRequestTextareaError
                      ? `최대 ${REQUEST_TEXTAREA_MAX_LENGTH}자까지 입력할 수 있어요`
                      : ' '
                  }
                  variant={isRequestTextareaError ? 'error' : 'help'}
                />
                <FieldMessage
                  id='reservation-etc-help'
                  message={`(${request.length}/${REQUEST_TEXTAREA_MAX_LENGTH})`}
                  variant={isRequestTextareaError ? 'error' : 'help'}
                />
              </div>
            }
            onChange={(e) => patch({ request: e.target.value })}
          />
        </BottomDrawer.Section>
      </form>

      {/* 하단 버튼 영역 */}
      <BottomDrawer.Footer className='border-black-3 border-t-[0.1rem] px-[1.6rem] pt-[0.8rem] pb-[2.4rem]'>
        <div className='flex flex-row'>
          <div className='text-black-10 flex flex-1 items-center gap-[0.4rem]'>
            <span className='caption-12-md'>기본가</span>
            <div className='flex items-center gap-[0.2rem]'>
              <strong className='title-23-eb'>{formatNumberWithComma(amount)}</strong>
              <span className='caption-14-md pt-[0.3rem]'>원</span>
            </div>
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
