'use client';

import { useRouter } from 'next/navigation';
import { BottomCTAButton } from '@/ui';
import type { AiCurationStep } from '../../constants/steps';
import { useAiCuration } from '../../../hooks/useAiCuration';
import { useToast } from '@/ui/toast/hooks/useToast';
import { TOTAL_STEP_COUNT } from '../../constants/steps';

type ClientFooterProps = {
  step: AiCurationStep;
};

export default function ClientFooter({ step }: ClientFooterProps) {
  const router = useRouter();
  const { error, removeToast } = useToast();
  const { selectedByStep } = useAiCuration();

  const isSelected = selectedByStep[step] != null;
  const isLast = step === TOTAL_STEP_COUNT;

  const handleNextStep = () => {
    if (!isSelected) {
      error('이미지를 선택해주세요.', undefined, 'bottom-[8rem]');
      return;
    }

    if (isLast) {
      router.push('/ai-curation/result');
      removeToast();
    } else {
      router.push(`/ai-curation/${step + 1}`);
    }
  };

  return (
    <BottomCTAButton>
      <BottomCTAButton.Single color='primary' size='large' onClick={handleNextStep}>
        {isLast ? '결과 보기' : '다음으로'}
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
