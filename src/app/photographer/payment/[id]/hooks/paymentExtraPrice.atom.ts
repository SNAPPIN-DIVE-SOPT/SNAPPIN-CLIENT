import { atom } from 'jotai';

export type ExtraPrice = { name: string; amount: number };

export const ExtraPricesAtom = atom<ExtraPrice[]>([]);
