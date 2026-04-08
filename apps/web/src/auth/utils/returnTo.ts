export type ReturnToContext = {
  returnTo?: string;
};

type SearchParamReader = {
  get(name: string): string | null;
};

const normalizeInternalReturnTo = (value: string | null | undefined) => {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return undefined;
  }

  return value;
};

export const readReturnToContext = (params: SearchParamReader): ReturnToContext => ({
  returnTo: normalizeInternalReturnTo(params.get('returnTo')),
});

export const buildReturnToParams = (context: ReturnToContext) => {
  if (!context.returnTo) {
    return undefined;
  }

  return { returnTo: context.returnTo };
};

export const serializeReturnToState = (context: ReturnToContext) => {
  const params = buildReturnToParams(context);

  return params ? new URLSearchParams(params).toString() : '';
};

export const parseReturnToState = (state: string | null) => {
  if (!state) return {};

  return readReturnToContext(new URLSearchParams(state));
};

export const resolveReturnToPath = (context: ReturnToContext, fallbackPath: string) =>
  normalizeInternalReturnTo(context.returnTo) ?? fallbackPath;
