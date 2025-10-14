import { HelpCardProps } from "@/types/helpTypes";
import React from "react";

const HelpCard: React.FC<HelpCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt = "",
}) => {
  return (
    <div className="bg-white shadow-md h-[200px] rounded-xl p-6 flex flex-col items-center text-center w-full hover:shadow-xl transition">
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="mb-4 w-20 h-20 object-contain"
        />
      )}
      <h3 className="text-xl font-semibold  mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
    </div>
  );
};

export default HelpCard;
