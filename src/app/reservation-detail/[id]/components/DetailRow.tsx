'use client';

type DetailRowProps = {
  label: string;
  value: string;
};

export default function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className='flex'>
      <div className='caption-12-md text-black-7 w-[8rem]'>{label}</div>
      <div className='caption-12-md text-black-10 flex-1'>{value}</div>
    </div>
  );
}
