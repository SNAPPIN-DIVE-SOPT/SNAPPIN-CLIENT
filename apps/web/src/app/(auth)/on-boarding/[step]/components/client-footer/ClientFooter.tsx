'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BottomCTAButton } from '@snappin/design-system';
import { getReturnToParam, readReturnToContext } from '@/auth/utils/returnTo';
import { ROUTES } from '@/constants/routes/routes';
import { useToast } from '@/ui';
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
  const returnToParams = getReturnToParam(readReturnToContext(searchParams));
  const { compatibleFormData, trigger, handleSubmitForm } = useOnBoardingFormContext();
  const { error } = useToast();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const { mutateAsync, isPending } = usePostOnboarding({
    onSuccess: () => {
      router.push(ROUTES.ON_BOARDING_FINAL(returnToParams));
    },
    onError: () => {
      error('온보딩에 실패했어요. 홈으로 이동합니다.', 'bottom-[8.4rem]');

      timeoutRef.current = setTimeout(() => {
        router.push(ROUTES.HOME);
      }, 2000);
    },
  });

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
