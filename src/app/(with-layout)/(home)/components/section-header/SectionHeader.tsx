type SectionHeaderProps = {
  title: string;
  description?: string;
};

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className='flex flex-col gap-[0.2rem]'>
      <h2 className='title-20-bd text-black-10'>{title}</h2>
      {description && <h3 className='caption-14-md text-black-8'>{description}</h3>}
    </div>
  );
}
