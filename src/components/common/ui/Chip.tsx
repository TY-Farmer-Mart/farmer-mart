import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface ChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, isActive, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`flex items-center gap-1 px-4 py-1 rounded-full border text-sm whitespace-nowrap transition cursor-pointer outline-none
        ${
          isActive
            ? "bg-white border-red-500 text-red-600"
            : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700"
        }
      `}
    >
      {isActive && <FaMapMarkerAlt className="text-red-500" />}
      {label}
    </div>
  );
};

export default Chip;
