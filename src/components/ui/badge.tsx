import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-muted transition-colors duration-200 hover:border-azure/50 hover:text-ice",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
