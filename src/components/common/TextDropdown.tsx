import React, { useState } from "react";
import { Input } from "@/components/common/ui/Input";
import { Button } from "./ui/Button";
import { TextDropdownProps } from "@/types/sidebarTypes";
import { GO_BUTTON_TEXT } from "@/constants/textConstants";

const TextDropdown: React.FC<TextDropdownProps> = ({
  title,
  options,
  onSelect,
  showRange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const visibleOptions = options;

  const isGoEnabled = min.trim() !== "" && max.trim() !== "";

  return (
    <div className="border border-gray-200 bg-white rounded-tl-[6px] rounded-tr-[6px] m-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between border border-gray-300 rounded-tl-[6px] rounded-tr-[6px] items-center px-4 py-2 bg-gray-200"
      >
        <span className="font-medium">{title}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 py-2 space-y-2 max-h-60 overflow-y-auto">
          {visibleOptions.map((opt, idx) => {
            const isObject = typeof opt === "object" && opt !== null;
            const label = isObject ? opt.label : opt;
            const image = isObject ? opt.image : null;
            return (
              <button
                key={idx}
                onClick={() => onSelect?.(label)}
                className="w-full flex items-center gap-2 text-left hover:underline text-sm"
              >
                {image && (
                  <img
                    src={image}
                    alt={label}
                    className="w-14 h-14 object-cover rounded"
                  />
                )}
                {label}
              </button>
            );
          })}

          {showRange && (
            <div className="flex items-center space-x-2 pt-2">
              <Input
                type="number"
                placeholder="₹ min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-22 px-2"
              />
              <Input
                type="number"
                placeholder="₹ max"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-20 px-2"
              />
              <Button
                size="sm"
                disabled={!isGoEnabled}
                className={`px-3 py-1 rounded text-white ${
                  isGoEnabled
                    ? "bg-primary hover:bg-primary-hover"
                    : "bg-gray-300 hover:bg-gray-350"
                }`}
              >
                {GO_BUTTON_TEXT}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TextDropdown;
