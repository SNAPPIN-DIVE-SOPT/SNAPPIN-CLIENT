import { IMAGE_ACCEPT, MAX_IMAGE_SIZE } from '@snappin/shared/constants';

type ValidateImageParams = {
  file: File;
  currentCount: number;
  maxImageCount: number;
  allowedTypes?: Set<string>;
  maxImageSize?: number;
};

type ValidateImageResult = {
  ok: boolean;
  message?: string;
};

const DEFAULT_ALLOWED_TYPES = new Set(IMAGE_ACCEPT.WITH_HEIC.split(','));

const validateImage = ({
  file,
  currentCount,
  maxImageCount,
  allowedTypes = DEFAULT_ALLOWED_TYPES,
  maxImageSize = MAX_IMAGE_SIZE,
}: ValidateImageParams): ValidateImageResult => {
  // 이미지 확장자 검사
  const isInvalidType = !allowedTypes.has(file.type);
  if (isInvalidType) return { ok: false, message: 'JPG/PNG/WEBP/HEIC만 업로드 가능해요.' };

  // 이미지 용량 검사
  const isOversized = file.size > maxImageSize;
  if (isOversized) return { ok: false, message: '이미지 하나당 최대 20MB까지 업로드 가능해요.' };

  // 이미지 개수 검사
  const exceedsCount = currentCount + 1 > maxImageCount;
  if (exceedsCount) return { ok: false, message: `최대 ${maxImageCount}장까지 업로드 가능해요.` };

  return { ok: true };
};

export default validateImage;
