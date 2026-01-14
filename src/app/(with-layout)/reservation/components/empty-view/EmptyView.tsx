type EmptyViewProps = {
  title: string;
  description: string;
};

// TODO: 비로그인 시 토스트 추가
export default function EmptyView({ title, description }: EmptyViewProps) {
  return (
    <div className='flex h-[calc(100dvh-7.2rem-5rem-4.5rem)] flex-col items-center justify-center gap-[0.4rem] px-[2rem] text-center'>
      <div className='font-18-bd text-black-10'>{title}</div>
      <div className='caption-14-md text-black-6'>{description}</div>
    </div>
  );
}
