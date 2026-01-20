import { BottomCTAButton, Button } from '@/ui';

type SearchFooterProps = {
  handleResetClick?: () => void;
  handleConfirmClick?: () => void;
};

export default function SearchFooter({ handleResetClick, handleConfirmClick }: SearchFooterProps) {
  return (
    <BottomCTAButton>
      <BottomCTAButton.Double
        className={'justify-between px-[2rem] pb-[2.6rem]'}
        leftButton={
          <Button
            onClick={handleResetClick}
            color='white'
            className='caption-14-bd w-[8.2rem] border-0 py-[1.15rem]'
          >
            전체 해제
          </Button>
        }
        rightButton={
          <Button
            onClick={handleConfirmClick}
            color='black'
            className='caption-14-bd w-[8.2rem] rounded-[0.4rem] py-[1.25rem]'
          >
            검색
          </Button>
        }
      />
    </BottomCTAButton>
  );
}
