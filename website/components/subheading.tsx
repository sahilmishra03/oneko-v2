import { cn } from "@/lib/utils";
import React from "react";

export const Subheading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "text-foreground/75 font-mono text-sm font-semibold tracking-wide uppercase",
        className,
      )}
    >
      {children}
    </h2>
  );
};
