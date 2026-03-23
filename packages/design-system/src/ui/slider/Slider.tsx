'use client';

type SliderProps = {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

const inputStyle = `
  absolute top-1/2 -translate-y-1/2 z-20 w-full
  appearance-none pointer-events-none bg-transparent
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:pointer-events-auto
  [&::-webkit-slider-thumb]:w-[2rem]
  [&::-webkit-slider-thumb]:h-[2rem]
  [&::-webkit-slider-thumb]:border-[0.3rem]
  [&::-webkit-slider-thumb]:border-black-10
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:bg-neon-black
  [&::-moz-range-thumb]:appearance-none
  [&::-moz-range-thumb]:pointer-events-auto
  [&::-moz-range-thumb]:w-[2rem]
  [&::-moz-range-thumb]:h-[2rem] 
  [&::-moz-range-thumb]:border-[0.3rem]
  [&::-moz-range-thumb]:border-black-10
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:bg-neon-black
`;

export default function Slider({
  min,
  max,
  step,
  value,
  onChange
}: SliderProps) {
  const [startValue, endValue] = value;
  const startPercent = (startValue - min) / (max - min) * 100;
  const endPercent = (endValue - min) / (max - min) * 100;

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange?.([Math.min(newValue, endValue), endValue]);
  };
  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange?.([startValue, Math.max(newValue, startValue)]);
  };

  return (
    <div className='relative w-full h-[2rem]'>
      <div className='absolute top-1/2 -translate-y-1/2 left-[1rem] right-[1rem] h-[0.2rem] bg-black-4' />
      <div
        className='absolute top-1/2 -translate-y-1/2 left-[1rem] right-[1rem] z-10 h-[0.3rem] rounded-full'
        style={{ 
          background: `linear-gradient(to right, transparent ${startPercent}%, #000000 ${startPercent}%, #000000 ${endPercent}%, transparent ${endPercent}%)` 
        }}
      />
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={startValue}
        className={inputStyle}
        onChange={handleStartChange}
        aria-label='최소값'
      />
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={endValue}
        className={inputStyle}
        onChange={handleEndChange}
        aria-label='최댓값'
      />
    </div>
  );
}
