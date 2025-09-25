import React, { useState } from "react";
import { FilterSectionProps } from "@/types/sidebarTypes";

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  limit = 5,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

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

  const visibleOptions = showAll ? options : options.slice(0, limit);

  return (
    <div className="border border-gray-200 rounded mb-4 m-[2px] mt-2 rounded-tl-[6px] rounded-tr-[6px]">
      <div 
className="w-full flex justify-between border border-gray-300 rounded-tl-[6px] rounded-tr-[6px] items-center px-4 py-2 bg-gray-200"
      >
        {title}
      </div>

      <div className="px-4 py-2 space-y-2 bg-white">
        {visibleOptions.map((opt) => (
          <label key={opt} className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              checked={selectedOptions.has(opt)}
              onChange={() => toggleOption(opt)}
              className="form-checkbox h-4 w-4 text-sm"
            />
            <span>{opt}</span>
          </label>
        ))}

        {options.length > limit && (
          <button
            onClick={() => setShowAll((a) => !a)}
            className="text-sm text-blue-600 hover:underline "
          >
            {showAll ? "Show Less" : `Show More (${options.length - limit})`}
          </button>
        )}
      </div>
    </div>
  );
};
export default FilterSection;
