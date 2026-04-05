import { Button, ComboBox, ControlRow, Stepper } from '@snappin/design-system';
import { DateButton } from '../components';
import { SCHEDULE_CHOICES, type ReservationCopyFormModel } from '../hooks';
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

  return (
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
            isDisabledMinus={peopleCount <= minimumPeopleCount}
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
  );
}
