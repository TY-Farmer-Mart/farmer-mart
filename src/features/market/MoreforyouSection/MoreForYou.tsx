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
    <section className="py-10 bg-green-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <h2 className="text-3xl font-bold text-black-900 mb-12 text-left">
          {t("MORE_FOR_YOU_TEXT.HEADING")}
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = iconComponents[index] || Star;

            return (
              <div
                key={service.TITLE}
                className="
                  group relative
                  rounded-2xl
                  p-6
                  bg-white
                  border border-white/10
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]
                  overflow-hidden
                "
              >
                {/* LEFT ACCENT STRIP */}
                <div
                  className="
                    absolute left-0 top-0 h-full w-1
                    bg-gradient-to-b from-green-400 to-green-700
                    opacity-60
                    group-hover:opacity-100
                    transition
                  "
                />

                {/* ICON */}
                <div
                  className="
                    w-14 h-14
                    rounded-xl
                    bg-white/10
                    backdrop-blur
                    flex items-center justify-center
                    mb-6
                    group-hover:scale-110
                    transition
                  "
                >
                  <Icon className="w-7 h-7 text-green-400" />
                </div>

                {/* TITLE */}
                <h3 className="text-black-900 font-semibold text-lg mb-2">
                  {service.TITLE}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-black-900 text-sm leading-relaxed mb-6">
                  {service.DESCRIPTION}
                </p>

                {/* BUTTON */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="
                    text-green-400 p-2
                    border border-green-500/30
                    hover:bg-green-600 hover:text-black-900
                    transition
                  "
                >
                  {service.BUTTON}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoreForYou;
