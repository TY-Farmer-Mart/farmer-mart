import React from "react";
import { Star, Store, Smartphone, Calculator } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/common/ui/Button";

const MoreForYou: React.FC = () => {
  const iconComponents = [Star, Store, Smartphone, Calculator];
  const { t } = useTranslation();

  const services = t("MORE_FOR_YOU_TEXT.SERVICES", {
    returnObjects: true,
  }) as Array<{
    TITLE: string;
    DESCRIPTION: string;
    BUTTON: string;
  }>;

  return (
    <div className="mt-2 bg-gray-100">
      <div className="max-w-full mx-auto p-8 rounded-md shadow-sm">
        <h2 className="text-3xl font-bold text-black-500 mb-8 text-left">
          {t("MORE_FOR_YOU_TEXT.HEADING")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = iconComponents[index] || Star;

            return (
              <div
                key={service.TITLE}
                className={`
                  bg-white p-6 text-center flex flex-col items-center h-full
                  ${index === 3 ? "border-b md:border-b-0 rounded-r-lg " : ""}
                  ${
                    index === 0
                      ? "md:border-r md:border-b lg:border-b-0 lg:border-r rounded-l-lg"
                      : ""
                  }
                  ${index === 1 ? "md:border-b lg:border-r lg:border-b-0" : ""}
                  ${index === 2 ? "md:border-r lg:border-r" : ""}
                  border-gray-200
                `}
              >
                <div className="mb-4">
                  <div className="w-14 h-14 border-2 border-blue-200 rounded-full flex items-center justify-center bg-blue-50">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                </div>

                <h3 className="text-base font-semibold text-gray-900 mb-2 text-center">
                  {service.TITLE}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-xs flex-grow flex items-center">
                  {service.DESCRIPTION}
                </p>

                <Button
                  variant="outline"
                  size="sm"
                  className="
                    !rounded-lg           
                    border-blue-600 text-blue-600
                    px-6 py-2 font-medium
                    hover:bg-blue-800 hover:text-white hover:border-blue-800
                    transition-all duration-300
  "
                >
                  {service.BUTTON}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoreForYou;
