import { ConfirmModal } from '@/ui/modal';

type CancelModalProps = {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  handleReservationCancel: () => void;
};

export default function CancelModal({
  open,
  handleOpenChange,
  handleReservationCancel,
}: CancelModalProps) {
  const handleClose = () => {
    handleOpenChange(false);
  };
  return (
    <ConfirmModal
      open={open}
      handleOpenChange={handleOpenChange}
      showCloseButton={false}
      title={'예약하신 스냅 일정을\n취소할까요?'}
      buttons={[
        {
          label: '아니요',
          size: 'medium',
          color: 'disabled',
          type: 'button',
          onClick: handleClose,
        },
        {
          label: '네, 취소할게요',
          size: 'medium',
          color: 'black',
          type: 'button',
          onClick: handleReservationCancel,
        },
      ]}
    />
  );
}
