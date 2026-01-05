// TODO: 서버 enum 확정되면 변경
export const MOOD_CODE = ['따스한', '청량한', '투명한', '몽환적인', '뚜렷한', '차가운', '디지털', '아날로그', 'Y2K', '내추럴', '연출된', '서사적인'] as const;
export type MoodCode = typeof MOOD_CODE[number];