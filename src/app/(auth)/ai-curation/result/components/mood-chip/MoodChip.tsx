import {
  IconChip따스한,
  IconChip뚜렷한,
  IconChip몽환적인,
  IconChip서사적인,
  IconChip연출된,
  IconChip차가운,
  IconChip청량한,
  IconChip투명한,
  IconChip내추럴,
  IconChip아날로그,
  IconChip디지털,
  IconChipY2k,
} from '@/assets';
import { MOOD_CODE, MOOD_CODE_INDEX, MoodCode } from '@/types/moodCode';

type MoodChipProps = {
  mood: MoodCode;
};

const mapIcon = (mood: MoodCode) => {
  switch (mood) {
    case MOOD_CODE[MOOD_CODE_INDEX.따스한]:
      return { icon: <IconChip따스한 />, location: 'left' };
    case MOOD_CODE[MOOD_CODE_INDEX.청량한]:
      return { icon: <IconChip청량한 />, location: 'left' };
    case MOOD_CODE[MOOD_CODE_INDEX.투명한]:
      return { icon: <IconChip투명한 />, location: 'left' };
    case MOOD_CODE[MOOD_CODE_INDEX.몽환적인]:
      return { icon: <IconChip몽환적인 />, location: 'left' };
    case MOOD_CODE[MOOD_CODE_INDEX.뚜렷한]:
      return { icon: <IconChip뚜렷한 />, location: 'left' };
    case MOOD_CODE[MOOD_CODE_INDEX.차가운]:
      return { icon: <IconChip차가운 />, location: 'left' };
    case MOOD_CODE[MOOD_CODE_INDEX.디지털]:
      return { icon: <IconChip디지털 />, location: 'left' };
    case MOOD_CODE[MOOD_CODE_INDEX.아날로그]:
      return { icon: <IconChip아날로그 />, location: 'left' };
    case MOOD_CODE[MOOD_CODE_INDEX.Y2K]:
      return { icon: <IconChipY2k />, location: 'left' };
    case MOOD_CODE[MOOD_CODE_INDEX.내추럴]:
      return { icon: <IconChip내추럴 />, location: 'right' };
    case MOOD_CODE[MOOD_CODE_INDEX.연출된]:
      return { icon: <IconChip연출된 />, location: 'right' };
    case MOOD_CODE[MOOD_CODE_INDEX.서사적인]:
      return { icon: <IconChip서사적인 />, location: 'right' };
    default:
      return { icon: null, location: 'left' };
  }
};

export default function MoodChip({ mood }: MoodChipProps) {
  const { icon, location } = mapIcon(mood);
  return (
    <div className='bg-black-10 flex h-[9.6rem] w-[30rem] items-center justify-center gap-[1rem] rounded-[15.6rem]'>
      {location === 'left' && icon}
      <div className='title-30-eb text-neon-black'>{mood}</div>
      {location === 'right' && icon}
    </div>
  );
}
