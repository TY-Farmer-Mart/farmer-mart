import React, { useState, useRef, useEffect } from "react";
import { LOCATION_SEARCH } from "@/constants/textConstants";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { cn } from "@/utils/helpers";
import CityPillsBtn from "@/components/common/ui/CityPillsBtn";

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
      async ({ coords: { latitude, longitude } }) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const { address = {} } = await response.json();

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.county ||
            "Unknown location";

          setActiveCity(city);
          setSearchTerm(city);
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
          setSearchTerm(
            `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`
          );
        } finally {
          setShowDropdown(false);
        }
      },
      (error) => {
        alert("Unable to retrieve your location");
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
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
    <div className="w-full px-4 pt-1 border-b">
      <h2 className="text-2xl font-poppins text-left">
        {LOCATION_SEARCH.TITLE} {activeCity}
      </h2>

      <div className="flex justify-between items-center mb-2 flex-wrap gap-4">
        <div className="relative flex items-center flex-grow max-w-md gap-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Select City to find sellers near you"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full px-20 py-2 border border-gray-300 rounded-md outline-none"
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
          )}{" "}
          <Button
            type="button"
            onClick={handleNearbyBtnClick}
            variant="ghost"
            size="sm"
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 text-sm"
          >
            {LOCATION_SEARCH.NEARME}
          </Button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={handlePrevPills}
            disabled={!canScrollLeft}
            variant="pillScroll"
            className={cn(
              canScrollLeft
                ? "border-gray-300 visible"
                : "border-gray-200 text-gray-400 cursor-not-allowed invisible pointer-events-none"
            )}
          >
            «
          </Button>

          <div
            ref={pillContainerRef}
            className="flex gap-2 overflow-x-auto max-w-2xl hide-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {cities.map((city) => (
              <CityPillsBtn
                key={city}
                label={city}
                isActive={activeCity === city}
                onClick={() => setActiveCity(city)}
              />
            ))}
          </div>
          <Button
            onClick={handleNextPills}
            disabled={!canScrollRight}
            variant="pillScroll"
            className={cn(
              canScrollRight
                ? "border-gray-300 visible"
                : "border-gray-200 text-gray-400 cursor-not-allowed invisible pointer-events-none"
            )}
          >
            »
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
