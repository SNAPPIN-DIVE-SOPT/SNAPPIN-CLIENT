import { BottomCTAButton } from '@/ui';

type ClientFooterProps = {
  disabled?: boolean;
  handleClick?: () => void;
};

export default function ClientFooter({ disabled = false, handleClick }: ClientFooterProps) {
  return (
    <BottomCTAButton background='white' hasPadding fixed>
      <BottomCTAButton.Single
        color='primary'
        size='large'
        disabled={disabled}
        onClick={handleClick}
      >
        등록하기
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
