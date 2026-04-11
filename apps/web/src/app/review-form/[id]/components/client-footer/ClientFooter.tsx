import { BottomCTAButton } from '@snappin/design-system';

type ClientFooterProps = {
  label: string;
  disabled?: boolean;
  handleClick?: () => void;
};

export default function ClientFooter({ label, disabled = false, handleClick }: ClientFooterProps) {
  return (
    <BottomCTAButton background='white' hasPadding fixed>
      <BottomCTAButton.Single
        color='primary'
        size='large'
        disabled={disabled}
        onClick={handleClick}
      >
        {label}
      </BottomCTAButton.Single>
    </BottomCTAButton>
  );
}
