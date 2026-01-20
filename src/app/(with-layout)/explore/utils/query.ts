import { SearchDraft } from '@/app/(with-layout)/explore/types/search';
import { SnapCategory } from '@/constants/categories/snap-category';

export const parseInitialDraft = (sp: URLSearchParams) => {
  const snapCategory = sp.get('snapCategory') as SnapCategory;
  const placeId = sp.get('placeId');
  const placeName = sp.get('placeName');
  const date = sp.get('date');

  const peopleRaw = sp.get('peopleCount');
  const peopleCount =
    peopleRaw !== null && peopleRaw !== '' && !Number.isNaN(Number(peopleRaw))
      ? Number(peopleRaw)
      : null;

  return { snapCategory, placeId, date, peopleCount, placeName };
};

export const patchSearchParams = (
  current: URLSearchParams,
  draft: SearchDraft,
  placeName: string,
) => {
  const params = new URLSearchParams(current.toString());

  if (draft.snapCategory) params.set('snapCategory', draft.snapCategory);
  else params.delete('snapCategory');

  if (draft.placeId) {
    params.set('placeId', draft.placeId);

    if (placeName) params.set('placeName', placeName);
    else params.delete('placeName');
  } else {
    params.delete('placeId');
    params.delete('placeName');
  }

  if (draft.date) params.set('date', draft.date);
  else params.delete('date');

  if (draft.peopleCount !== null) params.set('peopleCount', String(draft.peopleCount));
  else params.delete('peopleCount');

  return params;
};

const ALLOWED_KEYS = new Set([
  'tab',
  'moodIds',
  'snapCategory',
  'placeId',
  'placeName',
  'date',
  'peopleCount',
]);

export const pickAllowedParams = (sp: URLSearchParams) => {
  const next = new URLSearchParams();
  for (const key of ALLOWED_KEYS) {
    const values = sp.getAll(key);
    for (const v of values) next.append(key, v);
  }
  return next;
};
