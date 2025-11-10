import { twMerge } from "tailwind-merge";

type FoodSpinnerProps = {
  className?: string;
  label?: string;
};

export const FoodSpinner = ({ className, label = "Loading…" }: FoodSpinnerProps) => {
  return (
    <span
      role="status"
      aria-live="polite"
      className={twMerge(
        "food-inline-flex food-h-5 food-w-5 food-rounded-full food-border-2 food-border-primary/30 food-border-t-primary food-animate-spin",
        className
      )}
    >
      <span className="food-sr-only">{label}</span>
    </span>
  );
};


