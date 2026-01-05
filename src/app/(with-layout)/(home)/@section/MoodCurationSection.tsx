import { TagChip } from '@/ui/chip';
import { TagCode } from '@/ui/chip/tag-chip/types/tagCode';

export default function MoodCurationSection() {
  const tags = ['WARM', 'FRESH', 'CLEAR'];

  return (
    <div className='scrollbar-hide flex flex-col gap-[1.6rem]'>
      <div className='flex flex-col gap-[0.5rem]'>
        <span className='font-18-bd text-black-10'>요즘 많이 찾는 무드 큐레이션</span>
        <div className='flex items-end gap-[0.6rem]'>
          <div className='flex gap-[0.5rem]'>
            {tags.map((tag) => (
              <TagChip key={tag} variant='neon' label={tag as TagCode} />
            ))}
          </div>
          <p className='caption-14-md text-black-8'>스냅사진을 추천할게요</p>
        </div>
      </div>
    </div>
  );
}
