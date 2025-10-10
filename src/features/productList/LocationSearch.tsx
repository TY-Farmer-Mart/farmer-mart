import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocateFixed } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { LOCATION_SEARCH } from "@/constants/textConstants";
// import { Input } from "@/components/common/ui/Input";
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
  const routeLocation = useLocation();
  const navigate = useNavigate();

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
  const initializedFromParamRef = useRef(false);

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
    if (cities.length && !initializedFromParamRef.current && !activeCity) {
      setActiveCity(cities[0]);
      setSearchTerm(cities[0]);
    }
  }, [cities, activeCity]);

  // Initialize from/clear based on query param: ?location=Hyderabad+-+Abids
  useEffect(() => {
    const search = routeLocation.search;
    const params = new URLSearchParams(search);
    const locParam = params.get("location");

    if (locParam) {
      // Replace + with spaces, then decode in case of encoded characters
      const decoded = decodeURIComponent(locParam.replace(/\+/g, " "));
      const cityFromParam = decoded.split("-")[0].trim();
      if (cityFromParam) {
        setActiveCity(cityFromParam);
        setSearchTerm(cityFromParam);
        initializedFromParamRef.current = true;
      }
} else {
  // No location param → clear selection and remove from localStorage
  setActiveCity("");
  setSearchTerm("");
  initializedFromParamRef.current = false;
  try {
    localStorage.removeItem("selectedLocation");
  } catch {}
}
  }, [routeLocation.search]);

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
          // update URL param
          setUrlLocationParam(city);
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
    // update URL param
    setUrlLocationParam(location);
  };

  // Helper: update the 'location' query param in URL
  const setUrlLocationParam = (city: string) => {
    const params = new URLSearchParams(routeLocation.search);
    // Encode spaces as + to match existing style
    const encoded = encodeURIComponent(city).replace(/%20/g, "+");
    params.set("location", encoded);
    navigate({ pathname: routeLocation.pathname, search: `?${params.toString()}` }, { replace: true });
    // Persist for Navbar to pick globally
    try {
      localStorage.setItem("selectedLocation", city);
    } catch {
      //
    }
  };

  return (
    <div className="w-full px-4 pt-2 pb-4 ">
      <h2 className="text-xl sm:text-2xl font-poppins text-left">
        {LOCATION_SEARCH.TITLE} {activeCity}
      </h2>

      <div className="flex flex-col gap-4">
        {/* Single row: Near Me on the left, pins to the right */}
        <div className="w-full flex items-center justify-between gap-2">
          <Button
            type="button"
            onClick={handleNearbyBtnClick}
            variant="ghost"
            size="md"
            className="px-5 py-2.5 rounded-full text-base bg-blue-600 hover:bg-blue-700 text-white border border-blue-600"
          >
            <span className="inline-flex items-center gap-2">
              <LocateFixed className="w-5 h-5 sm:w-5 sm:h-5" />
              {LOCATION_SEARCH.NEARME}
            </span>
          </Button>

          {/* Chips container - no scroll, show all */}
          <div
            ref={pillContainerRef}
            className="flex flex-wrap gap-2 justify-end"
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
                  onClick={() => {
                    setActiveCity(city);
                    setSearchTerm(city);
                    setShowDropdown(false);
                    setUrlLocationParam(city);
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Input kept commented intentionally */}
        <div className="flex flex-col sm:flex-row sm:items-center w-full max-w-md gap-2 sm:gap-3">
          <div className="relative flex-grow">
            {/* <Input
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
            /> */}

            {/* {showDropdown && filteredNearby.length > 0 && (
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
            )} */}
          </div>
        </div>

        {/* (Chips row moved to be right of Near Me) */}
      </div>
    </div>
  );
};

export default LocationSearch;
