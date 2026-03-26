'use client';

import { useRouter } from 'next/navigation';
import { BottomCTAButton } from '@snappin/design-system';
import { useToast } from '@/ui';
import { ROUTES } from '@/constants/routes/routes';
import { AiCurationStep, TOTAL_STEP_COUNT } from '../../constants/steps';
import { useAiCuration } from '../../../hooks/useAiCuration';
import { usePostAiCuration } from '../../api';

type ClientFooterProps = {
  step: AiCurationStep;
};

export default function ClientFooter({ step }: ClientFooterProps) {
  const router = useRouter();
  const { error, removeToast } = useToast();
  const { selectedByStep } = useAiCuration();

  const isSelected = selectedByStep[step] != null;
  const isLast = step === TOTAL_STEP_COUNT;

  const { mutateAsync, isPending } = usePostAiCuration();

  const handleNextStep = async () => {
    if (!isSelected) {
      error('마음에 드는 사진 한 장을 선택해 주세요', undefined, 'bottom-[8rem]');
      return;
    }

    if (!isLast) {
      removeToast();
      router.push(ROUTES.AI_CURATION_STEP(step + 1));
      return;
    }

    const photoIds = Object.values(selectedByStep).filter(Boolean) as number[];

    try {
      await mutateAsync(photoIds);
      removeToast();
      router.push(ROUTES.AI_CURATION_RESULT);
    } catch {
      error('잠시 후 다시 시도해주세요.', undefined, 'bottom-[8rem]');
    }
  };

  return (
    <BottomCTAButton fixed className='z-100 px-[2rem] pb-[2rem]'>
      <BottomCTAButton.Single
        color='primary'
        size='large'
        onClick={handleNextStep}
        disabled={isPending}
      >
        {isLast ? (isPending ? '저장 중…' : '결과 보기') : '다음으로'}
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
