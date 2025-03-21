import * as React from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function Divider({
  className,
  orientation = "horizontal",
  ...props
}: DividerProps) {
  return (
    <div
      className={cn(
        "w-24 h-1 bg-primary",
        orientation === "vertical" && "h-24 w-1",
        className
      )}
      {...props}
    ></div>
  );
}
