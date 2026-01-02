import { TagCode } from '../types/tagCode';

// TODO: 서버 enum 확정되면 변경
export const TAG_LABEL: Record<TagCode, string> = {
  WARM: '따스한',
  FRESH: '청량한',
  CLEAR: '투명한',
  SUNNY: '햇살가득',
  DREAMY: '몽환적인',
  CHIC: '시크한',
  CALM: '차분한',
  VIVID: '활기찬',
  DIRECTED: '연출된',
  CINEMATIC: '영화같은',
  NATURAL: '자연스러운',
  SCENERY: '풍경중심',
  ROUGH: '거친',
  SEASONAL: '계절감',
  ANALOG: '아날로그',
  UNIQUE: '유니크한',
} as const;