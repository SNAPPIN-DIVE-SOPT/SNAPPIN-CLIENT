import { MoodCode } from '@/types/moodCode';

export const MOCK_PRODUCTS = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  imageUrl: '/imgs/image-default.png',
  title: `인물 스냅 촬영 ${i + 1}`,
  rate: 4.5 + (i % 5) * 0.1, // 4.5 ~ 4.9
  reviewCount: 10 + i * 2,
  photographer: `김사진${i + 1}`,
  price: 120000 + i * 5000,
  moods: ['따스한', '자연스러운', '청량한'] as MoodCode[],
}));
