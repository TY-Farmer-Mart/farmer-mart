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
import { Button } from "@components/common/ui/Button";
import { NAVBAR_TEXT } from "@constants/textConstants";
import { NavbarProps, NavIconButtonProps, NavOption } from "@/types/navbarTypes";
import { Input } from "@components/common/ui/Input";

const NavIconButton: FC<NavIconButtonProps> = ({ icon, label, onClick, className }) => (
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
    { value: "blr", label: "Bengaluru" },
    { value: "del", label: "Delhi" },
    { value: "mum", label: "Mumbai" },
    { value: "chn", label: "Chennai" },
  ],
}) => {
  const navigate = useNavigate();

  // local selected value (keeps UI consistent even if parent doesn't immediately update controlledState)
  const [selectedValue, setSelectedValue] = useState<string>(
    controlledState ?? stateOptions[0].value
  );

  // keep selectedValue in sync if parent controls it
  useEffect(() => {
    if (controlledState !== undefined && controlledState !== selectedValue) {
      setSelectedValue(controlledState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledState]);

  // dropdown control & search input
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [notFoundMessage, setNotFoundMessage] = useState("");

  // other UI state
  const [signinOpen, setSigninOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [product, setProduct] = useState("");

  // separate refs for desktop and mobile dropdown containers so outside-click detection works reliably
  const desktopDropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileDropdownRef = useRef<HTMLDivElement | null>(null);

  // close dropdown on outside click (checks both desktop & mobile refs)
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

  // user selects an option (desktop or mobile)
  const handleSelect = (value: string) => {
    setSelectedValue(value); // keep local UI updated
    if (setStatets) {
      try {
        setStatets(value);
      } catch {
        // ignore; parent might not expect the exact type in some edge cases
      }
    }
    // close and clear search input message
    setDropdownOpen(false);
    setSearchText("");
    setNotFoundMessage("");
  };

  // exact-match search (Enter or click)
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
    navigate(`/products?product=${encodeURIComponent(product)}&location=${encodeURIComponent(selectedValue)}`);
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

  // label for the current selectedValue
  const selectedLabel = stateOptions.find((o) => o.value === selectedValue)?.label ?? selectedValue;

  return (
    <nav className="w-full shadow border border-1 bg-blue-900 px-4 sm:px-6 py-3 sticky top-0 z-50">
      {/* Top row: logo + desktop search / mobile hamburger */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img src={logo} alt="logo" className="w-40 h-16 sm:w-48 sm:h-15" />
          </div>

          {/* Desktop/Tablet: Location + Product Search */}
          <div className="hidden sm:flex flex-1 items-center space-x-4 w-full">
            {/* Desktop location button */}
            <div className="relative" ref={desktopDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen((s) => !s);
                  setSearchText(""); // start fresh when opening
                  setNotFoundMessage("");
                }}
                className="flex items-center px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-full w-[200px] min-w-[120px] sm:min-w-[150px] md:min-w-[180px] overflow-hidden"
              >
                <FaMapMarkerAlt className="text-gray-600 flex-shrink-0" />
                <span className="flex-1 text-center text-sm sm:text-base md:text-base mx-2 truncate">
                  {selectedLabel}
                </span>

                <div className="flex items-center gap-2 flex-shrink-0 px-2">
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

              {/* Desktop dropdown */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-[200px] sm:w-[200px] md:w-[198px] bg-white border rounded-md shadow-lg z-10 p-2">
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
                    <button type="button" onClick={handleSearch} className="text-gray-500 hover:text-green-600">
                      <FaSearch />
                    </button>
                  </div>

                  <ul className="mt-2 max-h-44 overflow-y-auto">
                    {stateOptions
                      .filter((opt) => opt.label.toLowerCase().includes(searchText.toLowerCase()))
                      .map((opt) => (
                        <li
                          key={opt.value}
                          className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded"
                          onClick={() => {
                            handleSelect(opt.value);
                          }}
                        >
                          {opt.label}
                        </li>
                      ))}
                  </ul>

                  {notFoundMessage && <div className="mt-1 text-red-500 text-sm">{notFoundMessage}</div>}
                </div>
              )}
            </div>

            {/* Product search (desktop) */}
            <div className="flex-1 relative">
              <Input
                onChange={(e) => setProduct(e.target.value)}
                value={product}
                type="text"
                placeholder={NAVBAR_TEXT.searchPlaceholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-full outline-none text-sm sm:text-base"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <Button disabled={product.length < 1} onClick={handleClick} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full">
              {NAVBAR_TEXT.getBestPrice}
            </Button>
          </div>
        </div>

        {/* Desktop right icons */}
        <div className="hidden sm:flex flex-[2] justify-end items-center space-x-4 w-full">
          {NAVBAR_TEXT.navOptions.map((option: NavOption) => (
            <NavIconButton key={option.value} icon={getNavIcon(option.value)} label={option.label} />
          ))}

          <div className="relative" onMouseEnter={() => setSigninOpen(true)} onMouseLeave={() => setSigninOpen(false)}>
            <button className="flex flex-col items-center justify-center space-y-1 px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 rounded-full">
              <div className="text-lg">
                <FaUser />
              </div>
              <span className="text-sm">{NAVBAR_TEXT.signIn}</span>
            </button>

            {signinOpen && (
              <ul className="absolute right-0 mt-0 w-32 bg-white border rounded shadow-lg z-10">
                <li key="login" className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/auth/login")}>
                  {NAVBAR_TEXT.login}
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="sm:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen((s) => !s)} className="text-white text-xl p-2">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE: location + product inputs (uses the imported Input; typing opens the dropdown & filters) */}
      <div className="sm:hidden mt-2 px-4 space-y-2">
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
              // if opening, keep text cleared so user can type; if closing, keep current label shown
              if (!dropdownOpen) setSearchText("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-full px-5 h-10 py-1 border border-gray-300 rounded outline-none text-sm"
          />

          <svg className={`w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>

          {dropdownOpen && (
            <ul className="absolute top-full left-0 mt-1 w-full bg-white border rounded-md shadow-lg z-10 max-h-44 overflow-y-auto">
              {stateOptions
                .filter((opt) => opt.label.toLowerCase().includes(searchText.toLowerCase()))
                .map((opt) => (
                  <li
                    key={opt.value}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleSelect(opt.value);
                      setSearchText(""); // clear search so selected label is shown (selectedLabel)
                      setDropdownOpen(false);
                    }}
                  >
                    {opt.label}
                  </li>
                ))}
            </ul>
          )}

          {notFoundMessage && <div className="mt-1 text-red-500 text-sm">{notFoundMessage}</div>}
        </div>

        <div className="relative">
          <Input onChange={(e) => setProduct(e.target.value)} value={product} type="text" placeholder={NAVBAR_TEXT.searchPlaceholder} className="w-full px-3 py-2 border border-gray-300 rounded-full outline-none text-sm" />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <Button onClick={handleClick} disabled={product.length < 1} className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full">
          {NAVBAR_TEXT.getBestPrice}
        </Button>
      </div>

      {/* Mobile nav icons */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 flex flex-row flex-wrap justify-around items-center space-x-4 px-4">
          {NAVBAR_TEXT.navOptions.map((option) => (
            <NavIconButton key={option.value} icon={getNavIcon(option.value)} label={option.label} />
          ))}

          <div className="relative">
            <button onClick={() => setSigninOpen((s) => !s)} className="flex flex-col items-center justify-center space-y-1 px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 rounded-full">
              <div className="text-lg">
                <FaUser />
              </div>
              <span className="text-sm">{NAVBAR_TEXT.signIn}</span>
            </button>

            {signinOpen && (
              <ul className="absolute right-0 mt-1 w-32 bg-white border rounded shadow-lg z-10">
                <li key="login-mobile" className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/auth/login"); setSigninOpen(false); setMobileMenuOpen(false); }}>
                  {NAVBAR_TEXT.login}
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
