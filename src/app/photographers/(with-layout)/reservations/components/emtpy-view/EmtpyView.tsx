type EmtpyViewProps = {
  title: string;
  description: string;
};

export default function EmtpyView({ title, description }: EmtpyViewProps) {
  return (
    <div className='flex min-h-[calc(100dvh-9.5rem-7.2rem)] flex-col items-center justify-center gap-[0.4rem]'>
      <p className='font-18-bd'>{title}</p>
      <p className='caption-14-md text-black-6'>{description}</p>
    </div>
  );
}
