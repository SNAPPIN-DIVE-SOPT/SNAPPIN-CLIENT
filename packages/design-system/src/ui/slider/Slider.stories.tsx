import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Slider from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'slider/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    value: { control: 'object' },
    onChange: { action: 'changed' },
  },
  parameters: {
    docs: {
      description: {
        component: '양쪽 원을 움직여 범위를 지정하는 슬라이더 컴포넌트입니다.',
      },
    },
  },
};

export default meta;

type StorySlider = StoryObj<typeof Slider>;

export const Default: StorySlider = {
  parameters: {
    layout: 'centered',
  },
  render: (args: StorySlider['args']) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<[number, number]>(args?.value!);
    
    return (
      <div className="flex flex-col gap-[2rem] items-center w-[42rem]">
        <div className='font-16-md text-black-10'>{value[0]} ~ {value[1]}</div>
        <Slider 
          min={args?.min!}
          max={args?.max!}
          step={args?.step!}
          value={value} 
          onChange={(val) => {
            setValue(val);
            args?.onChange?.(val);
          }} 
        />
      </div>
    );
  },
  args: {
    min: 10000,
    max: 400000,
    step: 10000,
    value: [10000, 400000],
  },
};

export const PriceSlider: StorySlider = {
  parameters: {
    layout: 'centered',
  },
  render: (args: StorySlider['args']) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<[number, number]>(args?.value!);
    
    return (
      <div className='flex flex-col gap-[2.4rem] w-[42rem] p-[1.5rem] bg-black-1'>
        <div className='font-16-md text-black-10'>촬영 가격</div>
        <div className='flex justify-center gap-[0.4rem] font-16-md text-black-10'>
          <div>{value[0] / 10000}만원 ~ {value[1] / 10000}만원</div>
        </div>
        <Slider 
          min={args?.min!}
          max={args?.max!}
          step={args?.step!}
          value={value} 
          onChange={(val) => {
            setValue(val);
            args?.onChange?.(val);
          }} 
        />
      </div>
    );
  },
  args: {
    min: 10000,
    max: 400000,
    step: 10000,
    value: [10000, 400000],
  },
};