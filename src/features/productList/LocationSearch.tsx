import React, { useState, useRef, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocateFixed } from "lucide-react";
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

  // ✅ Updated state selectors
  const products = useSelector(
    (state: RootState) => state.products.allProducts
  );
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  const [activeCity, setActiveCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const pillContainerRef = useRef<HTMLDivElement>(null);
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
          // update URL param
          setUrlLocationParam(city);
        } catch {
          setSearchTerm(
            `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`
          );
        }
      },
      () => {
        alert("Unable to retrieve your location");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Helper: update the 'location' query param in URL
  const setUrlLocationParam = (city: string) => {
    const params = new URLSearchParams(routeLocation.search);
    // Encode spaces as + to match existing style
    const encoded = encodeURIComponent(city).replace(/%20/g, "+");
    params.set("location", encoded);
    navigate(
      { pathname: routeLocation.pathname, search: `?${params.toString()}` },
      { replace: true }
    );
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
                    setUrlLocationParam(city);
                  }}
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
