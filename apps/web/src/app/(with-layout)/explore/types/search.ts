export type SearchQuery = {
  snapCategory?: string;
  placeId?: string;
  date?: string;
  peopleCount?: string;
};

export type SearchDraft = {
  snapCategory: string | null;
  placeId: string | null;
  date: string | null;
  peopleCount: number | null;
};

export type SearchField = 'snapCategory' | 'date' | 'peopleCount' | 'placeId' | undefined;
