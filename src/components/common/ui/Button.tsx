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
      "inline-flex items-center justify-center font-small rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700",
      secondary:
        "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500",
      outline:
        "border-2 border-coral-500 text-coral-500 hover:bg-coral-50 focus:ring-coral-500",
      ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
      social: "bg-white  hover:bg-gray-50 text-gray-700 focus:ring-gray-500",
      viewAll:
        "mt-4 bg-green-300 text-white px-8 ml-6 py-2 rounded hover:underline transition text-sm md:text-base",
      addToCart:
        "flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 text-xs md:text-sm md:rounded rounded-md p-1  font-semibold flex items-center justify-center md:gap-2 gap-1",
      buyNow:
        "flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded font-semibold flex items-center text-xs md:text-sm md:rounded rounded-md p-1  justify-center gap-2",

      pillScroll: "px-4 py-2  text-xl transition text-center ",
      circle:
        "w-6 h-6 rounded-full flex items-center justify-center border border-gray-400 text-base",
      activeCity: "bg-white border-red-500 text-red-600",
      inactiveCity: "bg-white hover:bg-gray-100 border-gray-300 text-gray-700",
      location:
        "bg-white text-blue-600 ",
      submit: "bg-gray-200 text-black hover:bg-gray-300 px-4 rounded-md",
      textLink: "text-blue-600 hover:underline bg-transparent p-0",
      close:
        "absolute top-3 right-3 text-gray-600 hover:text-black text-xl bg-transparent p-0",
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
          variant !== "pillScroll" && sizes[size],

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
