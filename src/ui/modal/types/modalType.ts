const MODAL_TYPE = ['success', 'error', 'cancelled', 'rejected', 'confirmed'] as const;
export type ModalType = typeof MODAL_TYPE[number];