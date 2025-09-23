import React, { useState, useRef, useEffect } from "react";
import {CustomSelectProps} from "@/types/marketTypes";


const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
 
      <div
        className="px-3 py-2 border-t border-b cursor-pointer outline-none bg-white"
        onClick={() => setOpen(!open)}
      >
        {selectedOption?.label || placeholder}
      </div>

      {open && (
        <div className="absolute top-full left-0 w-full border bg-white z-10 max-h-60 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
