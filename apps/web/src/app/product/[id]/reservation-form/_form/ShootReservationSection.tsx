import { type ReactNode } from 'react';
import { Button, ComboBox, ControlRow, FieldMessage, Stepper } from '@snappin/design-system';
import { DateButton } from '@/app/product/[id]/reservation-form/components';
import {
  DURATION_HOURS,
  PEOPLE_COUNT,
  PRIMARY_SCHEDULE_CHOICE_KEY,
  SCHEDULE_CHOICE,
  SCHEDULE_CHOICE_KEY,
  UPLOAD_CONSENT_NOTE_LABEL,
  UPLOAD_CONSENT_STATUS,
  UPLOAD_CONSENT_STATUS_KEY,
} from '@/app/product/[id]/reservation-form/constants';
import { type ReservationCopyFormModel } from '@/app/product/[id]/reservation-form/hooks';
import RESERVATION_FORM_INFORMATION_MOCK from '@/app/product/[id]/reservation-form/mock/reservationFormInformation.mock';
import {
  createDurationLabel,
  createScheduleDateLabel,
  createScheduleTimeLabel,
  hasSelectableScheduleChoice,
} from '@/app/product/[id]/reservation-form/utils';

type ShootReservationSectionProps = {
  reservationCopyFormModel: Pick<
    ReservationCopyFormModel,
    'formData' | 'errors' | 'viewState' | 'actions'
  >;
};

type RequiredLabelProps = {
  children: ReactNode;
};

const RequiredLabel = ({ children }: RequiredLabelProps) => {
  return (
    <h1 className='text-black-10 caption-14-md'>
      {children} <span className='text-red-error'>*</span>
    </h1>
  );
};

export default function ShootReservationSection({
  reservationCopyFormModel,
}: ShootReservationSectionProps) {
  const {
    formData: {
      placeKeyword,
      durationHours,
      peopleCount,
      schedules: scheduleSelections,
      uploadConsentStatus,
    },
    errors: {
      place: placeErrorMessage,
      schedules: schedulesErrorMessage,
      uploadConsentStatus: uploadConsentStatusErrorMessage,
    },
    viewState: { placeOptions },
    actions: {
      handlePlaceKeywordChange,
      handlePlaceBlur,
      handleDurationHoursStep,
      handlePeopleCountStep,
      handleUploadConsentStatusClick,
      handleSchedulePickerOpen,
    },
  } = reservationCopyFormModel;
  const { uploadConsent } = RESERVATION_FORM_INFORMATION_MOCK;
  const uploadConsentNotes = UPLOAD_CONSENT_STATUS_KEY.flatMap((key) => {
    const uploadConsentNote =
      key === 'agree' ? uploadConsent.agreeNote : uploadConsent.disagreeNote;

    return uploadConsentNote
      ? [
          {
            key,
            label: UPLOAD_CONSENT_NOTE_LABEL[key],
            note: uploadConsentNote,
          },
        ]
      : [];
  });

  return (
    <section className='flex flex-col gap-[1.8rem]'>
      <h1 className='text-black-10 font-16-sb'>
        촬영 예약 정보 <span className='text-red-error'>*</span>
      </h1>

      <div className='flex flex-col gap-[0.8rem]'>
        <RequiredLabel>촬영 장소</RequiredLabel>
        <ComboBox
          placeholder='장소 이름을 검색하세요'
          value={placeKeyword}
          options={placeOptions}
          onChange={handlePlaceKeywordChange}
          onBlur={handlePlaceBlur}
        />
        <FieldMessage id='reservation-place-error' message={placeErrorMessage} variant='error' />
      </div>

      <ControlRow
        leftLabel={<RequiredLabel>촬영 시간</RequiredLabel>}
        rightControl={
          <Stepper
            value={createDurationLabel(durationHours)}
            handleClickMinus={handleDurationHoursStep.decrease}
            handleClickAdd={handleDurationHoursStep.increase}
            isDisabledMinus={durationHours <= DURATION_HOURS.MIN}
            isDisabledAdd={durationHours >= DURATION_HOURS.MAX}
          />
        }
      />

      <ControlRow
        centered
        leftLabel={<RequiredLabel>촬영 인원</RequiredLabel>}
        rightControl={
          <Stepper
            value={`${peopleCount}명`}
            handleClickMinus={handlePeopleCountStep.decrease}
            handleClickAdd={handlePeopleCountStep.increase}
            isDisabledMinus={peopleCount <= PEOPLE_COUNT.MIN}
            isDisabledAdd={peopleCount >= PEOPLE_COUNT.MAX}
          />
        }
      />

      <div className='flex flex-col gap-[1.6rem]'>
        <RequiredLabel>촬영 일정</RequiredLabel>
        {SCHEDULE_CHOICE_KEY.map((key) => {
          const scheduleDate = scheduleSelections[key]?.date ?? '';
          const scheduleTime = scheduleSelections[key]?.time ?? '';
          const isAdditionalScheduleChoice = key !== PRIMARY_SCHEDULE_CHOICE_KEY;
          const isScheduleChoiceDisabled =
            isAdditionalScheduleChoice && !hasSelectableScheduleChoice(key, scheduleSelections);

          return (
            <div key={key} className='flex flex-col gap-[0.8rem]'>
              <span className='caption-12-md text-black-8'>{SCHEDULE_CHOICE[key]}</span>
              <div className='grid grid-cols-2 gap-[0.6rem]'>
                <DateButton
                  value={createScheduleDateLabel(scheduleDate)}
                  hasValue={scheduleDate.length > 0}
                  disabled={isScheduleChoiceDisabled}
                  handleClick={() => handleSchedulePickerOpen(key, 'date')}
                />
                <DateButton
                  value={createScheduleTimeLabel(scheduleTime)}
                  hasValue={scheduleTime.length > 0}
                  disabled={isScheduleChoiceDisabled}
                  handleClick={() => handleSchedulePickerOpen(key, 'time')}
                />
              </div>
            </div>
          );
        })}
        <FieldMessage
          id='reservation-schedules-error'
          message={schedulesErrorMessage}
          variant='error'
        />
      </div>

      <div className='flex flex-col gap-[1rem]'>
        <RequiredLabel>업로드 동의 여부</RequiredLabel>
        {uploadConsentNotes.length > 0 && (
          <div className='bg-black-3 rounded-[0.6rem] p-[1.6rem]'>
            <div className='flex flex-col gap-[1.2rem]'>
              {uploadConsentNotes.map(({ key, label, note }) => {
                return (
                  <div key={key}>
                    <p className='caption-14-rg text-black-7'>{label}</p>
                    <p className='text-black-10 caption-14-rg mt-[0.4rem]'>{note}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className='flex gap-[1rem]'>
          {UPLOAD_CONSENT_STATUS_KEY.map((key) => (
            <Button
              key={key}
              type='button'
              display='inline'
              size='small'
              color={uploadConsentStatus === key ? 'black' : 'white'}
              className={uploadConsentStatus === key ? 'border border-transparent' : undefined}
              onClick={() => handleUploadConsentStatusClick(key)}
            >
              {UPLOAD_CONSENT_STATUS[key]}
            </Button>
          ))}
        </div>
        <FieldMessage
          id='reservation-upload-consent-status-error'
          message={uploadConsentStatusErrorMessage}
          variant='error'
        />
      </div>
    </section>
  );
}
