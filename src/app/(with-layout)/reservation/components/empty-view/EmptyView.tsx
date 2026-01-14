type EmptyViewProps = {
  title: string;
  description: string;
};

export default function EmptyView({ title, description }: EmptyViewProps) {
  return (
    <div className='bg-black-1 flex min-h-[calc(100vh-20rem)] flex-1 flex-col items-center justify-center gap-[0.4rem]'>
      <div className='font-18-bd text-black-10'>{title}</div>
      <div className='caption-14-md text-black-6'>{description}</div>
    </div>
  );
}
