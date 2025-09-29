import React, { useState } from "react";
import { FilterSectionProps } from "@/types/sidebarTypes";

const FilterSection: React.FC<FilterSectionProps> = ({ title, options }) => {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set()
  );

  const toggleOption = (opt: string) => {
    setSelectedOptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(opt)) {
        newSet.delete(opt);
      } else {
        newSet.add(opt);
      }
      return newSet;
    });
  };

  return (
    <div className="border border-gray-200 rounded  m-1 rounded-tl-[6px] rounded-tr-[6px]">
      <div className="w-full flex justify-between border border-gray-300 rounded-tl-[6px] rounded-tr-[6px] items-center px-4 py-2 bg-gray-200">
        {title}
      </div>

      <div className="px-4 py-2 space-y-2 bg-white">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center space-x-2 text-gray-700"
          >
            <input
              type="checkbox"
              checked={selectedOptions.has(opt)}
              onChange={() => toggleOption(opt)}
              className="form-checkbox h-4 w-4 text-sm"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
export default FilterSection;
