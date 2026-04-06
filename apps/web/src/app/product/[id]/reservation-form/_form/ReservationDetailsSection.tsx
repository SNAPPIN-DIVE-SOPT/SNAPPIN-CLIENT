import { type ReactNode } from 'react';
import { Button, ComboBox, ControlRow, Stepper } from '@snappin/design-system';
import { DateButton } from '../components';
import { SCHEDULE_CHOICES, type ReservationCopyFormModel } from '../hooks';
import RESERVATION_FORM_INFORMATION_MOCK from '../mock/reservationFormInformation.mock';
import {
  createDurationLabel,
  createScheduleDateLabel,
  createScheduleTimeLabel,
} from '../utils/reservationFormFormatter';

type ReservationDetailsSectionProps = {
  reservationCopyFormModel: Pick<
    ReservationCopyFormModel,
    'values' | 'viewState' | 'limits' | 'actions'
  >;
};

type RequiredLabelProps = {
  children: ReactNode;
};

const RequiredLabel = ({ children }: RequiredLabelProps) => {
  return (
    <span className='text-black-10 caption-14-md'>
      {children} <span className='text-red-error'>*</span>
    </span>
  );
};

export default function ReservationDetailsSection({
  reservationCopyFormModel,
}: ReservationDetailsSectionProps) {
  const {
    values: { placeKeyword, durationHours, peopleCount, scheduleSelections, uploadConsentStatus },
    viewState: { placeOptions },
    limits: { minimumDurationHours, maximumDurationHours, minimumPeopleCount, maxPeople },
    actions: {
      handlePlaceKeywordChange,
      handlePlaceBlur,
      handleDurationHoursStep,
      handlePeopleCountStep,
      handleUploadConsentStatusClick,
      handleSchedulePickerOpen,
    },
  } = reservationCopyFormModel;
  const {
    uploadConsent: { agreeNote, disagreeNote },
  } = RESERVATION_FORM_INFORMATION_MOCK;
  const uploadConsentNotes = [
    { label: '동의 시', note: agreeNote },
    { label: '비동의 시', note: disagreeNote },
  ].filter(({ note }) => {
    return Boolean(note);
  });

  return (
    <section className='flex flex-col gap-[1.8rem]'>
      <span className='text-black-10 font-16-sb'>
        촬영 예약 정보 <span className='text-red-error'>*</span>
      </span>

      <div className='flex flex-col gap-[0.8rem]'>
        <RequiredLabel>촬영 장소</RequiredLabel>
        <ComboBox
          placeholder='장소 이름을 검색하세요'
          value={placeKeyword}
          options={placeOptions}
          onChange={handlePlaceKeywordChange}
          onBlur={handlePlaceBlur}
        />
      </div>

      <ControlRow
        leftLabel={<RequiredLabel>촬영 시간</RequiredLabel>}
        rightControl={
          <Stepper
            value={createDurationLabel(durationHours)}
            handleClickMinus={handleDurationHoursStep.decrease}
            handleClickAdd={handleDurationHoursStep.increase}
            isDisabledMinus={durationHours <= minimumDurationHours}
            isDisabledAdd={durationHours >= maximumDurationHours}
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
            isDisabledMinus={peopleCount <= minimumPeopleCount}
            isDisabledAdd={peopleCount >= maxPeople}
          />
        }
      />

      <div className='flex flex-col gap-[1.6rem]'>
        <RequiredLabel>촬영 일정</RequiredLabel>
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
        <RequiredLabel>업로드 동의 여부</RequiredLabel>
        {uploadConsentNotes.length > 0 ? (
          <div className='bg-black-3 rounded-[0.6rem] p-[1.6rem]'>
            <div className='flex flex-col gap-[1.2rem]'>
              {uploadConsentNotes.map(({ label, note }) => {
                return (
                  <div key={label}>
                    <p className='caption-14-rg text-black-7'>{label}</p>
                    <p className='text-black-10 caption-14-rg mt-[0.4rem]'>{note}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        <div className='flex gap-[1rem]'>
          <Button
            type='button'
            display='inline'
            size='small'
            color={uploadConsentStatus === 'agree' ? 'black' : 'white'}
            className={uploadConsentStatus === 'agree' ? 'border border-transparent' : undefined}
            onClick={() => handleUploadConsentStatusClick('agree')}
          >
            동의
          </Button>
          <Button
            type='button'
            display='inline'
            size='small'
            color={uploadConsentStatus === 'disagree' ? 'black' : 'white'}
            className={uploadConsentStatus === 'disagree' ? 'border border-transparent' : undefined}
            onClick={() => handleUploadConsentStatusClick('disagree')}
          >
            비동의
          </Button>
        </div>
      </div>
    </section>
  );
}
