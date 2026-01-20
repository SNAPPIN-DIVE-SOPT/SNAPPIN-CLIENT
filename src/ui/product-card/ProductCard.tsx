import Image from 'next/image';
import { cn } from '@/utils/cn';
import { formatNumberWithComma } from '@/utils/formatNumberWithComma';
import { TagChip } from '@/ui/index';
import { IconStar } from '@/assets';
import productPlaceholder from '@/../public/imgs/image-default.png';

export type ProductCardProps = {
  image: { src: string; alt?: string };
  name: string;
  rate: number;
  reviewCount: number;
  photographer: string;
  price: number;
  moods: string[];
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function ProductCard({
  image,
  name,
  rate,
  reviewCount,
  photographer,
  price,
  moods,
  className,
  ...props
}: ProductCardProps) {
  return (
    <div
      className={cn('flex gap-[1.2rem] w-full', className)}
      {...props}
    >
      <div className='shrink-0 relative w-[10.2rem] h-[10.2rem]'>
        <Image
          src={image.src==='' ? productPlaceholder : image.src}
          alt={image.alt ?? `${name} 상품 이미지`}
          fill
        />
      </div>
      <div className='flex min-w-0 flex-col gap-[0.3rem]'>
        <div className='flex flex-col gap-[0.5rem]'>
          <span className='caption-14-bd text-black-10 truncate'>{name}</span>
          <div className='flex flex-col gap-[0.3rem]'>
            <div className='flex gap-[0.6rem]'>
              <div className='flex items-center gap-[0.2rem]'>
                <IconStar className='text-black-8 h-[1rem] w-[1rem]' />
                <span className='caption-12-md text-black-8'>{rate}</span>
              </div>
              <div className='flex items-center gap-[0.3rem]'>
                <span className='caption-12-md text-black-10 text-right'>리뷰 {reviewCount}</span>
              </div>
            </div>
            <span className='caption-12-md text-black-7 w-[19rem] truncate'>{photographer}</span>
          </div>
        </div>
        <span className='font-16-bd text-black-10'>{formatNumberWithComma(price)}원~</span>
        <div className='scrollbar-hide flex gap-[0.4rem] overflow-scroll'>
          {moods.map((tag) => (
            <TagChip key={tag} variant='neon' label={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
