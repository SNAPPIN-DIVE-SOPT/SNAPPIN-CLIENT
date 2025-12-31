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

      <div className='bg-black-7 p-1'>black_7</div>

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
