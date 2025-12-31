import PageClient from './page.client';
import {
  IconAdd,
  IconAdd2,
  IconAddPhotoAlternate,
  IconArrowBack,
  IconArrowForward,
  IconClose,
  IconExplore,
  IconExploreFill,
  IconHeart,
  IconHeartFill,
  IconHome,
  IconHomeFill,
  IconKeyboardArrowDown,
  IconKeyboardArrowLeft,
  IconKeyboardArrowRight,
  IconKeyboardArrowUp,
  IconProfile,
  IconProfileFill,
  IconRemove,
  IconReservation,
  IconReservationFill,
  IconSearch,
} from '@/assets';
export default function Home() {
  return (
    <div>
      <div className='text-3xl font-bold underline'>Snappin</div>
      <PageClient />

      <div className='bg-black-1 p-1'>black_1</div>
      <div className='bg-black-2 p-1'>black_2</div>
      <div className='bg-black-3 p-1'>black_3</div>
      <div className='bg-black-4 p-1'>black_4</div>
      <div className='bg-black-5 p-1'>black_5</div>
      <div className='bg-black-6 p-1'>black_6</div>
      <div className='bg-black-7 p-1'>black_7</div>
      <div className='bg-black-8 p-1'>black_8</div>
      <div className='bg-black-9 p-1'>black_9</div>
      <div className='bg-black-10 p-1'>black_10</div>
      <div className='bg-neon-black p-1'>neon_black</div>
      <div className='bg-neon-white p-1'>neon_white</div>
      <div className='bg-orange p-1'>orange</div>
      <div className='bg-orange-text p-1'>orange_text</div>
      <div className='bg-green p-1'>green</div>
      <div className='bg-green-text p-1'>green_text</div>
      <div className='bg-purple p-1'>purple</div>
      <div className='bg-purple-text p-1'>purple_text</div>
      <div className='bg-blue p-1'>blue</div>
      <div className='bg-blue-text p-1'>blue_text</div>
      <div className='gradient-photo p-1'>gradient_photo</div>

      <p className='title-30-eb'>title_30_eb</p>
      <p className='title-26-eb'>title_26_eb</p>
      <p className='title-26-sb'>title_26_sb</p>
      <p className='title-23-eb'>title_23_eb</p>
      <p className='title-20-bd'>title_20_bd</p>
      <p className='font-18-bd'>font_18_bd</p>
      <p className='font-18-md'>font_18_md</p>
      <p className='font-16-bd'>font_16_bd</p>
      <p className='font-16-md'>font_16_md</p>
      <p className='caption-14-bd'>caption_14_bd</p>
      <p className='caption-14-md'>caption_14_md</p>
      <p className='caption-12-md'>caption_12_md</p>
      <p className='caption-10-md'>caption_10_md</p>

      <IconAdd />
      <IconAdd2 />
      <IconArrowBack />
      <IconArrowForward />
      <IconClose />
      <IconExplore />
      <IconHeart />
      <IconHome />
      <IconKeyboardArrowDown />
      <IconKeyboardArrowLeft />
      <IconKeyboardArrowRight />
      <IconKeyboardArrowUp />
      <IconProfile />
      <IconRemove />
      <IconReservation />
      <IconSearch />
      <IconAddPhotoAlternate />
      <IconHeart className='text-red-500' />
      <IconHome className='text-red-500' />
      <IconExplore className='text-red-500' />
      <IconProfile className='text-red-500' />
      <IconReservation className='text-red-500' />

      <IconHomeFill className='text-red-500' />
      <IconHeartFill className='text-red-500' />
      <IconExploreFill className='text-red-500' />
      <IconProfileFill className='text-red-500' />
      <IconReservationFill className='text-red-500' />
    </div>
  );
}
