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

/**
 * 업로드하려는 이미지 파일이 형식·용량·개수 제한을 만족하는지 검사합니다.
 * @param params 검사 대상 파일과 제약 조건
 * @param params.file 검사할 이미지 파일
 * @param params.currentCount 현재까지 업로드된 이미지 개수
 * @param params.maxImageCount 업로드 가능한 최대 이미지 개수
 * @param params.allowedTypes 허용할 MIME 타입 집합 (기본값: JPG/PNG/WEBP/HEIC)
 * @param params.maxImageSize 허용할 최대 파일 용량 (bytes, 기본값: 20MB)
 * @returns 검사 결과 (`ok`와, 실패 시 사용자에게 보여줄 `message`)
 * @example const result = validateImage({ file, currentCount: 0, maxImageCount: 5 });
 */
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
