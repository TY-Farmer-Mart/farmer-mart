import React, { useState, useRef, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { LOCATION_SEARCH } from "@/constants/textConstants";

const cities = [
  "Salem",
  "Bengaluru",
  "Dharmapuri",
  "Namakkal",
  "Erode",
  "Coimbatore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Mumbai",
];

const nearbyLocations = [
  "Whitefield",
  "HSR Layout",
  "Koramangala",
  "Electronic City",
  "Marathahalli",
];

const SCROLL_AMOUNT = 150;

const LocationSearch: React.FC = () => {
  const [activeCity, setActiveCity] = useState<string>("Salem");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pillContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const filteredNearby = nearbyLocations.filter((loc) =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNearbyBtnClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            "Unknown location";

          setActiveCity(city);
          setSearchTerm(city);
          setShowDropdown(false);
        } catch (err) {
          console.error("Reverse geocoding failed:", err);
          setSearchTerm(
            `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`
          );
          setShowDropdown(false);
        }
      },
      (error) => {
        alert("Unable to retrieve your location");
        console.error(error);
      }
    );
  };

  const handleSelectNearby = (location: string) => {
    setSearchTerm(location);
    setShowDropdown(false);
  };

  const handlePrevPills = () => {
    pillContainerRef.current?.scrollBy({
      left: -SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  const handleNextPills = () => {
    pillContainerRef.current?.scrollBy({
      left: SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  const checkScroll = () => {
    if (pillContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = pillContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const container = pillContainerRef.current;
    if (!container) return;

    checkScroll();

    const handleScroll = () => checkScroll();
    const handleResize = () => checkScroll();

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full p-4 border-b">
      <h2 className="text-2xl font-poppins text-left mb-3">
        {LOCATION_SEARCH.TITLE} {activeCity}
      </h2>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div className="relative flex items-center flex-grow max-w-md">
          <input
            ref={inputRef}
            type="text"
            placeholder="Select City to find sellers near you"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
          />
          {showDropdown && filteredNearby.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md max-h-40 overflow-auto z-10">
              {filteredNearby.map((loc) => (
                <li
                  key={loc}
                  onClick={() => handleSelectNearby(loc)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {loc}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={handleNearbyBtnClick}
          className="px-4 py-2 border  border-gray-300 rounded-md hover:bg-gray-200 text-sm"
        >
          {LOCATION_SEARCH.NEARME}
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handlePrevPills}
            disabled={!canScrollLeft}
            className={`px-4 py-2 rounded-full text-3xl transition text-center ${
              canScrollLeft
                ? "border-gray-300 visible"
                : "border-gray-200 text-gray-400 cursor-not-allowed invisible pointer-events-none"
            }`}
          >
            «
          </button>

          <div
            ref={pillContainerRef}
            className="flex gap-2 overflow-x-auto max-w-2xl hide-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`flex items-center gap-1 px-4 py-1 rounded-full border text-sm whitespace-nowrap transition ${
                  activeCity === city
                    ? "bg-white border-red-500 text-red-600"
                    : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700"
                }`}
              >
                {activeCity === city && (
                  <FaMapMarkerAlt className="text-red-500" />
                )}
                {city}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextPills}
            disabled={!canScrollRight}
            className={`px-4 py-2  rounded-full text-3xl transition ${
              canScrollRight
                ? "border-gray-300 visible"
                : "border-gray-200 text-gray-400 cursor-not-allowed invisible pointer-events-none"
            }`}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
