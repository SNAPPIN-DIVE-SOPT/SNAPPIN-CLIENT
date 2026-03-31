import { BottomCTAButton } from '@snappin/design-system';

type ClientFooterProps = {
  disabled?: boolean;
  handleClick?: () => void;
};

export default function ClientFooter({ disabled = false, handleClick }: ClientFooterProps) {
  return (
    <BottomCTAButton background='white' hasPadding fixed>
      <BottomCTAButton.Single
        color='black'
        size='large'
        disabled={disabled}
        onClick={handleClick}
      >
        신청 양식 복사하기
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
