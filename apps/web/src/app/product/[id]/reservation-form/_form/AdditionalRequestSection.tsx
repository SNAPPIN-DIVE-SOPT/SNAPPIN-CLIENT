import { type ChangeEvent } from 'react';
import { FieldMessage, TextareaField } from '@snappin/design-system';
import { REQUEST_CONTENT } from '@/app/product/[id]/reservation-form/constants';
import { type ReservationCopyFormModel } from '@/app/product/[id]/reservation-form/hooks';
import RESERVATION_FORM_INFORMATION_MOCK from '@/app/product/[id]/reservation-form/mock/reservationFormInformation.mock';

type AdditionalRequestSectionProps = {
  reservationCopyFormModel: Pick<ReservationCopyFormModel, 'formData' | 'errors' | 'actions'>;
};

export default function AdditionalRequestSection({
  reservationCopyFormModel,
}: AdditionalRequestSectionProps) {
  const {
    formData: { requestContent },
    errors: { requestContent: requestContentErrorMessage },
    actions: { handleRequestContentChange },
  } = reservationCopyFormModel;

  const handleRequestContentInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleRequestContentChange(event.target.value);
  };
  const { additionalRequest } = RESERVATION_FORM_INFORMATION_MOCK;

  return (
    <>
      {additionalRequest?.length ? (
        <section>
          <span className='text-black-10 font-16-sb'>기타 요청 사항</span>
          <div className='bg-black-3 mt-[1rem] flex flex-col gap-[1.6rem] rounded-[0.6rem] p-[1.6rem]'>
            {additionalRequest.map(({ title, content }) => {
              return (
                <div key={title}>
                  <p className='text-black-7 caption-14-rg'>{title}</p>
                  <div className='mt-[0.8rem] flex flex-col gap-[0.4rem]'>
                    {content.map((contentValue) => {
                      return (
                        <p key={contentValue} className='text-black-10 caption-14-rg'>
                          • {contentValue}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

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
                message={requestContentErrorMessage}
                variant={requestContentErrorMessage ? 'error' : 'help'}
              />
              <FieldMessage
                id='reservation-request-content-help'
                message={`(${requestContent.length}/${REQUEST_CONTENT.MAX_LENGTH})`}
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
