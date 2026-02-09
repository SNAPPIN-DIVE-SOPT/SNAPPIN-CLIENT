import { ConfirmModal } from '@/ui/modal';

type CompleteModalProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleClickConfirm: () => void;
};

export default function CompleteModal({
  open,
  handleOpenChange,
  handleClickConfirm,
}: CompleteModalProps) {
  const handleClose = () => {
    handleOpenChange(false);
  };

  return (
    <ConfirmModal
      open={open}
      handleOpenChange={handleOpenChange}
      showCloseButton={false}
      title='결제 요청을 보내시겠어요?'
      description='결제 요청 후에는 변경할 수 없어요.'
      buttons={[
        { label: '아니요', size: 'medium', color: 'disabled', onClick: handleClose },
        { label: '네, 확정할게요', size: 'medium', color: 'black', onClick: handleClickConfirm },
      ]}
    />
  );
}
