import { FC, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaGlobe,
  FaBox,
  FaTags,
  FaQuestionCircle,
  FaUser,
  FaMapMarkerAlt,
  FaSearch,
  FaBars,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";

import logo from "@assets/images/logo_farmer_mart_final.png";
import { RootState } from "@/redux/store";
import { ShoppingCart } from "lucide-react";
import logosmalldevice from "@assets/images/image.jpg";
import { Button } from "@components/common/ui/Button";
import { Input } from "@components/common/ui/Input";
import { NavbarProps, NavIconButtonProps, NavOption } from "@/types/navbarTypes";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

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
    { value: "bengaluru", label: "Bengaluru" },
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
    { value: "chennai", label: "Chennai" },
  ],
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [user, setUser] = useState<{ name: string } | null>(null);
  const [selectedValue, setSelectedValue] = useState<string>(
    controlledState ?? stateOptions[0].value
  );
  const [dropdownOpen, setDropdownOpen] = useState(false); // Desktop
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // Mobile
  const [searchText, setSearchText] = useState("");
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [signinOpen, setSigninOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [product, setProduct] = useState("");

  const desktopDropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileDropdownRef = useRef<HTMLDivElement | null>(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Sync controlled state
  useEffect(() => {
    if (controlledState !== undefined && controlledState !== selectedValue) {
      setSelectedValue(controlledState);
    }
  }, [controlledState, selectedValue]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!desktopDropdownRef.current?.contains(target))
        setDropdownOpen(false);
      if (!mobileDropdownRef.current?.contains(target))
        setMobileDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setStatets?.(value);
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
    setSearchText("");
    setNotFoundMessage("");
  };

  const handleSearch = () => {
    if (!searchText.trim()) return;
    const match = stateOptions.find(
      (opt) =>
        opt.label.toLowerCase() === searchText.trim().toLowerCase()
    );
    if (match) handleSelect(match.value);
    else setNotFoundMessage(`${searchText} not found`);
  };



  const handleProductSearch = () => {
    if (product.trim()) {
      navigate(
        `/products?product=${encodeURIComponent(
          product
        )}&location=${encodeURIComponent(selectedValue)}`
      );
    }
  };

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.length;

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
    stateOptions.find((o) => o.value === selectedValue)?.label ??
    selectedValue;

  const signinOptions = user
    ? [
      {
        label: "Profile",
        onClick: () => navigate("/profile"),
        icon: <FaUser />,
      },
      { label: "Home", onClick: () => navigate("/"), icon: <FaHome /> },
      {
        label: "Get Quote",
        onClick: () => navigate("/get-quote"),
        icon: <FaClipboardList />,
      },
      {
        label: "Why Trust FarmerMart",
        onClick: () => navigate("/why-trust"),
        icon: <FaQuestionCircle />,
      },
      {
        label: "Top Export Countries",
        onClick: () => navigate("/top-export-countries"),
        icon: <FaGlobe />,
      },
      {
        label: "Logout",
        onClick: () => {
          localStorage.removeItem("user");
          setUser(null);
          navigate("/");
        },
        icon: <FaTimes />,
      },
    ]
    : [
      {
        label: "Login",
        onClick: () => navigate("/auth/login"),
        icon: <FaUser />,
      },
      { label: "Home", onClick: () => navigate("/"), icon: <FaHome /> },
      {
        label: "Get Quote",
        onClick: () => navigate("/get-quote"),
        icon: <FaClipboardList />,
      },
      {
        label: "Why Trust FarmerMart",
        onClick: () => navigate("/why-trust"),
        icon: <FaQuestionCircle />,
      },
      {
        label: "Top Export Countries",
        onClick: () => navigate("/top-export-countries"),
        icon: <FaGlobe />,
      },
    ];

  const renderSigninDropdown = () => (
    <ul className="absolute right-0 mt-0 w-64 bg-white border rounded shadow-lg z-10">
      <li
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold text-center"
        onClick={signinOptions[0].onClick}
      >
        {signinOptions[0].label}
      </li>
      <hr className="my-1 border-gray-300" />
      {signinOptions.slice(1).map((opt, index) => (
        <li
          key={index}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
          onClick={opt.onClick}
        >
          <span className="flex-shrink-0 w-5 text-blue-500">{opt.icon}</span>
          <span className="text-left">{opt.label}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="w-full shadow border border-1 bg-blue-900 px-4 sm:px-6 py-3 sticky top-0 z-50">
      <div className="flex flex-col lg:flex-col items-start lg:items-center justify-between w-full">
        {/* MOBILE HEADER */}
        <div className="flex w-full items-center justify-between lg:hidden mb-3">
          <img src={logosmalldevice} alt="small logo" className="w-10 h-10" />
          <div className="flex-1 mx-3 relative">
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
            className="text-white text-2xl p-2"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* DESKTOP HEADER */}
        <div className="hidden lg:flex items-center justify-between w-full">
          <div className="flex-shrink-0">
            <img src={logo} alt="logo" className="w-40 h-16" />
          </div>

          <div className="flex items-center space-x-6 flex-1 justify-between ml-4">
            {/* Desktop Location Dropdown */}
            <div className="relative" ref={desktopDropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((s) => !s)}
                className="flex items-center px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-full w-[180px]"
              >
                <FaMapMarkerAlt className="text-gray-600 flex-shrink-0" />
                <span className="flex-1 text-center text-sm mx-2 truncate">
                  {selectedLabel}
                </span>
                <FaSearch className="text-gray-500 cursor-pointer" />
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
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSearch()
                      }
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

            {/* Product Search */}
            <div className="relative max-w-[400px] flex-1">
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
              onClick={handleProductSearch}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
            >
              {t("NAVBAR.GET_BEST_PRICE")}
            </Button>

            <div className="flex items-center space-x-4 flex-shrink-0">
              {navOptions.map((option) => (
                <NavIconButton
                  key={option.value}
                  icon={getNavIcon(option.value)}
                  label={option.label}
                />
              ))}
              <div className="relative">
                <button
                  onClick={() => navigate("/addtocart")}
                  className="flex flex-col items-center justify-center space-y-1 px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 rounded-full"
                >
                  <ShoppingCart className="text-lg" />
                  <span className="text-sm"></span>
                </button>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div
                className="relative"
                onMouseEnter={() => setSigninOpen(true)}
                onMouseLeave={() => setSigninOpen(false)}
              >
                <button className="flex flex-col items-center justify-center space-y-1 px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 rounded-full">
                  <FaUser className="text-lg" />
                  <span className="text-sm">
                    {user ? user.name : t("NAVBAR.SIGN_IN")}
                  </span>
                </button>
                {signinOpen && renderSigninDropdown()}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE MENU CONTENT */}
        {mobileMenuOpen && (
          <div
            ref={mobileDropdownRef}
            className="mt-3 bg-blue-800 p-3 rounded-lg space-y-3 lg:hidden w-full"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Mobile Location Dropdown (FIXED) */}
              <div className="relative flex-1 min-w-[140px]">
                <Input
                  type="text"
                  placeholder="Select location..."
                  value={searchText}
                  onFocus={() => setMobileDropdownOpen(true)}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setNotFoundMessage("");
                    if (!mobileDropdownOpen) setMobileDropdownOpen(true);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-black pr-8"
                />
                <FaChevronDown
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""
                    }`}
                  onClick={() =>
                    setMobileDropdownOpen((s) => !s)
                  }
                />

                {mobileDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white text-black border rounded-md shadow-lg z-20 p-2">
                    <ul className="max-h-52 overflow-y-auto">
                      {stateOptions
                        .filter((opt) =>
                          opt.label
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                        )
                        .map((opt) => (
                          <li
                            key={opt.value}
                            className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => {
                              handleSelect(opt.value);
                              setSearchText(opt.label);
                              setMobileDropdownOpen(false);
                            }}
                          >
                            {opt.label}
                          </li>
                        ))}
                    </ul>
                    {notFoundMessage && (
                      <div className="mt-2 text-red-500 text-sm">
                        {notFoundMessage}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Product Search */}
              <Button
                disabled={product.length < 1}
                onClick={handleProductSearch}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 text-sm"
              >
                {t("NAVBAR.GET_BEST_PRICE")}
              </Button>

              {/* Mobile Icons + Sign In */}
              <div className="flex items-center justify-around flex-1 gap-4">
                {navOptions
                  .filter((opt) =>
                    ["export", "sell", "help"].includes(opt.value)
                  )
                  .map((opt) => (
                    <button
                      key={opt.value}
                      className="flex flex-col items-center text-xs text-white hover:text-green-400"
                    >
                      {getNavIcon(opt.value)}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                <div className="relative">
                  <button
                    onClick={() => setSigninOpen((s) => !s)}
                    className="flex flex-col items-center text-xs hover:text-green-400"
                  >
                    <FaUser className="text-lg" />
                    <span>
                      {user ? user.name : t("NAVBAR.SIGN_IN")}
                    </span>
                  </button>
                  {signinOpen && renderSigninDropdown()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
