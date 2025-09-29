import React from "react";
import { cn } from "@utils/helpers";
import { SelectProps } from "@/types/authTypes";

export const SelectInput = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      name,
      options,
      error,
      helperText,
      requiredIndicator,
      className,
      value,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const selectId = name;

    return (
      <div className="space-y-1 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm text-left font-normal text-gray-500 md:text-gray-800"
          >
            {requiredIndicator && (
              <span className="text-red-500 inline">*</span>
            )}{" "}
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            name={name}
            ref={ref}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            className={cn(
              "w-full border border-gray-200 md:border-gray-400 rounded-xl shadow-md md:shadow-none text-sm",
              value ? "text-black" : "text-gray-400",
              "focus:text-black",
              error ? "border-red-500" : "border-gray-200 md:border-gray-400",
              className
            )}
            {...props}
          >
            <option value="" hidden>
              {label}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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

SelectInput.displayName = "SelectInput";
