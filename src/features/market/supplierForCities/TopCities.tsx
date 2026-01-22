import delhi from "@/assets/cities/delhii.jpg";
import bengaluru from "@/assets/cities/Bengaluru.jpg";
import chennai from "@/assets/cities/Chennai.jpg";
import mumbai from "@/assets/cities/mumbaai.jpg";
import ahmedabad from "@/assets/cities/Ahmedabad.jpg";
import kolkata from "@/assets/cities/koolkata.jpg";
import pune from "@/assets/cities/pune.jpg";
import hydrabad from "@/assets/cities/Hydrabad.jpg";

const CITY_DATA = [
  { name: "Delhi", img: delhi, suppliers: "3,200+" },
  { name: "Mumbai", img: mumbai, suppliers: "2,800+" },
  { name: "Bengaluru", img: bengaluru, suppliers: "2,100+" },
  { name: "Hyderabad", img: hydrabad, suppliers: "1,900+" },
  { name: "Chennai", img: chennai, suppliers: "1,600+" },
  { name: "Pune", img: pune, suppliers: "1,400+" },
  { name: "Ahmedabad", img: ahmedabad, suppliers: "1,800+" },
  { name: "Kolkata", img: kolkata, suppliers: "1,300+" },
];

const TopCities = () => {
  return (
    <section className="bg-green-50 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-black-900 text-left">
          Find Suppliers from Top Cities
        </h2>
        <p className="text-black-900 text-left mt-2 mb-12">
          Strong supplier presence across major trading hubs
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {CITY_DATA.map((city) => (
            <div
              key={city.name}
              className="
                group bg-white rounded-2xl
                border border-gray-200
                p-6 text-center
                hover:border-green-600
                hover:shadow-xl
                transition
                cursor-pointer
              "
            >
              <div
                className="
                  w-24 h-24 mx-auto
                  rounded-full
                  bg-green-50
                  flex items-center justify-center
                  group-hover:bg-green-100
                  transition
                "
              >
                <img
                  src={city.img}
                  alt={city.name}
                  className="w-14 h-14 object-contain text-black-900"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-black-900">
                {city.name}
              </h3>

              <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                {city.suppliers} suppliers
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCities;
