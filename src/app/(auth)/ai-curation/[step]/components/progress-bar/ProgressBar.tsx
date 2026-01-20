type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className='bg-black-8 h-[0.6rem] w-full rounded-[0.6rem]'>
      <div
        className='bg-neon-black h-[0.6rem] rounded-[0.6rem]'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
