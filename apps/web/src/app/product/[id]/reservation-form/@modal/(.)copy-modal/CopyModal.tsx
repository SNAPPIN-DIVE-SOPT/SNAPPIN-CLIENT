import { ResultModal } from '@snappin/design-system';

type CopyModalProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleClickConfirm: () => void;
};

export default function CopyModal({ open, handleOpenChange, handleClickConfirm }: CopyModalProps) {
  const handleClose = () => {
    handleOpenChange(false);
  };

  return (
    <ResultModal
      open={open}
      handleOpenChange={handleOpenChange}
      showCloseButton={false}
      type='success'
      title='신청 양식이 복사되었어요.'
      description='작가님 문의 채널에 붙여넣어\n예약 문의를 진행해 보세요'
      descriptionClassName='whitespace-pre-line'
      buttons={[
        { label: '닫기', size: 'medium', color: 'disabled', onClick: handleClose },
        {
          label: '작가님 채널 바로가기',
          size: 'medium',
          color: 'black',
          onClick: handleClickConfirm,
        },
      ]}
    />
  );
}
