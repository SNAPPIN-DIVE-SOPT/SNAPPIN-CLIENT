type EmptyViewProps = {
  title: string;
  description: string;
};

export default function EmptyView({ title, description }: EmptyViewProps) {
  return (
    <div className='bg-black-1 flex min-h-[calc(100dvh-7.2rem-5rem-4.5rem)] flex-1 flex-col items-center justify-center gap-[0.4rem]'>
      <h1 className='font-18-bd text-black-10'>{title}</h1>
      <p className='caption-14-md text-black-6'>{description}</p>
    </div>
  );
}
