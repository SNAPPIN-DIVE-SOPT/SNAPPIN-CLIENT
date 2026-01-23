export default function Skeleton() {
  return (
    <section className='flex h-dvh w-full flex-col items-center'>
      <div className='bg-black-9 h-[48rem] w-full' />
      <div className='flex w-full flex-col gap-[1.2rem] px-[2rem] pt-[2rem] pb-[6rem]'>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='flex h-[1.4rem] justify-between'>
            <div className='bg-black-9 w-[9.6rem] rounded-[0.2rem]' />
            <div className='bg-black-9 w-[4.5rem] rounded-[0.2rem]' />
          </div>
          <div className='bg-black-9 h-[1.4rem] w-[3.2rem] rounded-[0.2rem]' />
        </div>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='bg-black-9 h-[1.7rem] w-[25.1rem] rounded-[0.2rem]' />
          <div className='bg-black-9 h-[1.7rem] w-[19.4rem] rounded-[0.2rem]' />
        </div>
      </div>
    </section>
  );
}
