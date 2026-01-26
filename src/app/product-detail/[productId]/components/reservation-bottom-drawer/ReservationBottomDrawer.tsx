'use client';

import {
  BottomCTAButton,
  BottomDrawer,
  ComboBox,
  ControlRow,
  DatePicker,
  Divider,
  DrawerDescription,
  DrawerTitle,
  FieldMessage,
  Stepper,
  TextareaField,
} from '@/ui';
import { formatNumberWithComma } from '@/utils/formatNumberWithComma';
import { Suspense, useEffect, useRef, useState } from 'react';
import { ReservationDraft } from '@/app/product-detail/[productId]/types/reservation';
import {
  useAvailablePeopleRange,
  useAvailableTime,
  useClosedDates,
  useReservation,
} from '@/app/product-detail/[productId]/api';
import AvailableTimeSection from '@/app/product-detail/[productId]/components/time-picker/AvailableTimePicker';
import { ProductReservationRequest } from '@/swagger-api/data-contracts';
import { useSearchPlaces } from '@/app/(with-layout)/explore/api';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useToast } from '@/ui/toast/hooks/useToast';
import { getErrorMessage, getErrorStatus } from '@/utils/error';

type ReservationBottomDrawerProps = {
  isOpen: boolean;
  productId: string;
  amount: number;
  draft: ReservationDraft;
  setDraftAction: React.Dispatch<React.SetStateAction<ReservationDraft>>;
  handleOpenChangeAction: () => void;
  onSuccessReservationAction?: () => void;
};

const MAX_DURATION_HOURS = 5;
const DURATION_HOURS_STEP = 0.5;
const PARTICIPANT_COUNT_STEP = 1;
const REQUEST_TEXTAREA_MAX_LENGTH = 500;

export default function ReservationBottomDrawer({
  isOpen,
  productId,
  amount,
  draft: { date, time, durationHours, participantCount, place, request, placeId },
  setDraftAction,
  handleOpenChangeAction,
  onSuccessReservationAction,
}: ReservationBottomDrawerProps) {
  const toast = useToast();
  const { mutate, isError, isPending } = useReservation(productId);
  const timeSectionRef = useRef<HTMLDivElement>(null);
  const [viewMonth, setViewMonth] = useState<Date>(new Date());
  const [isRequestFocused, setIsRequestFocused] = useState(false);
  const [placeKeyword, setPlaceKeyword] = useState('');

  const { data: peopleRange } = useAvailablePeopleRange(productId);
  const { data: closedDates } = useClosedDates(productId, viewMonth);
  const { data: minAvailableTime } = useAvailableTime(productId);

  const debouncedPlaceKeyword = useDebouncedValue(placeKeyword, 300);
  const { data: places } = useSearchPlaces(debouncedPlaceKeyword ?? '');

  const minParticipantCount = peopleRange?.minPeople ?? 1;
  const maxParticipantCount = peopleRange?.maxPeople ?? 10;

  const effectiveDurationHours = durationHours ?? minAvailableTime ?? 1;
  const formattedTime = `${effectiveDurationHours}시간`;

  const formattedCount = `${participantCount}명`;
  const requestLength = request.length;
  const isRequestTextareaError = requestLength > REQUEST_TEXTAREA_MAX_LENGTH;

  const isButtonDisabled = !date || !time || !placeId || isRequestTextareaError;

  const placeNameToId = new Map(
    places?.filter((p) => p.name && p.id != null).map((p) => [p.name as string, p.id as number]),
  );

  const handlePlaceChange = (next: string) => {
    setPlaceKeyword(next);

    const matchedId = placeNameToId.get(next);
    if (matchedId != null) {
      patch({ place: next, placeId: matchedId });
    } else {
      // “정확히 선택된 값”이 아니면 id 비워두는게 안전
      patch({ place: next, placeId: null });
    }
  };

  const handlePlaceBlur = () => {
    if (!placeId) {
      setPlaceKeyword('');
      patch({ place: '', placeId: null });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !time || !participantCount || !durationHours) return;
    if (!placeId) return;

    const requestBody: ProductReservationRequest = {
      date,
      durationTime: durationHours,
      startTime: time,
      peopleCount: participantCount,
      placeId: placeId,
      requestNote: request,
    };

    mutate(requestBody, {
      onSuccess: () => {
        handleOpenChangeAction();
        onSuccessReservationAction?.();
      },
      onError: (error) => {
        const message = getErrorMessage(error);
        toast.error(message, 3000, 'bottom-[8.6rem]');
        handleOpenChangeAction();
      },
    });
  };

  const patch = (p: Partial<ReservationDraft>) => setDraftAction((prev) => ({ ...prev, ...p }));

  const decreaseDurationHours = () =>
    setDraftAction((prev) => ({
      ...prev,
      durationHours: Math.max(minAvailableTime ?? 1, prev.durationHours! - DURATION_HOURS_STEP),
    }));

  const increaseDurationHours = () =>
    setDraftAction((prev) => ({
      ...prev,
      durationHours: Math.min(MAX_DURATION_HOURS, prev.durationHours! + DURATION_HOURS_STEP),
    }));

  const decreaseParticipant = () =>
    setDraftAction((prev) => ({
      ...prev,
      participantCount: Math.max(
        minParticipantCount,
        prev.participantCount - PARTICIPANT_COUNT_STEP,
      ),
    }));

  const increaseParticipant = () =>
    setDraftAction((prev) => ({
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

  useEffect(() => {
    if (minAvailableTime == null) return;

    setDraftAction((prev) => {
      if (prev.durationHours != null) return prev;
      return { ...prev, durationHours: minAvailableTime };
    });
  }, [minAvailableTime, setDraftAction]);

  if (isError) {
    return;
  }

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
        onSubmit={handleSubmit}
        className='scrollbar-hide overflow-y-auto'
      >
        {/* 날짜 선택 */}
        <BottomDrawer.Section>
          <BottomDrawer.Row className='px-[2rem] pb-[1.6rem]'>
            <BottomDrawer.Title className='px-[1rem] py-[2rem]'>
              희망 날짜 및 시간을 선택해 주세요
            </BottomDrawer.Title>
            <DatePicker
              selectedDate={date ?? undefined}
              viewDateMonth={viewMonth}
              handleMonthChangeAction={setViewMonth}
              closedDates={closedDates}
              handleDateChangeAction={(nextDate) => patch({ date: nextDate, time: null })}
            />
            <div ref={timeSectionRef} aria-hidden />
          </BottomDrawer.Row>

          <Divider color='bg-black-3' thickness='small' className='mx-[2rem]' />

          {/* 촬영 시작할 시간 선택 */}
          {date && (
            <BottomDrawer.Row className='flex flex-col gap-[1.2rem] px-[2rem] py-[2rem]'>
              <BottomDrawer.Title>촬영 시작 시간을 선택해 주세요</BottomDrawer.Title>
              {/* 촬영 시작할 시간 선택 */}
              {date && (
                <Suspense>
                  <AvailableTimeSection
                    productId={productId}
                    date={date}
                    time={time}
                    onChangeTime={(nextTime) => patch({ time: nextTime })}
                  />
                </Suspense>
              )}
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
                isDisabledMinus={durationHours! <= (minAvailableTime ?? 1)}
                isDisabledAdd={durationHours! >= MAX_DURATION_HOURS}
              />
            }
          />

          {/* 촬영 장소 입력 */}
          <ControlRow
            className='flex flex-col gap-[1rem]'
            leftLabel={
              <BottomDrawer.Title as='span' className='caption-14-md'>
                촬영 장소
              </BottomDrawer.Title>
            }
            rightControl={
              <ComboBox
                value={place}
                onChange={handlePlaceChange}
                options={(places ?? []).map((item) => item.name ?? '').filter(Boolean)}
                placeholder='작가님의 활동 지역 내 장소만 검색할 수 있어요'
                onBlur={handlePlaceBlur}
              />
            }
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
              isLoading={isPending}
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
