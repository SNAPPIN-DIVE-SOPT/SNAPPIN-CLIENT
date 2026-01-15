import { TagChip } from '@/ui';

export default function page() {
  return (
    <div>
      <p className='title-30-eb'>안녕하세요 title-30-eb</p>
      <p className='title-26-eb'>안녕하세요 title-26-eb</p>
      <p className='title-26-sb'>안녕하세요 title-26-sb</p>
      <p className='title-23-eb'>안녕하세요 title-23-eb</p>
      <p className='title-20-bd'>안녕하세요 title-20-bd</p>
      <p className='font-18-bd'>안녕하세요 font-18-bd</p>
      <p className='font-18-md'>안녕하세요 font-18-md</p>
      <p className='font-16-bd'>안녕하세요 font-16-bd</p>
      <p className='font-16-md'>안녕하세요 font-16-md</p>
      <p className='caption-14-bd'>안녕하세요 caption-14-bd</p>
      <p className='caption-14-md'>안녕하세요 caption-14-md</p>
      <p className='caption-14-rg'>안녕하세요 caption-14-rg</p>
      <p className='caption-12-md'>안녕하세요 caption-12-md</p>
      <p className='caption-10-md'>안녕하세요 caption-10-md</p>
      <TagChip label='따스한' variant='neon' />
      <TagChip label='따스한' variant='gray' />
      <TagChip label='따스한' variant='transparent' />
    </div>
  );
}
