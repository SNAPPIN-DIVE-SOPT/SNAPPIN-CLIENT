import { ComponentProps } from 'react';
import { FilterChip, Slider } from '@snappin/design-system';
import {
  MAX_PRICE,
  MIN_PRICE,
  QUICK_MAX_PRICE,
  QUICK_MIN_PRICE,
  STEP,
} from '@/app/(with-layout)/explore/constants/price';

const toManwon = (value: number) => value / 10_000;

type SliderProps = ComponentProps<typeof Slider>;
type PriceSliderProps = Omit<SliderProps, 'min' | 'max' | 'step'> & {
  min?: SliderProps['min'];
  max?: SliderProps['max'];
  step?: SliderProps['step'];
};

export default function PriceSlider({
  min = MIN_PRICE,
  max = MAX_PRICE,
  step = STEP,
  value,
  onChange,
}: PriceSliderProps) {
  return (
    <div className='flex flex-col gap-[2.4rem] px-[0.75rem]'>
      <span className='font-16-md text-black-10 gap-[0.4rem] text-center'>
        {toManwon(value[0])}만원 ~ {toManwon(value[1])}만원
      </span>
      <Slider min={min} max={max} step={step} value={value} onChange={onChange} />
      <div className='flex flex-row justify-between gap-[0.6rem] py-[0.75rem]'>
        <FilterChip
          label={`${toManwon(QUICK_MIN_PRICE)}만원 미만`}
          isSelected={value[0] === MIN_PRICE && value[1] === QUICK_MIN_PRICE}
          onClick={() => onChange([MIN_PRICE, QUICK_MIN_PRICE])}
          className='w-full'
        />
        <FilterChip
          label={`${toManwon(QUICK_MIN_PRICE)} ~ ${toManwon(QUICK_MAX_PRICE)}만원`}
          isSelected={value[0] === QUICK_MIN_PRICE && value[1] === QUICK_MAX_PRICE}
          onClick={() => onChange([QUICK_MIN_PRICE, QUICK_MAX_PRICE])}
          className='w-full'
        />
        <FilterChip
          label={`${toManwon(QUICK_MAX_PRICE)}만원 이상`}
          isSelected={value[0] === QUICK_MAX_PRICE && value[1] === MAX_PRICE}
          onClick={() => onChange([QUICK_MAX_PRICE, MAX_PRICE])}
          className='w-full'
        />
      </div>
    </div>
  );
}
