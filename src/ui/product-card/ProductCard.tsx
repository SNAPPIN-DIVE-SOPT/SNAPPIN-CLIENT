import Image from 'next/image';
import { TagChip } from '@/ui/index';
import { IconStar } from '@/assets';
import { TagCode } from '../chip/tag-chip/types/tagCode';

function formatNumberWithComma(value: number): string {
  return new Intl.NumberFormat('ko-KR').format(value);
}

type ProductCardProps = {
  image: { src: string; alt?: string; };
  name: string;
  rating: number;
  reviewCount: number;
  photographer: string;
  price: number;
  tags: TagCode[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function ProductCard({
  image,
  name,
  rating,
  reviewCount,
  photographer,
  price,
  tags,
  ...props
}: ProductCardProps) {
  return (
    <div
      className='flex items-start gap-[1.2rem] w-[30.4rem]'
      {...props}
    >
      <div className='relative w-[10.2rem] h-[10.2rem]'>
        <Image
          src={image.src}
          alt={image.alt ?? `${name} 상품 이미지`}
          fill
          className='shrink-0 self-stretch'
        />
      </div>
      <div className='flex flex-col flex-1 shrink-0 basis-0 items-start self-stretch gap-[0.3rem]'>
        <div className='flex flex-col items-start self-stretch gap-[0.5rem]'>
          <span className='w-[19rem] self-stretch truncate caption-14-bd text-black-10'>
            {name}
          </span>
          <div className='flex flex-col items-start gap-[0.3rem]'>
            <div className='flex items-center self-stretch gap-[0.6rem]'>
              <div className='flex items-center gap-[0.2rem]'>
                <IconStar className='text-black-8' />
                <span className='caption-12-md text-black-8'>
                  {rating}
                </span>
              </div>
              <div className='flex items-center gap-[0.3rem]'>
                <span className='caption-12-md text-black-10 text-right'>
                  리뷰 {reviewCount}
                </span>
              </div>
            </div>
            <span className='self-stretch caption-12-md text-black-7'>
              {photographer}
            </span>
          </div>
        </div>
        <span className='self-stretch overflow-hidden text-ellipsis font-16-bd text-black-10'>
          {formatNumberWithComma(price)}원~
        </span>
        <div className='flex items-center self-stretch gap-[0.4rem]'>
          {tags.map((tag) => <TagChip key={tag} variant='neon' label={tag} />)}
        </div>
      </div>
    </div>
  );
}