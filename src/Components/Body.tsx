import { PropsWithChildren } from "react";
import clsx from "clsx";

export const Body = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={clsx("h-full w-full bg-gray-800 overflow-y-scroll", className)}
  >
    {children}
  </div>
);
