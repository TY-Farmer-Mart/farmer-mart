import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface CityProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const CityPillsBtn: React.FC<CityProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-4 py-1 rounded-full border text-sm whitespace-nowrap transition
    ${
      isActive
        ? "bg-white border-red-500 text-red-600"
        : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700"
    }`}
    >
      {isActive && <FaMapMarkerAlt className="text-red-500" />}
      {label}
    </button>
  );
};

export default CityPillsBtn;
