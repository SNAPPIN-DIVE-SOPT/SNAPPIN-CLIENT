import React from "react";
import { cn } from "@/shared/lib/cn";

type NavigationProps = React.HTMLAttributes<HTMLElement> & {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
};

export default function Navigation({
  left,
  center,
  right,
  className,
}: NavigationProps) {
  return (
    <nav
      className={cn(
        "w-full flex items-center justify-between px-[3rem] py-[1rem] h-[5.5rem]",
        className
      )}
    >
      <div className="flex-1 text-left">{left}</div>
      <div className="flex-1 text-center">{center}</div>
      <div className="flex-1 text-right">{right}</div>
    </nav>
  );
}
