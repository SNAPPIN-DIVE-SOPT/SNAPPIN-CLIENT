'use client';

import { useState } from 'react';
import { TextareaField, FieldMessage } from '@/ui';

type ReviewFormSectionProps = {
  content: string;
  handleChangeContent: (value: string) => { ok: boolean; reason?: 'min' | 'max' };
};

const REVIEW_CONTENT_MAX_LENGTH = 500;

export default function ReviewFormSection({
  content,
  handleChangeContent,
}: ReviewFormSectionProps) {
  const [errorMessage, setErrorMessage] = useState<string>(' ');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = event.target.value;
    const result = handleChangeContent(next);

    if (!result.ok && result.reason === 'max') {
      setErrorMessage(`최대 ${REVIEW_CONTENT_MAX_LENGTH}자까지 입력할 수 있어요.`);
      return;
    }

    setErrorMessage(' ');
  };

  const hasError = Boolean(errorMessage);

  return (
    <section className='bg-black-1 flex flex-col px-[2rem]'>
      <TextareaField
        id='review-form'
        label='자세한 스냅 촬영 리뷰를 작성해주세요'
        placeholder='스냅 촬영의 분위기와 결과물을 자세히 작성해 주시면 유용한 리뷰가 돼요'
        value={content}
        hasError={hasError}
        className='min-h-[11rem]'
        helpText={
          <div className='flex flex-row justify-between'>
            <FieldMessage
              id='review-form-error'
              message={errorMessage}
              variant={hasError ? 'error' : 'help'}
            />
            <FieldMessage
              id='review-form-help'
              message={`(${content.length}/${REVIEW_CONTENT_MAX_LENGTH})`}
              variant={hasError ? 'error' : 'help'}
            />
          </div>
        }
        onChange={handleChange}
      />
    </section>
  );
}
