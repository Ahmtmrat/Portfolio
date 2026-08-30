import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  tone?: "blue" | "inverse";
  size?: "small" | "medium";
} & Omit<ComponentPropsWithoutRef<"a">, "children">;

/** Every text link in this system carries the chevron; it nudges 2px on hover. */
export function LinkArrow({ children, tone = "blue", size = "medium", ...rest }: Props) {
  const cls = [
    "link-arrow",
    tone === "inverse" ? "link-arrow-inverse" : "",
    size === "small" ? "link-arrow-sm" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={cls} {...rest}>
      <span className="label">{children}</span>
      <span className="chevron" aria-hidden="true">
        ›
      </span>
    </a>
  );
}
