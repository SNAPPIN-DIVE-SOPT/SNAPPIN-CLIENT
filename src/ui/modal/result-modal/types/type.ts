const RESULT_MODAL_TYPES = ['success', 'error'] as const;
export type ResultModalType = (typeof RESULT_MODAL_TYPES)[number];
