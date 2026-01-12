'use client';

import { BottomCTAButton } from '@/ui';
import { useRouter } from 'next/navigation';

type ClientFooterProps = {
  step: number;
};

export default function ClientFooter({ step }: ClientFooterProps) {
  const router = useRouter();
  const handleNextStep = () => {
    if (step === 5) {
      router.push('/ai-curation/result');
    } else {
      router.push(`/ai-curation/${Number(step) + 1}`);
    }
  };

  return (
    <BottomCTAButton>
      <BottomCTAButton.Single color='primary' size='large' onClick={handleNextStep}>
        {step === 5 ? '결과 보기' : '다음으로'}
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
