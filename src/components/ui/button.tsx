import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-sky/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "text-oncolor shadow-[0_10px_30px_-10px_rgba(59,130,246,0.7)] bg-[linear-gradient(100deg,#1d4ed8,#3b82f6_50%,#22d3ee)] [background-size:200%_auto] hover:[background-position:100%_center] hover:shadow-[0_16px_40px_-12px_rgba(59,130,246,0.85)]",
        outline:
          "glass text-fg hover:border-azure/60 hover:text-white hover:bg-white/[0.03]",
        ghost: "text-muted hover:text-white hover:bg-white/[0.05]",
        subtle:
          "bg-white/[0.04] text-fg border border-white/10 hover:border-azure/50 hover:bg-white/[0.06]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Polymorphic button: renders an <a> when `href` is provided, else a <button>.
 */
export function Button(props: ButtonProps) {
  const { className, variant, size, children, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href) {
    return (
      <a
        className={classes}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

export { buttonVariants };
