import React from "react";
import { CartItem } from "@/types/authTypes";
import { Button } from "@/components/common/ui/Button";

const TestimonialCard: React.FC<CartItem> = ({ textTop, textBottom, Btn }) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-md p-4 flex flex-col gap-5  justify-between">
      <p className="text-gray-700  sm:text-sm md:text-base lg:text-md leading-relaxed text-black">
        {textTop}
      </p>
      <div className="mt-3">
        <p className="text-gray-700  sm:text-sm md:text-base lg:text-md leading-relaxed text-black">
          {textBottom}
        </p>
        {Btn && (
          <Button
            type="button"
            size="sm"
            className="mt-2 !px-5 !py-2 !bg-blue-900 hover:!bg-blue-800 text-white text-xs sm:text-sm !rounded-3xl"
          >
            {Btn}
          </Button>
        )}
      </div>
    </div>
  );
};
export default TestimonialCard;