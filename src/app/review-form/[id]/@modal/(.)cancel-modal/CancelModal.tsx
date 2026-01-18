import { ConfirmModal } from '@/ui/modal';

type CancelModalProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleClickConfirm: () => void;
};

export default function CancelModal({
  open,
  handleOpenChange,
  handleClickConfirm,
}: CancelModalProps) {
  const handleClose = () => {
    handleOpenChange(false);
  };

  return (
    <ConfirmModal
      open={open}
      handleOpenChange={handleOpenChange}
      showCloseButton={false}
      title='리뷰 작성을 그만둘까요?'
      description='작성된 내용은 저장되지 않습니다.'
      buttons={[
        { label: '아니요', size: 'medium', color: 'disabled', onClick: handleClose },
        { label: '네, 그만둘게요', size: 'medium', color: 'black', onClick: handleClickConfirm },
      ]}
    />
  );
}
