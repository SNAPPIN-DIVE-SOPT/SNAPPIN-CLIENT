import { IconNotFound } from '@/assets'

export default function NotFound() {
    return (
      <div className='flex flex-col items-center justify-center h-dvh gap-[1.8rem]'>
        <IconNotFound />
        <div className='flex flex-col items-center justify-center gap-[0.8rem]'>
          <h1 className='title-20-bd text-black-10'>찾을 수 없는 페이지입니다.</h1>
          <p className='caption-12-md text-black-7'>페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.</p>
        </div>
      </div>
    )
  }