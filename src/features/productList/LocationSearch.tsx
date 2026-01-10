import React, { useState, useRef, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocateFixed, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { LOCATION_SEARCH } from "@/constants/textConstants";
import { Button } from "@/components/common/ui/Button";
import Chip from "@/components/common/ui/Chip";
import { fetchProducts } from "@/redux/productSlice";
import { RootState, AppDispatch } from "@/redux/store";
 
const LocationSearch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const routeLocation = useLocation();
  const navigate = useNavigate();

  const products = useSelector(
    (state: RootState) => state.products.allProducts
  );
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);
 
  const [activeCity, setActiveCity] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pillContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const initializedFromParamRef = useRef(false);

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
    }
  }, [cities, activeCity]);

  useEffect(() => {
    const search = routeLocation.search;
    const params = new URLSearchParams(search);
    const locParam = params.get("location");
 
    if (locParam) {
      const decoded = decodeURIComponent(locParam.replace(/\+/g, " "));
      const cityFromParam = decoded.split("-")[0].trim();
      if (cityFromParam) {
        setActiveCity(cityFromParam);
        initializedFromParamRef.current = true;
      }
    } else {
      // No location param → clear selection and remove from localStorage
      setActiveCity("");
      initializedFromParamRef.current = false;
      try {
        localStorage.removeItem("selectedLocation");
      } catch {}
    }
  }, [routeLocation.search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
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
          setIsDropdownOpen(false);

          setUrlLocationParam(city);
        } catch {
          console.error("Failed to get location from coordinates");
        }
      },
      () => {
        alert("Unable to retrieve your location");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const setUrlLocationParam = (city: string) => {
    const params = new URLSearchParams(routeLocation.search);

    const encoded = encodeURIComponent(city).replace(/%20/g, "+");
    params.set("location", encoded);
    navigate(
      { pathname: routeLocation.pathname, search: `?${params.toString()}` },
      { replace: true }
    );

    try {
      localStorage.setItem("selectedLocation", city);
    } catch {
      //
    }
  };

  const handleCitySelect = (city: string) => {
    setActiveCity(city);
    setIsDropdownOpen(false);
    setUrlLocationParam(city);
  };

  return (
    <div className="w-full px-4 pt-2 pb-4 ">
      <h2 className="text-xl sm:text-2xl font-poppins text-left">
        {LOCATION_SEARCH.TITLE} {activeCity}
      </h2>
 
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Button
            type="button"
            onClick={handleNearbyBtnClick}
            variant="ghost"
            size="md"
            className="px-5 py-3 rounded-full text-base bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 w-full sm:w-auto min-h-[56px] sm:min-h-auto"
          >
            <span className="inline-flex items-center gap-2">
              <LocateFixed className="w-5 h-5 sm:w-5 sm:h-5" />
              {LOCATION_SEARCH.NEARME}
            </span>
          </Button>
 
          {/* Mobile: Dropdown for location selection */}
          <div className="relative w-full sm:hidden" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[56px]"
            >
              <span className="text-base font-medium text-gray-700">
                {activeCity || "Select Location"}
              </span>
              <ChevronDown
                className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
 
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="px-4 py-3 text-gray-400 text-sm">
                    Loading cities...
                  </div>
                ) : error ? (
                  <div className="px-4 py-3 text-red-500 text-sm">{error}</div>
                ) : (
                  cities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleCitySelect(city)}
                      className={`w-full text-left px-4 py-4 text-base hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg min-h-[48px] flex items-center ${
                        activeCity === city
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {city}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
 
          {/* Desktop: Chips container */}
          <div
            ref={pillContainerRef}
            className="hidden sm:flex flex-wrap gap-2 justify-end"
            className="hidden sm:flex flex-wrap gap-2 justify-end"
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
                  onClick={() => handleCitySelect(city)}
                  onClick={() => handleCitySelect(city)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default LocationSearch;
 
