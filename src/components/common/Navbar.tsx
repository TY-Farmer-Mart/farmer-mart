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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [uncontrolledState, setUncontrolledState] = useState(
    controlledState || stateOptions[0].value
  );
  const currentState = controlledState ?? uncontrolledState;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [signinOpen, setSigninOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    if (setStatets) setStatets(value);
    else setUncontrolledState(value);
    setDropdownOpen(false);
    setSearchText("");
    setNotFoundMessage("");
  };

  const handleSearch = () => {
    if (!searchText.trim()) return;
    const match = stateOptions.find(
      (opt) => opt.label.toLowerCase() === searchText.trim().toLowerCase()
    );
    if (match) handleSelect(match.value);
    else setNotFoundMessage(`${searchText} not found`);
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

  return (
    <nav className="w-full shadow border border-1 bg-blue-900 px-4 sm:px-6 py-3 sticky top-0 z-50">
      <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between space-y-2 md:space-y-0">
        {/* LEFT SIDE */}
        <div className="flex flex-[3] items-center space-x-4 w-full">
          <div className="flex-shrink-0">
            <img src={logo} alt="logo" className="w-40 h-16 sm:w-48 sm:h-15" />
          </div>

          <div className="hidden sm:flex flex-1 items-center space-x-4 w-full">
            {/* Location Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-full min-w-[120px] sm:min-w-[150px] md:min-w-[180px]"
              >
                {/* Left: Location icon */}
                <FaMapMarkerAlt className="text-gray-600" />

                {/* Center: Label */}
                <span className="text-sm sm:text-base md:text-base mx-2">
                  {stateOptions.find((opt) => opt.value === currentState)?.label || currentState}
                </span>

                {/* Right: Arrow + Search */}
                <div className="flex items-center space-x-2">
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
                    }}
                  />
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-[150px] sm:w-[150px] md:w-[180px] bg-white border rounded-md shadow-lg z-10 p-2">
                  {/* Search Input inside dropdown */}
                  <div className="flex items-center space-x-2">
                    <input
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

                  <ul className="mt-2 max-h-40 overflow-y-auto">
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
                    <div className="mt-1 text-red-500 text-sm">{notFoundMessage}</div>
                  )}
                </div>
              )}
            </div>

            {/* Product Search Field */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={NAVBAR_TEXT.searchPlaceholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-full outline-none text-sm sm:text-base"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <Button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full">
              {NAVBAR_TEXT.getBestPrice}
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden sm:flex flex-[2] justify-end items-center space-x-4 w-full">
          {NAVBAR_TEXT.navOptions.map((option: NavOption) => (
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
              <span className="text-sm">{NAVBAR_TEXT.signIn}</span>
            </button>
            {signinOpen && (
              <ul className="absolute right-0 mt-0 w-32 bg-white border rounded shadow-lg z-10">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/auth/login")}
                >
                  {NAVBAR_TEXT.login}
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white text-xl p-2"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Product Search */}
      <div className="sm:hidden mt-2 px-4">
        <div className="relative">
          <input
            type="text"
            placeholder={NAVBAR_TEXT.searchPlaceholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-full outline-none text-sm"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 flex flex-col space-y-2 px-4">
          {NAVBAR_TEXT.navOptions.map((option: NavOption) => (
            <NavIconButton
              key={option.value}
              icon={getNavIcon(option.value)}
              label={option.label}
            />
          ))}

          <div className="relative">
            <button
              onClick={() => setSigninOpen(!signinOpen)}
              className="flex flex-col items-center justify-center space-y-1 px-3 py-2 text-white hover:text-green-400 transition-colors duration-200 rounded-full w-full"
            >
              <div className="text-lg">
                <FaUser />
              </div>
              <span className="text-sm">{NAVBAR_TEXT.signIn}</span>
            </button>
            {signinOpen && (
              <ul className="absolute right-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/auth/login");
                    setSigninOpen(false);
                    setMobileMenuOpen(false);
                  }}
                >
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

