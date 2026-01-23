export default function Skeleton() {
  return (
    <section className='flex flex-col items-center w-full h-dvh'>
      <div className='w-full h-[48rem] bg-black-9' />
      <div className='flex flex-col gap-[1.2rem] w-full px-[2rem] pt-[2rem] pb-[6rem]'>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='flex justify-between h-[1.4rem]'>
            <div className='w-[9.6rem] bg-black-9 rounded-[0.2rem]' />
            <div className='w-[4.5rem] bg-black-9 rounded-[0.2rem]' />
          </div>
          <div className='w-[3.2rem] h-[1.4rem] bg-black-9 rounded-[0.2rem]' />
        </div>
        <div className='flex flex-col gap-[0.6rem]'>
          <div className='w-[25.1rem] h-[1.7rem] bg-black-9 rounded-[0.2rem]' />
          <div className='w-[19.4rem] h-[1.7rem] bg-black-9 rounded-[0.2rem]' />
        </div>
      </div>
    </section>
  );
}