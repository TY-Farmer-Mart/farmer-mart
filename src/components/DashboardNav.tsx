import { Input } from "@/components/common/ui/Input";
import { Button } from "./common/ui/Button";
import { IoIosSearch } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DashboardNav() {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(
    t("DASHBOARD_NAV_TXT.LOCATION")
  );
  const [product, setProduct] = useState("");
  const desktopDropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const stateOptions = [
    { value: "blr", label: "Bengaluru" },
    { value: "del", label: "Delhi" },
    { value: "mum", label: "Mumbai" },
    { value: "chn", label: "Chennai" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setNotFoundMessage("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(value: string) {
    const opt = stateOptions.find((option) => option.value === value);
    if (opt) {
      setSelectedLabel(opt.label);
      setDropdownOpen(false);
    }
  }

  function handleSearch() {
    const match = stateOptions.find((option) =>
      option.label.toLowerCase().includes(searchText.toLowerCase())
    );
    if (!match) {
      setNotFoundMessage(
        t("DASHBOARD_NAV_TXT.NO_LOCATION_FOUND") || "No location found"
      );
    } else {
      handleSelect(match.value);
    }
  }

  const handleClick = () => {
    if (!product.trim()) return;

    navigate(
      `/products?product=${encodeURIComponent(
        product
      )}&location=${encodeURIComponent(selectedLabel)}`
    );
  };

  return (
    <>
      <div
        className="
         sticky top-4 sm:z-10  m-0
        flex flex-col sm:flex-row sm:items-center sm:justify-between
        w-full bg-white p-4 mt-4 mb-4 mr-4 rounded-xl shadow
        gap-4 sm:gap-6
      "
      >
        <div className="relative" ref={desktopDropdownRef}>
          <button
            type="button"
            onClick={() => {
              setDropdownOpen((s) => !s);
              setSearchText("");
              setNotFoundMessage("");
            }}
            className="flex items-center px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-full
               w-[200px] min-w-[120px] sm:min-w-[150px] md:min-w-[180px] overflow-hidden"
          >
            <FaMapMarkerAlt className="text-gray-600 flex-shrink-0" />
            <span className="flex-1 text-center text-sm sm:text-base mx-2 truncate">
              {selectedLabel}
            </span>

            <div className="flex items-center gap-2 flex-shrink-0 px-2">
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-[200px] sm:w-[200px] md:w-[198px] bg-white border rounded-md shadow-lg z-10 p-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder={t("DASHBOARD_NAV_TXT.POPOVER_TEXT")}
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setNotFoundMessage("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="w-full px-2 py-1 border border-gray-300 rounded outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="text-gray-500 hover:text-green-600"
                >
                  <FaSearch />
                </button>
              </div>

              <ul className="mt-2 max-h-44 overflow-y-auto">
                {stateOptions
                  .filter((opt) =>
                    opt.label.toLowerCase().includes(searchText.toLowerCase())
                  )
                  .map((opt) => (
                    <li
                      key={opt.value}
                      className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded"
                      onClick={() => handleSelect(opt.value)}
                    >
                      {opt.label}
                    </li>
                  ))}
              </ul>

              {notFoundMessage && (
                <div className="mt-1 text-red-500 text-sm">
                  {notFoundMessage}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 w-full sm:mx-0">
          <Input
            placeholder={t("DASHBOARD_NAV_TXT.SEARCH_PLACEHOLDER")}
            className="w-full px-4 py-2 text-sm sm:text-base"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>

        <Button
        disabled={!product}
          leftIcon={<IoIosSearch className="w-5 h-5" />}
          onClick={handleClick}
          className="
          flex items-center gap-2
          bg-blue-800 text-white px-4 py-2
          rounded hover:bg-green-300
          text-sm sm:text-xl
          w-full sm:w-auto
        "
        >
          <span className="font-bold">{t("DASHBOARD_NAV_TXT.BTN_TEXT")}</span>
        </Button>
      </div>
    </>
  );
}

export default DashboardNav;
