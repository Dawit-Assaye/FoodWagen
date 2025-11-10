import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type FoodInputProps = ComponentProps<"input"> & {
  error?: string;
  label: string;
  descriptionId?: string;
};

export const FoodInput = forwardRef<HTMLInputElement, FoodInputProps>(function FoodInput(
  { className, error, label, id, descriptionId, ...props },
  ref
) {
  const inputId = id ?? props.name;
  const mergedClassName = twMerge(
    "food-w-full food-rounded-full food-border food-border-muted food-bg-white focus:food-border-primary focus:food-ring-2 focus:food-ring-primary food-px-5 food-py-3 food-text-sm food-text-secondary food-placeholder:text-muted",
    error ? "food-border-red-500 focus:food-ring-red-500" : "",
    className
  );

  return (
    <div className="food-flex food-flex-col food-gap-2">
      <label htmlFor={inputId} className="food-text-sm food-font-medium food-text-secondary">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={descriptionId}
        className={mergedClassName}
        {...props}
      />
      {error ? (
        <p id={descriptionId} className="food-text-xs food-text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
});


