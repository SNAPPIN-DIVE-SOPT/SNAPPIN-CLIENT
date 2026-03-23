type SliderProps = {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function Slider({
  min = 10000,
  max = 400000,
  step = 10000,
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

  const inputStyle = `absolute top-1/2 -translate-y-1/2 z-20 w-full
    appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto
    [&::-webkit-slider-thumb]:w-[2rem] [&::-webkit-slider-thumb]:h-[2rem] [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:border-[0.3rem] [&::-webkit-slider-thumb]:border-black-10 [&::-webkit-slider-thumb]:bg-neon-black`;

  return (
    <div className='relative w-full h-[2rem]'>
      <div className='absolute top-1/2 -translate-y-1/2 left-[1rem] right-[1rem] h-[2px] bg-black-4' />
      <div
        className='absolute top-1/2 -translate-y-1/2 left-[1rem] right-[1rem] z-10 h-[3px] rounded-full'
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
      />
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={endValue}
        className={inputStyle}
        onChange={handleEndChange}
      />
    </div>
  );
}