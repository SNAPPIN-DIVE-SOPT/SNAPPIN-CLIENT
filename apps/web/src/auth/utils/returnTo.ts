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

export const getReturnToParam = (context: ReturnToContext) =>
  context.returnTo ? { returnTo: context.returnTo } : undefined;

export const resolveReturnToPath = (context: ReturnToContext, fallbackPath: string) =>
  context.returnTo ?? fallbackPath;
