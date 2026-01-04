const PAD_WIDTH = 2;
const PAD_CHAR = '0';
const DATE_SPLITTER = '-';

export const pad2 = (num: number) => String(num).padStart(PAD_WIDTH, PAD_CHAR);

export const toISO = (date: Date) => {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}${DATE_SPLITTER}${m}${DATE_SPLITTER}${d}`;
};

export const fromISO = (iso: string) => {
  const [y, m, d] = iso.split(DATE_SPLITTER).map(Number);
  return new Date(y, m - 1, d);
};

export const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
export const addMonths = (d: Date, delta: number) =>
  new Date(d.getFullYear(), d.getMonth() + delta, 1);
export const daysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

export const compareISO = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
