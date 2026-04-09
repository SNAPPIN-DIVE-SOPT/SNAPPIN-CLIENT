export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto h-dvh max-w-[45rem] shadow-[0_0_10px_4px_rgba(0,0,0,0.04)]">
      <div className="scrollbar-hide h-full overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
