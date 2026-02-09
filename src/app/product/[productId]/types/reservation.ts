export type ReservationDraft = {
  date: string | null;
  time: string | null;
  participantCount: number;
  durationHours: number | null;
  place: string;
  placeId: number | null;
  request: string;
};
