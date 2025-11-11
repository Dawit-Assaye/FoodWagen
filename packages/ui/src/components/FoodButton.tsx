import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type FoodButtonVariant =
  | "primary"
  | "secondary"
  | "secondaryGradient"
  | "primaryGradient"
  | "ghost"
  | "danger";

export type FoodButtonProps = ComponentProps<"button"> & {
  variant?: FoodButtonVariant;
  isLoading?: boolean;
};

const variantStyles: Record<FoodButtonVariant, string> = {
  primary: "food-bg-primary food-text-white hover:food-bg-primary/90",
  secondary: "food-bg-secondary food-text-white hover:food-bg-secondary/80",
  secondaryGradient:
    "food-bg-gradient-to-r from-secondary to-primary food-text-white hover:food-bg-gradient-to-r hover:from-primary hover:to-secondary",
  primaryGradient:
    "food-bg-gradient-to-r from-primary to-secondary food-text-white hover:food-bg-gradient-to-r hover:from-secondary hover:to-primary",
  ghost: "food-bg-transparent food-text-secondary hover:food-bg-secondary/10",
  danger: "food-bg-red-600 food-text-white hover:food-bg-red-500",
};

const loadingStyles = "food-opacity-80 food-cursor-not-allowed";

export const FoodButton = forwardRef<HTMLButtonElement, FoodButtonProps>(function FoodButton(
  { variant = "primary", className, children, isLoading = false, disabled, ...props },
  ref,
) {
  const mergedClassName = twMerge(
    "food-inline-flex food-items-center food-justify-center food-rounded-full food-px-6 food-py-3 food-text-sm food-font-semibold food-transition-all food-duration-150 food-ease-out focus:food-outline-none focus-visible:food-ring-2 focus-visible:food-ring-offset-2 focus-visible:food-ring-primary active:food-scale-95",
    variantStyles[variant],
    isLoading || disabled ? loadingStyles : "",
    className,
  );

  return (
    <button ref={ref} className={mergedClassName} disabled={disabled || isLoading} {...props}>
      <span className="food-flex food-items-center food-gap-2">
        {isLoading && (
          <span
            className="food-inline-flex food-h-4 food-w-4"
            data-test-id="food-button-spinner"
            aria-hidden
          />
        )}
        {children}
      </span>
    </button>
  );
});
