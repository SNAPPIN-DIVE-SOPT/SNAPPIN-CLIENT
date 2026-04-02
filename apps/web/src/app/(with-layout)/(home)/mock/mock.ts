import { ProductFrameProps } from '@/ui/frame/product/ProductFrame';

const BASE_PRODUCT: ProductFrameProps = {
  id: 1,
  image: {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    alt: '포트레이트 예시 이미지',
  },
  name: '프리미엄 인물 스냅',
  photographer: '아름 돈',
  rate: 4.5,
  price: 50000,
  reviewCount: 100,
  moods: ['내추럴', '따스한'],
  isLiked: true,
};

export const MOCK: ProductFrameProps[] = [
  { ...BASE_PRODUCT },
  { ...BASE_PRODUCT, id: 2, name: '야외 커플 스냅' },
  { ...BASE_PRODUCT, id: 3, name: '데이트 무드 스냅' },
];
