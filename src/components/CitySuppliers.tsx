import React from "react";
import Delhi_img from "@assets/CityImages/Delhi.png";
import Bengaluru_img from "@assets/CityImages/Bengaluru.png";
import Chennai_img from "@assets/CityImages/Chennai.png";
import Mumbai_img from "@assets/CityImages/Mumbai.png";
import Ahmedabad_img from "@assets/CityImages/Ahmedabad.png";
import Kolkata_img from "@assets/CityImages/Kolkata.png";
import Pune_img from "@assets/CityImages/Pune.png";
import Surat_img from "@assets/CityImages/Surat.png";
import Jaipur_img from "@assets/CityImages/Jaipur.png";
import Hyderabad_img from "@assets/CityImages/Hyderabad.png";
import { CITY_SUPPLIERS } from "@/constants/textConstants";

interface City {
  icon: string;
}

const cities: City[] = [
  { icon: Delhi_img },
  { icon: Bengaluru_img },
  { icon: Chennai_img },
  { icon: Mumbai_img },
  { icon: Ahmedabad_img },
  { icon: Kolkata_img },
  { icon: Pune_img },
  { icon: Surat_img },
  { icon: Jaipur_img },
  { icon: Hyderabad_img },
];

const CitySuppliers = () => {
  return (
    <div className="mt-6">
      <section className="py-10 px-6 bg-white">
        <h2 className="text-2xl font-bold text-start mb-8">
          {CITY_SUPPLIERS.HEADING}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
          {cities.map((city) => (
            <div className="flex flex-col items-center bg-white  p-4  cursor-pointer hover:scale-125 transition-transform">
              <img src={city.icon} className="w-18 h-16 mb-2" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CitySuppliers;
