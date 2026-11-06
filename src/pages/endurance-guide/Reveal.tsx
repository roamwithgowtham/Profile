import type { ReactNode } from "react";
import { useReveal } from "./useReveal";

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const classes = ["reveal", visible && "is-visible", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
