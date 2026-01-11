//로그인 시
import { MOOD_CODE } from '@/types/moodCode';

export const loginCurationMock = {
  curatedMoods: [MOOD_CODE[0], MOOD_CODE[1], MOOD_CODE[2]],
  portfolios: [
    {
      id: 1,
      photographerName: '작가명',
      images: [
        {
          imageUrl: 'https://picsum.photos/576/576?random=1',
          order: 1,
        },
        {
          imageUrl: 'https://picsum.photos/576/576?random=1',
          order: 2,
        },
      ],
      moods: [MOOD_CODE[0], MOOD_CODE[1], MOOD_CODE[2]],
    },
    {
      id: 2,
      images: [
        {
          imageUrl: 'https://picsum.photos/576/576?random=1',
          order: 1,
        },
        {
          imageUrl: 'https://picsum.photos/576/576?random=1',
          order: 2,
        },
      ],
      moods: [MOOD_CODE[0], MOOD_CODE[1], MOOD_CODE[2]],
      photographerName: '작가명',
    },
    {
      id: 3,
      images: [
        {
          imageUrl: 'https://picsum.photos/576/576?random=1',
          order: 1,
        },
        {
          imageUrl: 'https://picsum.photos/576/576?random=1',
          order: 2,
        },
      ],
      moods: [MOOD_CODE[0], MOOD_CODE[1], MOOD_CODE[2]],
      photographerName: '작가명',
    },
    {
      id: 4,
      images: [
        {
          imageUrl: 'https://picsum.photos/576/576?random=1',
          order: 1,
        },
        {
          imageUrl: 'https://picsum.photos/576/576?random=1',
          order: 2,
        },
      ],
      moods: [MOOD_CODE[0], MOOD_CODE[1], MOOD_CODE[2]],
      photographerName: '작가명',
    },
    {
      id: 5,
      images: [
        {
          imageUrl: 'https://picsum.photos/576/576?random=1',
          order: 1,
        },
        {
          imageUrl: 'https://picsum.photos/576/576?random=1',
          order: 2,
        },
      ],
      moods: [MOOD_CODE[0], MOOD_CODE[1], MOOD_CODE[2]],
      photographerName: '작가명',
    },
  ],
};

//비로그인 시
export const notLoginCurationMock = {
  popularMoods: [MOOD_CODE[0], MOOD_CODE[1], MOOD_CODE[2]],
  portfolios: [
    {
      id: 1,
      images: [
        {
          imageUrl: 'https://picsum.photos/576/576?random=1',
          order: 1,
        },
      ],
      moods: [MOOD_CODE[0], MOOD_CODE[1], MOOD_CODE[2]],
      photographerName: '작가명',
    },
    {
      id: 2,
      images: [
        {
          imageUrl: 'https://picsum.photos/576/576?random=1',
          order: 1,
        },
      ],
      photographerName: '작가명',
      moods: [MOOD_CODE[0], MOOD_CODE[1], MOOD_CODE[2]],
    },
    {
      id: 3,
      images: [
        {
          imageUrl: 'https://picsum.photos/576/576?random=1',
          order: 1,
        },
      ],
      photographerName: '작가명',
      moods: [MOOD_CODE[0], MOOD_CODE[1], MOOD_CODE[2]],
    },
  ],
};
