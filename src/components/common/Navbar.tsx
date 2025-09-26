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
import {
  NavbarProps,
  NavIconButtonProps,
  StateOption,
  NavOption,
} from "@/types/navbarTypes";

// NavIconButton component
const NavIconButton: FC<NavIconButtonProps> = ({
  icon,
  label,
  onClick,
  className,
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 
                text-white hover:text-green-400 transition-colors duration-200 ${className}`}
  >
    <div className="text-lg">{icon}</div>
    <span className="text-sm">{label}</span>
  </button>
);

// Navbar component
const Navbar: FC<NavbarProps> = ({
  state = NAVBAR_TEXT.defaultLocation,
  setStatets, // optional
  stateOptions = [
    { value: "blr", label: "Bengaluru" },
    { value: "del", label: "Delhi" },
    { value: "mum", label: "Mumbai" },
    { value: "chn", label: "Chennai" },
  ],
}) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [signinOpen, setSigninOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const signinRef = useRef<HTMLDivElement>(null);

  // Close Sign In dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        signinRef.current &&
        !signinRef.current.contains(event.target as Node)
      ) {
        setSigninOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    if (setStatets) setStatets(value);
    setDropdownOpen(false);
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
      <div className="flex w-full items-center justify-between">
        {/* LEFT SIDE */}
        <div className="flex flex-[3] items-center space-x-4">
          <div className="flex-shrink-0">
            <img src={logo} alt="logo" className="w-40 h-16 sm:w-48 sm:h-15" />
          </div>

          <div className="hidden sm:flex flex-1 items-center space-x-4">
            {/* Location Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between px-3 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-full min-w-[120px] sm:min-w-[150px]"
              >
                <div className="flex items-center space-x-1">
                  <FaMapMarkerAlt className="text-gray-600" />
                  <span className="text-sm sm:text-base">{state}</span>
                </div>
                <FaSearch className="text-gray-500" />
              </button>

              {dropdownOpen && (
                <ul className="absolute top-full left-0 mt-1 w-[120px] sm:w-[150px] bg-white border rounded-md shadow-lg z-10">
                  {stateOptions.length === 0 && (
                    <li className="px-4 py-2 text-gray-500">No options</li>
                  )}
                  {stateOptions.map((option: StateOption) => (
                    <li
                      key={option.value}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelect(option.label)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={NAVBAR_TEXT.searchPlaceholder}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-full outline-none text-sm sm:text-base"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Get Best Price Button */}
            <Button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full">
              {NAVBAR_TEXT.getBestPrice}
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden sm:flex flex-[2] justify-end items-center space-x-4">
          {NAVBAR_TEXT.navOptions.map((option: NavOption) => (
            <NavIconButton
              key={option.value}
              icon={getNavIcon(option.value)}
              label={option.label}
            />
          ))}

          {/* Sign In Dropdown */}
          <div
            ref={signinRef}
            className="relative"
            onMouseEnter={() => setSigninOpen(true)}
            onMouseLeave={() => setSigninOpen(false)}
          >
            <button
              className="flex flex-col items-center justify-center space-y-1 px-3 py-2 
                         text-white hover:text-green-400 transition-colors duration-200 rounded-full"
            >
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 flex flex-col space-y-2">
          {NAVBAR_TEXT.navOptions.map((option: NavOption) => (
            <NavIconButton
              key={option.value}
              icon={getNavIcon(option.value)}
              label={option.label}
            />
          ))}

          {/* Sign In Dropdown (Mobile behaves on click) */}
          <div className="relative">
            <button
              onClick={() => setSigninOpen(!signinOpen)}
              className="flex flex-col items-center justify-center space-y-1 px-3 py-2 
                         text-white hover:text-green-400 transition-colors duration-200 rounded-full w-full"
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
