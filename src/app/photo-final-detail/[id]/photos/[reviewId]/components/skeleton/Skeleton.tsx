export default function Skeleton() {
  return (
    <div className='flex h-full w-full flex-col items-center gap-[3.8rem]'>
      <div className='bg-black-9 w-full flex-1' />
      <div className='w-full px-[2rem] pt-[2rem] pb-[6rem]'>
        <div className='flex items-center justify-between'>
          <div className='bg-black-9 h-[1.4rem] w-[10rem] rounded-[0.2rem]' />
          <div className='bg-black-9 h-[1.4rem] w-[6rem] rounded-[0.2rem]' />
        </div>
        <div className='bg-black-9 mt-[0.6rem] h-[1.4rem] w-[3.2rem] rounded-[0.2rem]' />
        <div className='bg-black-9 mt-[1.2rem] h-[1.4rem] w-[25rem] rounded-[0.2rem]' />
        <div className='bg-black-9 mt-[1.2rem] h-[1.4rem] w-[19rem] rounded-[0.2rem]' />
      </div>
    </div>
  );
}
