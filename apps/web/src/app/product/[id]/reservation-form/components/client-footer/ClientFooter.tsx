'use client';

import { BottomCTAButton } from '@snappin/design-system';

type ClientFooterProps = {
  disabled?: boolean;
  handleClick?: () => Promise<boolean>;
  handleCopySuccess?: () => void;
};

export default function ClientFooter({
  disabled = false,
  handleClick,
  handleCopySuccess,
}: ClientFooterProps) {
  const handleCopyButtonClick = async () => {
    const isCopied = handleClick ? await handleClick() : false;
    if (isCopied) {
      handleCopySuccess?.();
    }
  };

  return (
    <div className='h-[8.4rem]'>
      <BottomCTAButton background='white' hasPadding fixed>
        <BottomCTAButton.Single
          color='black'
          size='large'
          disabled={disabled}
          onClick={handleCopyButtonClick}
        >
          신청 양식 복사하기
        </BottomCTAButton.Single>
      </BottomCTAButton>
    </div>
  );
}
