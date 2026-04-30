import { ConfirmModal } from '@snappin/design-system';

type CancelModalProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleClickExit: () => void;
};

export default function CancelModal({
  open,
  handleOpenChange,
  handleClickExit,
}: CancelModalProps) {
  const handleCloseModal = () => {
    handleOpenChange(false);
  };

  return (
    <ConfirmModal
      open={open}
      handleOpenChange={handleOpenChange}
      showCloseButton={false}
      title='신청서 작성을 중단하시겠습니까?'
      description='작성하던 내용이 저장되지 않아요'
      buttons={[
        { label: '나가기', size: 'medium', color: 'disabled', onClick: handleClickExit },
        { label: '계속 작성하기', size: 'medium', color: 'black', onClick: handleCloseModal },
      ]}
    />
  );
}
