import React from "react";
import { cn } from "@utils/helpers";
import { ButtonProps } from "@/types/authTypes";
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full  md:rounded-lg  transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ";

    const variants = {
      primary:
        "px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700",
      secondary:
        "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500",
      outline:
        "border-2 border-coral-500 text-coral-500 hover:bg-coral-50 focus:ring-coral-500",
      ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
      social: "bg-white  hover:bg-gray-50 text-gray-700 focus:ring-gray-500",
    };

    const sizes = {
      sm: "text-sm  ",
      md: "text-base ",
      lg: "text-lg ",
    };
    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && "cursor-wait",
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
