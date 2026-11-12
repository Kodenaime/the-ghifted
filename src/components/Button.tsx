import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react"
import { Magnetic } from "./Magnetic"

type Variant = "primary" | "gold" | "ghost"

type CommonProps = {
  variant?: Variant
  size?: "md" | "lg"
  className?: string
  children: ReactNode
}

type ButtonProps =
  | (CommonProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  | (CommonProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)

const variants: Record<Variant, string> = {
  primary:
    "bg-pine text-ivory hover:bg-forest focus-visible:bg-forest shadow-soft",
  gold: "bg-gold text-forest hover:bg-champagne shadow-soft",
  ghost:
    "border border-ink/15 text-ink hover:bg-ink hover:text-ivory hover:border-ink",
}

const sizes = {
  md: "px-6 py-3 text-[15px]",
  lg: "px-8 py-4 text-base",
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-[12px] font-semibold transition-colors duration-200 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <Magnetic>
      {"href" in rest && rest.href !== undefined ? (
        <a className={classes} {...rest}>
          {children}
        </a>
      ) : (
        <button
          type="button"
          className={classes}
          {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      )}
    </Magnetic>
  )
}
