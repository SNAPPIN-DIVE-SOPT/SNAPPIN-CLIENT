import Link from 'next/link';
import Image from 'next/image';
import { TagChip } from '@snappin/design-system';
import { formatPrice } from '@snappin/shared/lib';
import { IconStar } from '@snappin/design-system/assets';
import { ROUTES } from '@/constants/routes/routes';

type ProductSectionProps = {
  id: number;
  imageUrl: string;
  name: string;
  rate: number;
  reviewCount: number;
  photographer: string;
  price: number;
  moods: string[];
};

export default function ProductSection({
  id,
  imageUrl,
  name,
  rate,
  reviewCount,
  photographer,
  price,
  moods,
}: ProductSectionProps) {
  return (
    <section className='bg-black-1 flex flex-col gap-[1.6rem] px-[1.8rem] py-[1.4rem]'>
      <h2 className='caption-14-bd text-black-10'>이 작가님의 상품 살펴보기</h2>
      <Link
        href={ROUTES.PRODUCT(id)}
        aria-label={`${name} 상품 상세 페이지로 이동`}
        className='bg-black-1 flex flex-col items-start justify-center gap-[1rem] self-stretch'
      >
        <div className='flex gap-[1rem] w-full'>
          {/* 좌측 상품 이미지 */}
          <div className='relative w-[9rem] h-[9rem] shrink-0 rounded-[0.4rem] overflow-hidden'>
            <Image
              fill
              alt={`${name}`}
              src={imageUrl || '/imgs/default-image.png'}
              sizes='9rem'
              className='object-cover'
            />
          </div>
          {/* 우측 상품 정보 */}
          <div className='flex flex-col gap-[0.8rem] min-w-0'>
            {/* 이름, 가격 */}
            <div className='flex flex-col gap-[0.2rem] text-black-10'>
              <span className='caption-12-md truncate'>{name}</span>
              <span className='font-16-sb truncate'>{formatPrice(price)}원~</span>
            </div>
            {/* 무드, 작가, 별점, 리뷰 */}
            <div className='flex flex-col gap-[0.8rem]'>
              <div className='flex gap-[0.4rem]'>
                {moods.map((mood) => <TagChip key={mood} variant='gray' label={mood} />)}
              </div>
              <div className='flex gap-[1.2rem] caption-12-rg text-black-7'>
                <span>{photographer}</span>
                <div className='flex gap-[0.6rem]'>
                  <div className='flex gap-[0.2rem]'>
                    <IconStar className='w-[1rem] h-full'/>
                    <span>{rate}</span>
                  </div>
                  <span>리뷰 {reviewCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
