type ServerErrorBody = {
  success?: boolean;
  status?: number;
  message?: string;
  code?: string;
  meta?: unknown;
};

const asRecord = (v: unknown): Record<string, unknown> | null =>
  typeof v === 'object' && v !== null ? (v as Record<string, unknown>) : null;

const tryParseJson = (text: string): unknown | null => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const isServerErrorBody = (v: unknown): v is ServerErrorBody => {
  return !!v && typeof v === 'object' && ('message' in v || 'status' in v || 'code' in v);
};

export const getErrorMessage = (e: unknown, fallback = '요청에 실패했음') => {
  // 1) string
  if (typeof e === 'string') {
    const parsed = tryParseJson(e);
    if (isServerErrorBody(parsed) && parsed.message) return parsed.message;
    return e.trim() || fallback;
  }

  const obj = asRecord(e);
  if (!obj) return fallback;

  // 2) axios: response.data
  const response = asRecord(obj.response);
  const data = response?.data;

  if (isServerErrorBody(data) && data.message) return data.message;

  if (typeof data === 'string') {
    const parsed = tryParseJson(data);
    if (isServerErrorBody(parsed) && parsed.message) return parsed.message;
    if (data.trim()) return data.trim();
  }

  // 3) Error.message
  if (typeof obj.message === 'string' && obj.message.trim()) {
    const parsed = tryParseJson(obj.message);
    if (isServerErrorBody(parsed) && parsed.message) return parsed.message;
    return obj.message.trim();
  }

  // 4) data.message
  if (isServerErrorBody(obj.data) && obj.data.message) {
    return obj.data.message;
  }

  return fallback;
};

export const getErrorStatus = (e: unknown): number | undefined => {
  // 1) string (JSON일 수도 있음)
  if (typeof e === 'string') {
    const parsed = tryParseJson(e);
    if (isServerErrorBody(parsed) && typeof parsed.status === 'number') {
      return parsed.status;
    }
    return undefined;
  }

  const obj = asRecord(e);
  if (!obj) return undefined;

  // 2) axios: response.status
  const response = asRecord(obj.response);
  if (typeof response?.status === 'number') {
    return response.status;
  }

  // 3) axios: response.data.status
  const data = response?.data;
  if (isServerErrorBody(data) && typeof data.status === 'number') {
    return data.status;
  }

  // 4) 직접 status 필드
  if (typeof obj.status === 'number') {
    return obj.status;
  }

  return undefined;
};
