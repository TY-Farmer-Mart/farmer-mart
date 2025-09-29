import React from "react";
import { Button } from "@/components/common/ui/Button";
import { MoreForYouCardProps } from "@/types/authTypes";

const MoreForYouCard: React.FC<MoreForYouCardProps> = ({ heading, services }) => {
  return (
    <div className="py-5 px-0">
      <div className="max-w-full mx-auto">
        <h2 className="text-2xl font-bold xl:text-left mb-8 md:text-left lg:text-left sm:text-center">
          {heading}
        </h2>  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 md:gap-0.1 gap-0.5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`
                  bg-white p-6 text-center flex flex-col items-center h-full 
                  ${index === 3 ? "border-b md:border-b-0" : ""}
                  ${index === 0 ? "md:border-r md:border-b lg:border-b-0 lg:border-r" : ""}
                  ${index === 1 ? "md:border-b lg:border-r lg:border-b-0" : ""}
                  ${index === 2 ? "md:border-r lg:border-r" : ""}
                `}
              >
                <div className="mb-4">
                  <div className="w-14 h-14 border-2 border-blue-200 rounded-full flex items-center justify-center bg-blue-50">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                </div> 
                <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-xs flex-grow flex items-center">
                  {service.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="
                    !rounded-3xl
                    border-blue-600 text-blue-600
                    px-6 py-2 hover:!px-8 font-medium
                    hover:bg-blue-800 hover:text-white hover:border-blue-800
                    transition-all duration-300
                  "
                >
                  {service.buttonText}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoreForYouCard;