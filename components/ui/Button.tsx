import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet" | "inverse";
type Size = "small" | "medium" | "large";

const SIZE_CLASS: Record<Size, string> = {
  small: "btn-sm",
  medium: "",
  large: "btn-lg",
};

type Props = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

type StyleProps = Omit<Props, "children">;

function classes({ variant = "primary", size = "medium", fullWidth, className }: StyleProps) {
  return [
    "btn",
    `btn-${variant}`,
    SIZE_CLASS[size],
    fullWidth ? "btn-block" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

/** Buttons are always fully pill-shaped — never an 8px rounded rectangle. */
export function Button({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...rest
}: Props & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">) {
  return (
    <button className={classes({ variant, size, fullWidth, className })} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...rest
}: Props & Omit<ComponentPropsWithoutRef<"a">, "className" | "children">) {
  return (
    <a className={classes({ variant, size, fullWidth, className })} {...rest}>
      {children}
    </a>
  );
}
