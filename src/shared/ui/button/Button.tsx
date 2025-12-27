import { PartialVariants } from "@/shared/lib/props/variants";
import { ButtonHTMLAttributes } from "react";
import { buttonStyles } from "@/shared/ui/button/button.css";

type ButtonProps = PartialVariants<typeof buttonStyles> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  isLoading?: boolean;
};

export default function Button({ children, type = 'button', size, variant, stroke, disabled, isLoading, ...rest }: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      className={buttonStyles({ size: size, variant: variant, stroke: stroke })}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading ? '로딩 중...' : children}
    </button>
  );
}
