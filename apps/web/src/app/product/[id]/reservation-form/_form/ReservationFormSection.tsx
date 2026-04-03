'use client';

import { type ChangeEvent, type FormEvent } from 'react';
import {
  BottomDrawer,
  Button,
  ComboBox,
  ControlRow,
  DatePicker,
  DrawerDescription,
  DrawerTitle,
  FieldMessage,
  Stepper,
  TextareaField,
} from '@snappin/design-system';
import { TimePicker } from '@/ui/time-picker';
import { ClientFooter, DateButton } from '../components';
import { SCHEDULE_CHOICES, useReservationCopyForm } from '../hooks/useReservationCopyForm';
import RESERVATION_TIME_PICKER_MOCK from '../mock/reservationTimePicker.mock';
import ReservationInfoSection from './ReservationInfoSection';

type ReservationFormSectionProps = {
  photographerId: number;
};

const createDurationLabel = (durationHours: number) => {
  return `${Number.isInteger(durationHours) ? durationHours : durationHours.toFixed(1)}시간`;
};

const createScheduleDateLabel = (scheduleDate: string) => {
  return scheduleDate.length > 0 ? `${scheduleDate.replaceAll('-', '.')}.` : '날짜 선택';
};

const createScheduleTimeLabel = (scheduleTime: string) => {
  const [hourValueString = '0', minuteValueString = '00'] = scheduleTime.split(':');
  const hourValue = Number(hourValueString);
  const isMorning = hourValue < 12;
  const hourValueForDisplay = hourValue % 12 === 0 ? 12 : hourValue % 12;

  return scheduleTime.length > 0
    ? `${isMorning ? '오전' : '오후'} ${String(hourValueForDisplay).padStart(2, '0')}:${minuteValueString}`
    : '시간 선택';
};

const DEFAULT_MINIMUM_DURATION_HOURS = 1;
const DEFAULT_MAX_PEOPLE = 15;

export default function ReservationFormSection({ photographerId }: ReservationFormSectionProps) {
  const reservationCopyFormModel = useReservationCopyForm({
    minimumDurationHours: DEFAULT_MINIMUM_DURATION_HOURS,
    maxPeople: DEFAULT_MAX_PEOPLE,
  });

  const {
    minimumDurationHours,
    maximumDurationHours,
    minPeople,
    maxPeople,
    placeKeyword,
    placeOptions,
    durationHours,
    peopleCount,
    scheduleSelections,
    uploadConsentStatus,
    isDatePickerBottomDrawerOpen,
    isTimePickerBottomDrawerOpen,
    activeScheduleChoiceKey,
    requestContent,
    requestContentErrorMessage,
    isCopyDisabled,
    handlePlaceKeywordChange,
    handlePlaceBlur,
    handleDurationHoursStep,
    handlePeopleCountStep,
    handleUploadConsentStatusClick,
    handleSchedulePickerOpen,
    handleSchedulePickerOpenChange,
    handleScheduleSelection,
    handleRequestContentChange,
    handleCopyReservationForm,
  } = reservationCopyFormModel;

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleRequestContentInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleRequestContentChange(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className='flex flex-col gap-[3rem] p-[2rem]'>
          <ReservationInfoSection />

          <section className='flex flex-col gap-[1.8rem]'>
            <span className='text-black-10 font-16-sb'>
              촬영 예약 정보 <span className='text-red-error'>*</span>
            </span>

            <div className='flex flex-col gap-[0.8rem]'>
              <span className='text-black-10 caption-14-md'>
                촬영 장소 <span className='text-red-error'>*</span>
              </span>
              {/* TODO: input box 변동 필요 */}
              <ComboBox
                placeholder='장소 이름을 검색하세요'
                value={placeKeyword}
                options={placeOptions}
                onChange={handlePlaceKeywordChange}
                onBlur={handlePlaceBlur}
              />
            </div>

            <ControlRow
              leftLabel={
                <span className='text-black-10 caption-14-md'>
                  촬영 시간 <span className='text-red-error'>*</span>
                </span>
              }
              rightControl={
                <Stepper
                  value={createDurationLabel(durationHours)}
                  handleClickMinus={() => handleDurationHoursStep('decrease')}
                  handleClickAdd={() => handleDurationHoursStep('increase')}
                  isDisabledMinus={durationHours <= minimumDurationHours}
                  isDisabledAdd={durationHours >= maximumDurationHours}
                />
              }
            />

            <ControlRow
              centered
              leftLabel={
                <span className='text-black-10 caption-14-md'>
                  촬영 인원 <span className='text-red-error'>*</span>
                </span>
              }
              rightControl={
                <Stepper
                  value={`${peopleCount}명`}
                  handleClickMinus={() => handlePeopleCountStep('decrease')}
                  handleClickAdd={() => handlePeopleCountStep('increase')}
                  isDisabledMinus={peopleCount <= minPeople}
                  isDisabledAdd={peopleCount >= maxPeople}
                />
              }
            />

            <div className='flex flex-col gap-[1.6rem]'>
              <span className='text-black-10 caption-14-md'>
                촬영 일정 <span className='text-red-error'>*</span>
              </span>
              {SCHEDULE_CHOICES.map(({ key, label }) => {
                const scheduleDate = scheduleSelections[key]?.date ?? '';
                const scheduleTime = scheduleSelections[key]?.time ?? '';

                return (
                  <div key={key} className='flex flex-col gap-[0.8rem]'>
                    <span className='caption-12-md text-black-8'>{label}</span>
                    <div className='grid grid-cols-2 gap-[0.6rem]'>
                      <DateButton
                        value={createScheduleDateLabel(scheduleDate)}
                        hasValue={scheduleDate.length > 0}
                        handleClick={() => handleSchedulePickerOpen(key, 'date')}
                      />
                      <DateButton
                        value={createScheduleTimeLabel(scheduleTime)}
                        hasValue={scheduleTime.length > 0}
                        handleClick={() => handleSchedulePickerOpen(key, 'time')}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className='flex flex-col gap-[1rem]'>
              <span className='text-black-10 caption-14-md'>
                업로드 동의 여부 <span className='text-red-error'>*</span>
              </span>
              {/* TODO: api 명세서 받은 후 변경 */}
              <div className='bg-black-3 rounded-[0.6rem] p-[1.6rem]'>
                <p className='caption-14-rg text-black-7'>
                  업로드 동의 시 보정본 추가 혜택이 제공될 수 있어요.
                </p>
              </div>
              <div className='flex gap-[1rem]'>
                <Button
                  type='button'
                  display='inline'
                  size='small'
                  color={uploadConsentStatus === 'agree' ? 'black' : 'white'}
                  onClick={() => handleUploadConsentStatusClick('agree')}
                >
                  동의
                </Button>
                <Button
                  type='button'
                  display='inline'
                  size='small'
                  color={uploadConsentStatus === 'disagree' ? 'black' : 'white'}
                  onClick={() => handleUploadConsentStatusClick('disagree')}
                >
                  비동의
                </Button>
              </div>
            </div>
          </section>

          {/* TODO: api 명세서 받은 후 변경 및 노출 분기 처리 */}
          <section>
            <span className='text-black-10 font-16-sb'>기타 요청 사항</span>
            <div className='bg-black-3 mt-[1rem] rounded-[0.6rem] p-[1.6rem]'>
              <p className='text-black-7 caption-14-rg'>학위복 대여 안내</p>
            </div>
          </section>

          <section>
            <TextareaField
              id='reservation-request-content'
              label='요청 사항 작성하기'
              placeholder='요청 사항이 있을 경우 자유롭게 작성해 주세요.'
              value={requestContent}
              hasError={Boolean(requestContentErrorMessage)}
              className='min-h-[11rem]'
              helpText={
                <div className='flex justify-between'>
                  <FieldMessage
                    id='reservation-request-content-error'
                    message={requestContentErrorMessage || ' '}
                    variant={requestContentErrorMessage ? 'error' : 'help'}
                  />
                  <FieldMessage
                    id='reservation-request-content-help'
                    message={`(${requestContent.length}/500)`}
                    variant={requestContentErrorMessage ? 'error' : 'help'}
                  />
                </div>
              }
              onChange={handleRequestContentInputChange}
            />
          </section>
        </div>
      </form>

      {/* 하단 버튼 */}
      <ClientFooter
        photographerId={photographerId}
        disabled={isCopyDisabled}
        handleClick={handleCopyReservationForm}
      />

      {/* 촬영 날짜 바텀 시트 */}
      <BottomDrawer
        isOpen={isDatePickerBottomDrawerOpen}
        handleOpenChange={handleSchedulePickerOpenChange}
        className='max-h-[92dvh]!'
      >
        <DrawerTitle className='sr-only'>희망 날짜 선택</DrawerTitle>
        <DrawerDescription className='sr-only'>
          희망 촬영 날짜를 선택하는 바텀 드로어입니다.
        </DrawerDescription>
        <BottomDrawer.Section className='pb-[2rem]'>
          <BottomDrawer.Row className='px-[2rem]'>
            <BottomDrawer.Title className='py-[2rem]'>희망 날짜를 선택해 주세요</BottomDrawer.Title>
            <DatePicker
              selectedDate={
                activeScheduleChoiceKey
                  ? (scheduleSelections[activeScheduleChoiceKey]?.date ?? '')
                  : ''
              }
              handleDateChangeAction={(scheduleDate) =>
                handleScheduleSelection('date', scheduleDate)
              }
            />
          </BottomDrawer.Row>
        </BottomDrawer.Section>
      </BottomDrawer>

      {/* 촬영 시간 바텀 시트 */}
      <BottomDrawer
        isOpen={isTimePickerBottomDrawerOpen}
        handleOpenChange={handleSchedulePickerOpenChange}
        className='max-h-[92dvh]!'
      >
        <DrawerTitle className='sr-only'>희망 시간 선택</DrawerTitle>
        <DrawerDescription className='sr-only'>
          희망 촬영 시간을 선택하는 바텀 드로어입니다.
        </DrawerDescription>
        <BottomDrawer.Section className='px-[2rem] pb-[2rem]'>
          <BottomDrawer.Title className='py-[2rem]'>
            촬영 시작 시간을 선택해 주세요
          </BottomDrawer.Title>
          <TimePicker
            sections={RESERVATION_TIME_PICKER_MOCK}
            value={
              activeScheduleChoiceKey
                ? (scheduleSelections[activeScheduleChoiceKey]?.time ?? '')
                : ''
            }
            handleChange={(scheduleTime) => handleScheduleSelection('time', scheduleTime)}
          />
        </BottomDrawer.Section>
      </BottomDrawer>
    </>
  );
}
