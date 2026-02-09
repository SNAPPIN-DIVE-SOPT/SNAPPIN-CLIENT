import { ConfirmModal } from '@/ui/modal';

type RefuseModalProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleClickConfirm: () => void;
};

export default function RefuseModal({
  open,
  handleOpenChange,
  handleClickConfirm,
}: RefuseModalProps) {
  const handleClose = () => {
    handleOpenChange(false);
  };

  return (
    <ConfirmModal
      open={open}
      handleOpenChange={handleOpenChange}
      showCloseButton={false}
      title='예약을 거절할까요?'
      description='거절 후에는 되돌릴 수 없어요.'
      buttons={[
        { label: '아니요', size: 'medium', color: 'disabled', onClick: handleClose },
        { label: '네, 거절할게요', size: 'medium', color: 'black', onClick: handleClickConfirm },
      ]}
    />
  );
}
