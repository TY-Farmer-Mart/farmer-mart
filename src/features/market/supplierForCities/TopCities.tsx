import React from "react";
import delhi from "@/assets/cities/delhii.jpg";
import bengaluru from "@/assets/cities/Bengaluru.jpg";
import chennai from "@/assets/cities/Chennai.jpg";
import mumbai from "@/assets/cities/mumbaai.jpg";
import ahmedabad from "@/assets/cities/Ahmedabad.jpg";
import kolkata from "@/assets/cities/koolkata.jpg";
import pune from "@/assets/cities/pune.jpg";
import surat from "@/assets/cities/suurat.jpg";
import jaipur from "@/assets/cities/jaipur.jpg";
import hydrabad from "@/assets/cities/Hydrabad.jpg";
import { useTranslation } from "react-i18next";
import { CITY_KEYS } from "@/constants/textConstants";

const IMAGES: Record<string, string> = {
  Delhi: delhi,
  Bengaluru: bengaluru,
  Chennai: chennai,
  Mumbai: mumbai,
  Ahmedabad: ahmedabad,
  Kolkata: kolkata,
  Pune: pune,
  Surat: surat,
  Jaipur: jaipur,
  Hyderabad: hydrabad,
};

const TopCities: React.FC = () => {
  const { t } = useTranslation();

  const cities = t("TOP_CITIES.LIST", { returnObjects: true }) as string[];

  return (
    <section className="w-full px-4 py-8 bg-gray-100 mt-4">
      <h2 className="text-left text-2xl md:text-3xl font-semibold text-black-500 mb-8">
        {t("TOP_CITIES.HEADING")}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8 gap-x-6 bg-white p-5 rounded-xl">
        {cities.map((city, index) => (
          <div
            key={city}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full border border-gray-300 p-4 transition-transform group-hover:scale-110">
              <img
                src={IMAGES[CITY_KEYS[index]]}
                alt={city}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mt-3 text-gray-800 font-medium">{city}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCities;
