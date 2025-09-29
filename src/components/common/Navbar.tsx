import { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaTags,
  FaQuestionCircle,
  FaUser,
  FaMapMarkerAlt,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import logo from "@assets/images/logo_farmer_mart_final.png";
import logosmalldevice from "@assets/images/image.jpg";
import { Button } from "@components/common/ui/Button";
import {
  NavbarProps,
  NavIconButtonProps,
  NavOption,
} from "@/types/navbarTypes";
import { Input } from "@components/common/ui/Input";
import { useTranslation } from "react-i18next";

const NavIconButton: FC<NavIconButtonProps> = ({
  icon,
  label,
  onClick,
  className,
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 ${className}`}
  >
    <div className="text-lg">{icon}</div>
    <span className="text-sm">{label}</span>
  </button>
);

const Navbar: FC<NavbarProps> = ({
  state: controlledState,
  setStatets,
  stateOptions = [
    { value: "bengalore", label: "Bengalore" },
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
    { value: "chennai", label: "Chennai" },
  ],
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = useState<string>(
    controlledState ?? stateOptions[0].value
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [signinOpen, setSigninOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [product, setProduct] = useState("");

  const desktopDropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (controlledState !== undefined && controlledState !== selectedValue) {
      setSelectedValue(controlledState);
    }
  }, [controlledState, selectedValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideDesktop = desktopDropdownRef.current?.contains(target);
      const insideMobile = mobileDropdownRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setDropdownOpen(false);
        setNotFoundMessage("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    if (setStatets) {
      try {
        setStatets(value);
      } catch (err) {
        return err;
      }
    }
    setDropdownOpen(false);
    setSearchText("");
    setNotFoundMessage("");
  };

  const handleSearch = () => {
    if (!searchText.trim()) return;
    const match = stateOptions.find(
      (opt) => opt.label.toLowerCase() === searchText.trim().toLowerCase()
    );
    if (match) {
      handleSelect(match.value);
    } else {
      setNotFoundMessage(`${searchText} not found`);
    }
  };

  const handleClick = () => {
    navigate(
      `/products?product=${encodeURIComponent(
        product
      )}&location=${encodeURIComponent(selectedValue)}`
    );
  };

  const getNavIcon = (value: NavOption["value"]) => {
    switch (value) {
      case "export":
        return <FaBox />;
      case "sell":
        return <FaTags />;
      case "help":
        return <FaQuestionCircle />;
      default:
        return null;
    }
  };

  const rawNavOptions = t("NAVBAR.NAV_OPTIONS", {
    returnObjects: true,
  }) as { label: string; value: NavOption["value"] }[];

  const navOptions: NavOption[] = rawNavOptions.map((opt) => ({
    label: opt.label,
    value: opt.value,
  }));
  const selectedLabel =
    stateOptions.find((o) => o.value === selectedValue)?.label ?? selectedValue;

  return (
    <>
      <nav className="w-full shadow border border-1 bg-blue-900 px-4 sm:px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between w-full flex-wrap lg:flex-nowrap">
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="logo"
              className="hidden mr-2 lg:block w-40 h-16 sm:w-48 sm:h-15"
            />
            <img
              src={logosmalldevice}
              alt="small logo"
              className="block mr-2 lg:hidden w-10 h-10"
            />
          </div>

          <div className="hidden lg:flex items-center space-x-6 flex-1 flex-wrap justify-between">
            <div className="relative flex-shrink-0" ref={desktopDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen((s) => !s);
                  setSearchText("");
                  setNotFoundMessage("");
                }}
                className="flex items-center px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-full min-w-[120px] w-[180px] overflow-hidden"
              >
                <FaMapMarkerAlt className="text-gray-600 flex-shrink-0" />
                <span className="flex-1 text-center text-sm mx-2 truncate">
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
                  <FaSearch
                    className="text-gray-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownOpen(true);
                      setSearchText("");
                      setNotFoundMessage("");
                    }}
                  />
                </div>
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-[200px] bg-white border rounded-md shadow-lg z-10 p-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Type location..."
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
                        opt.label
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
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

            <div className="relative flex-1 max-w-[400px]">
              <Input
                onChange={(e) => setProduct(e.target.value)}
                value={product}
                type="text"
                placeholder={t("NAVBAR.SEARCH_PLACEHOLDER")}
                className="w-full px-3 py-2 border border-gray-300 rounded-full outline-none text-sm"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <Button
              disabled={product.length < 1}
              onClick={handleClick}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
            >
              {t("NAVBAR.GET_BEST_PRICE")}
            </Button>

            <div className="flex items-center space-x-4 flex-shrink-0">
              {navOptions.map((option: NavOption) => (
                <NavIconButton
                  key={option.value}
                  icon={getNavIcon(option.value)}
                  label={option.label}
                />
              ))}
              <div
                className="relative"
                onMouseEnter={() => setSigninOpen(true)}
                onMouseLeave={() => setSigninOpen(false)}
              >
                <button className="flex flex-col items-center justify-center space-y-1 px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 rounded-full">
                  <div className="text-lg">
                    <FaUser />
                  </div>
                  <span className="text-sm">{t("NAVBAR.SIGN_IN")}</span>
                </button>
                {signinOpen && (
                  <ul className="absolute right-0 mt-0 w-32 bg-white border rounded shadow-lg z-10">
                    <li
                      key="login"
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("/auth/login")}
                    >
                      {t("NAVBAR.LOGIN")}
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-between lg:hidden">
            <div className="flex-1 relative">
              <Input
                onChange={(e) => setProduct(e.target.value)}
                value={product}
                type="text"
                placeholder={t("NAVBAR.SEARCH_PLACEHOLDER")}
                className="w-full px-3 py-2 border border-gray-300 rounded-full outline-none text-sm"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="text-white text-xl p-2"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="sm:block md:block lg:hidden mt-2 px-4 space-y-2 bg-blue-900">
            <div className="relative" ref={mobileDropdownRef}>
              <Input
                type="text"
                placeholder="Select location..."
                value={searchText || selectedLabel}
                leftIcon={<FaMapMarkerAlt />}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setDropdownOpen(true);
                  setNotFoundMessage("");
                }}
                onClick={() => {
                  setDropdownOpen((s) => !s);
                  if (!dropdownOpen) setSearchText("");
                }}
                className="w-full px-5 h-10 py-1 border border-gray-300 rounded outline-none text-sm"
              />
              <svg
                className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
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
              {dropdownOpen && (
                <ul className="absolute top-full left-0 mt-1 w-full bg-white border rounded-md shadow-lg z-10 max-h-44 overflow-y-auto">
                  {stateOptions
                    .filter((opt) =>
                      opt.label.toLowerCase().includes(searchText.toLowerCase())
                    )
                    .map((opt) => (
                      <li
                        key={opt.value}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleSelect(opt.value);
                          setDropdownOpen(false);
                          setSearchText("");
                        }}
                      >
                        {opt.label}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <div className="flex flex-row justify-around items-center space-x-4">
              {navOptions.map((option) => (
                <NavIconButton
                  key={option.value}
                  icon={getNavIcon(option.value)}
                  label={option.label}
                />
              ))}
              <div className="relative">
                <button
                  onClick={() => setSigninOpen((s) => !s)}
                  className="flex flex-col items-center justify-center space-y-1 px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 rounded-full"
                >
                  <div className="text-lg">
                    <FaUser />
                  </div>
                  <span className="text-sm">{t("NAVBAR.SIGN_IN")}</span>
                </button>
                {signinOpen && (
                  <ul className="absolute right-0 mt-1 w-32 bg-white border rounded shadow-lg z-10">
                    <li
                      key="login-mobile"
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate("/auth/login");
                        setSigninOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {t("NAVBAR.LOGIN")}
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <Button
              disabled={product.length < 1}
              onClick={handleClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full"
            >
              {t("NAVBAR.GET_BEST_PRICE")}
            </Button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
