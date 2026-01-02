import Image from 'next/image';
import { cn } from '@/utils/cn';
import { formatNumberWithComma } from '@/utils/formatNumberWithComma';
import { TagChip } from '@/ui/index';
import { IconStar } from '@/assets';
import { TagCode } from '../chip/tag-chip/types/tagCode';

type ProductCardProps = {
  image: { src: string; alt?: string; };
  name: string;
  rating: number;
  reviewCount: number;
  photographer: string;
  price: number;
  tags: TagCode[];
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function ProductCard({
  image,
  name,
  rating,
  reviewCount,
  photographer,
  price,
  tags,
  className,
  ...props
}: ProductCardProps) {
  return (
    <div
      className={cn('flex gap-[1.2rem] w-[30.4rem]', className)}
      {...props}
    >
      <div className='shrink-0 relative w-[10.2rem] h-[10.2rem]'>
        <Image
          src={image.src}
          alt={image.alt ?? `${name} 상품 이미지`}
          fill
        />
      </div>
      <div className='flex flex-col gap-[0.3rem] min-w-0'>
        <div className='flex flex-col gap-[0.5rem]'>
          <span className='truncate caption-14-bd text-black-10'>
            {name}
          </span>
          <div className='flex flex-col gap-[0.3rem]'>
            <div className='flex gap-[0.6rem]'>
              <div className='flex items-center gap-[0.2rem]'>
                <IconStar className='w-[1rem] h-[1rem] text-black-8' />
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
            <span className='w-[19rem] truncate caption-12-md text-black-7'>
              {photographer}
            </span>
          </div>
        </div>
        <span className='font-16-bd text-black-10'>
          {formatNumberWithComma(price)}원~
        </span>
        <div className='flex gap-[0.4rem] overflow-scroll scrollbar-hide'>
          {tags.map((tag) => <TagChip key={tag} variant='neon' label={tag} />)}
        </div>
      </div>
    </div>
  );
}