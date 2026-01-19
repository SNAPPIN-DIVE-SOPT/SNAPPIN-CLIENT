export function PortfolioSkeleton() {
  return <div className='bg-black-3 aspect-square min-h-[11.2rem] min-w-[11.2rem] shrink-0' />;
}

export function PortfolioListSkeleton() {
  return (
    <div className='grid grid-cols-3 items-center justify-center gap-[0.2rem]'>
      {Array.from({ length: 15 }).map((_, i) => (
        <PortfolioSkeleton key={i} />
      ))}
    </div>
  );
}
