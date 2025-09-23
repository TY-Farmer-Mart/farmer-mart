import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@utils/helpers";
import { InputProps } from "@/types/authTypes";
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      size = "md",
      requiredIndicator = true,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    const inputSizes = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm text-left font-normal text-gray-500 md:text-gray-800"
          >
            {requiredIndicator && (
              <span className="text-red-500 inline">*</span>
            )}{" "}
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 ">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            type={inputType}
            className={cn(
              "w-full border border-gray-200 md:border-gray-400 rounded-xl",
              "placeholder:text-gray-300 shadow-md md:shadow-none text-sm",
              "disabled:bg-gray-50 disabled:cursor-not-allowed",
              inputSizes[size],
              leftIcon && "pl-10",
              (rightIcon || isPassword) && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2  transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <Eye className="w-4 h-4 text-black" />
              ) : (
                <EyeOff className="w-4 h-4 text-black" />
              )}
            </button>
          )}

          {rightIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 ">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500 text-left" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-gray-600">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
