import { type ChangeEvent } from 'react';
import { FieldMessage, TextareaField } from '@snappin/design-system';
import { type ReservationCopyFormModel } from '../hooks';

type AdditionalRequestSectionProps = {
  reservationCopyFormModel: Pick<
    ReservationCopyFormModel,
    'values' | 'errors' | 'limits' | 'actions'
  >;
};

export default function AdditionalRequestSection({
  reservationCopyFormModel,
}: AdditionalRequestSectionProps) {
  const {
    values: { requestContent },
    errors: { requestContent: requestContentErrorMessage },
    limits: { requestContentMaxLength },
    actions: { handleRequestContentChange },
  } = reservationCopyFormModel;

  const handleRequestContentInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleRequestContentChange(event.target.value);
  };

  return (
    <>
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
                message={`(${requestContent.length}/${requestContentMaxLength})`}
                variant={requestContentErrorMessage ? 'error' : 'help'}
              />
            </div>
          }
          onChange={handleRequestContentInputChange}
        />
      </section>
    </>
  );
}
