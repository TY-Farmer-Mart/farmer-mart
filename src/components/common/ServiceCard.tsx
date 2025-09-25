import React from "react";
import { Button } from "@/components/common/ui/Button";
import { ServiceCardProps } from "@/types/authTypes";



const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-white p-6 text-center flex flex-col items-center h-full border border-red-700
        ${className}
      `}
    >
      {/* Icon */}
      <div className="mb-4">
        <div className="w-14 h-14 border-2 border-blue-200 rounded-full flex items-center justify-center bg-blue-50">
          <Icon className="w-7 h-7 text-blue-600" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center text-center">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-xs flex-grow flex items-center">
        {description}
      </p>

      {/* Button */}
      <Button
        variant="outline"
        size="sm"
        className="
          !rounded-3xl
          border-blue-600 text-blue-600
          px-6 py-2 hover:!px-8  font-medium
          hover:bg-blue-800 hover:text-white hover:border-blue-800
          transition-all duration-300
        "
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default ServiceCard;
