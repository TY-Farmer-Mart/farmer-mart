import React, { useState } from "react";
import { Input } from "@/components/common/ui/Input"; 
import { Button } from "./ui/Button";

interface TextDropdownProps {
  title: string;
  options: string[];
  onSelect?: (value: string) => void;
  limit?: number;
  showRange?: boolean; 
}

const TextDropdown: React.FC<TextDropdownProps> = ({
  title,
  options,
  onSelect,
  limit,
  showRange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll] = useState(false);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const handleGo = () => {
    console.log("Custom Range:", { min, max });
  };

  const visibleOptions = showAll ? options : limit ? options.slice(0, limit) : options;

    const isGoEnabled = min.trim() !== "" && max.trim() !== "";

  return (
<div className="border border-gray-200 bg-white rounded-tl-[6px] rounded-tr-[6px]  m-2">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex justify-between border border-grey-300 rounded-tl-[6px] rounded-tr-[6px] items-center px-4 py-2 bg-[rgb(238,236,236)]"
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
          {visibleOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect?.(opt)}
              className="w-full text-left hover:underline text-sm"
            >
              {opt}
            </button>
          ))}

          {showRange && (
            <div className="flex items-center space-x-2 pt-2">
              <Input
                type="text"
                placeholder="₹ min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-20 px-4"
              />
              <Input
                type="text"
                placeholder="₹ max"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-20 px-2"
              />
              <Button
                size="sm"
                disabled={!isGoEnabled}
                onClick={handleGo}
                className={`px-3 py-1 rounded text-white  ${
                    isGoEnabled
                    ? "bg-[#2AA699] hover:bg-[#249381]"
                    : "bg-gray-300  hover:bg-[#909191]"
                }`}
                >
                Go
                </Button>

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TextDropdown;
