export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
    bg-white
    shadow-[0_0_10px_4px_rgba(0,0,0,0.04)]
    max-w-[45rem]
    mx-auto
    h-screen
    overflow-y-auto
  "
    >
      {children}
    </div>
  );
}
