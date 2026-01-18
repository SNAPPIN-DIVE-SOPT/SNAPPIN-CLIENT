'use client';

import { TextareaField, FieldMessage } from '@/ui';

type ReviewFormSectionProps = {
  content: string;
  handleChangeContent: (value: string) => void;
  errorMessage?: string;
  maxLength: number;
};

export default function ReviewFormSection({
  content,
  handleChangeContent,
  errorMessage,
  maxLength,
}: ReviewFormSectionProps) {
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
              message={errorMessage ?? ' '}
              variant={hasError ? 'error' : 'help'}
            />
            <FieldMessage
              id='review-form-help'
              message={`(${content.length}/${maxLength})`}
              variant={hasError ? 'error' : 'help'}
            />
          </div>
        }
        onChange={(e) => handleChangeContent(e.target.value)}
      />
    </section>
  );
}
