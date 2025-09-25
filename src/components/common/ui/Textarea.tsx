import React from "react";
import { cn } from "@utils/helpers";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-1 w-full">
        {label && (
          <label className="block text-sm text-left font-normal text-gray-500 md:text-gray-800">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full border border-gray-200 md:border-gray-400 rounded-xl shadow-md md:shadow-none placeholder:text-gray-300 text-left align-top px-4 py-2 h-20 resize-none",
            "disabled:bg-gray-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500 text-left" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && <p className="text-sm text-gray-600">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
