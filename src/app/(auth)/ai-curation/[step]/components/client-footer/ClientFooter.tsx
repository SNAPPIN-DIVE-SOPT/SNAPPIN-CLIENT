'use client';

import { useRouter } from 'next/navigation';
import { BottomCTAButton } from '@/ui';
import type { AiCurationStep } from '../../constants/steps';
import { useAiCuration } from '../../../hooks/useAiCuration';
import { useToast } from '@/ui/toast/hooks/useToast';
import { TOTAL_STEP_COUNT } from '../../constants/steps';
import { usePostAiCuration } from '../../../api';

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
      error('이미지를 선택해주세요.', undefined, 'bottom-[8rem]');
      return;
    }

    if (!isLast) {
      router.push(`/ai-curation/${step + 1}`);
      return;
    }

    const photoIds = Object.values(selectedByStep).filter(Boolean) as number[];

    try {
      await mutateAsync(photoIds);
      removeToast();
      router.push('/ai-curation/result');
    } catch {
      error('잠시 후 다시 시도해주세요.', undefined, 'bottom-[8rem]');
    }
  };

  return (
    <BottomCTAButton>
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