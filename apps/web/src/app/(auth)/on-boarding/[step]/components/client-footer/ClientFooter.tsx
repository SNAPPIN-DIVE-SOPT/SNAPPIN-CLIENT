'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { BottomCTAButton } from '@snappin/design-system';
import { buildReturnToParams, readReturnToContext } from '@/auth/utils/returnTo';
import { ROUTES } from '@/constants/routes/routes';
import { TOTAL_STEP_COUNT } from '@/app/(auth)/on-boarding/[step]/constants/onBoardingSteps';
import type { OnBoardingStep } from '@/app/(auth)/on-boarding/[step]/types/onBoardingStep';
import { useOnBoardingFormContext } from '@/app/(auth)/on-boarding/hooks/useOnBoardingFormContext';
import { usePostOnboarding } from '@/app/(auth)/on-boarding/[step]/api';
import { GenderValue } from '@/app/(auth)/on-boarding/[step]/constants/onBoardingForm.schema';

type ClientFooterProps = {
  step: number;
  triggerFields: OnBoardingStep['triggerFields'];
};

export default function ClientFooter({ step, triggerFields }: ClientFooterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnToParams = buildReturnToParams(readReturnToContext(searchParams));
  const { compatibleFormData, trigger, handleSubmitForm } = useOnBoardingFormContext();
  const { mutateAsync, isPending } = usePostOnboarding();

  const isLast = step === TOTAL_STEP_COUNT;

  const handleNextStep = async () => {
    const isValid = await trigger([...triggerFields]);

    if (!isValid) return;

    if (isLast) {
      await handleSubmitForm(async () => {
        await mutateAsync({
          name: compatibleFormData.name,
          gender: compatibleFormData.gender as GenderValue,
          nickname: compatibleFormData.nickname,
          email: compatibleFormData.email,
          snapCategories: compatibleFormData.snapCategories,
          phoneNumber: compatibleFormData.phoneNumber,
        });

        router.push(ROUTES.ON_BOARDING_FINAL(returnToParams));
      });
    } else {
      router.push(ROUTES.ON_BOARDING(step + 1, returnToParams));
    }
  };

  return (
    <BottomCTAButton fixed className='px-[2.7rem] pb-[2.8rem]'>
      <BottomCTAButton.Single
        color='black'
        size='large'
        onClick={handleNextStep}
        disabled={isPending}
      >
        다음
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
