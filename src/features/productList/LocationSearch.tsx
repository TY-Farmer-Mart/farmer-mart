import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOCATION_SEARCH } from "@/constants/textConstants";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { cn } from "@/utils/helpers";
import Chip from "@/components/common/ui/Chip";
import { fetchProducts } from "@/redux/productSlice";
import { RootState, AppDispatch } from "@/redux/store";

const SCROLL_AMOUNT = 150;

const nearbyLocations = [
  "Whitefield",
  "HSR Layout",
  "Koramangala",
  "Electronic City",
  "Marathahalli",
];

const LocationSearch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Updated state selectors
  const products = useSelector(
    (state: RootState) => state.products.allProducts
  );
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  const [activeCity, setActiveCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const pillContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const cities = useMemo(() => {
    if (!products.length) return [];
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.location) set.add(p.location.split(" - ")[0].trim());
    });
    return Array.from(set).sort();
  }, [products]);

  useEffect(() => {
    if (cities.length) {
      setActiveCity(cities[0]);
      setSearchTerm(cities[0]);
    }
  }, [cities]);

  const filteredNearby = useMemo(
    () =>
      nearbyLocations.filter((loc) =>
        loc.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const checkScroll = useCallback(() => {
    const el = pillContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollWidth > el.clientWidth &&
        el.scrollLeft + el.clientWidth < el.scrollWidth
    );
  }, []);

  useEffect(() => {
    const el = pillContainerRef.current;
    if (!el) return;

    checkScroll();

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scrollPills = (direction: "left" | "right") => {
    pillContainerRef.current?.scrollBy({
      left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  const handleNearbyBtnClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            "Unknown location";
          setActiveCity(city);
          setSearchTerm(city);
          setShowDropdown(false);
        } catch {
          setSearchTerm(
            `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`
          );
          setShowDropdown(false);
        }
      },
      () => {
        alert("Unable to retrieve your location");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSelectNearby = (location: string) => {
    setActiveCity(location);
    setSearchTerm(location);
    setShowDropdown(false);
  };

  return (
    <div className="w-full px-4 pt-2 pb-4 ">
      <h2 className="text-xl sm:text-2xl font-poppins text-left">
        {LOCATION_SEARCH.TITLE} {activeCity}
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center w-full max-w-md gap-2 sm:gap-3">
          <div className="relative flex-grow">
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-full outline-none text-sm"
            />

            {showDropdown && filteredNearby.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md max-h-40 overflow-auto z-10 shadow-md">
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

          <Button
            type="button"
            onClick={handleNearbyBtnClick}
            variant="ghost"
            size="sm"
            className="w-[70%] sm:w-auto mt-1 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 text-sm"
          >
            {LOCATION_SEARCH.NEARME}
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full overflow-x-auto sm:overflow-visible">
          <Button
            onClick={() => scrollPills("left")}
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
            className="flex gap-2 overflow-x-auto max-w-full sm:max-w-3xl no-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {loading ? (
              <div className="text-gray-400 px-4 py-2">Loading cities...</div>
            ) : error ? (
              <div className="text-red-500 px-4 py-2">{error}</div>
            ) : (
              cities.map((city) => (
                <Chip
                  key={city}
                  label={city}
                  isActive={activeCity === city}
                  onClick={() => setActiveCity(city)}
                />
              ))
            )}
          </div>

          <Button
            onClick={() => scrollPills("right")}
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
