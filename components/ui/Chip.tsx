import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tone?: "neutral" | "outline" | "accent" | "dark";
  size?: "small" | "medium";
};

export function Chip({ children, tone = "neutral", size = "medium" }: Props) {
  return (
    <span className={`chip chip-${tone}${size === "small" ? " chip-sm" : ""}`}>{children}</span>
  );
}
