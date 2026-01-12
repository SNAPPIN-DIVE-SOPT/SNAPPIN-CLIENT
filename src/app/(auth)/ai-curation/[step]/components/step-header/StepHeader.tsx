import { formatStepNumber } from '../../utils/formatStepNumber';

type StepHeaderProps = {
  step: number;
  title: string;
};

export default function StepHeader({ step, title }: StepHeaderProps) {
  return (
    <div className='flex flex-col gap-[0.9rem] pt-[3.5rem]'>
      <h1 className='title-20-bd text-neon-black'>{formatStepNumber(Number(step))}</h1>
      <p className='title-20-bd text-black-1'>{title}</p>
    </div>
  );
}
