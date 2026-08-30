import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  status?: "available" | "info" | "caution" | "dark";
  dot?: boolean;
};

export function Badge({ children, status = "available", dot = true }: Props) {
  return (
    <span className={`badge badge-${status}`}>
      {dot && <span className="dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
