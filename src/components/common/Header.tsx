import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStates } from "india-state-district";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import CustomSelect from "@/components/common/ui/CustomSelect";
import {MARKET_TEXT} from "@/constants/textConstants"

const Header = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const stateOptions = getAllStates().map((s) => ({
    value: s.code,
    label: s.name,
  }));

  return (
    <header className="px-4 sm:px-6 py-3 shadow bg-white flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="flex-shrink-0 flex items-center font-bold text-xl text-green-700">
          🌾 <span className="md:hidden block lg:block xl:block">{MARKET_TEXT.LOGO}</span>
        </div>

        <button
          className="sm:hidden text-2xl font-bold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      <div className="flex justify-center w-full mt-2 sm:mt-0">
        <div className="flex flex-col sm:flex-row w-full sm:w-auto max-w-3xl border-2 rounded-sm ">
          <CustomSelect
            value={state}
            onChange={setState}
            options={stateOptions}
            placeholder="Choose state"
            className="w-full sm:w-40 border-b sm:border-b-0 sm:border-r border-gray-300 rounded-none"
          />

          <Input
            type="text"
            placeholder="Enter product / service to search"
            className="flex-1 px-4 py-2 border-none outline-none rounded-none w-full sm:w-auto"
          />

          <Button
            type="button"
            className="px-3 py-2 bg-primary rounded-none sm:rounded-r-sm w-full sm:w-auto"
          >
            🔍
          </Button>
        </div>
      </div>

      <div
        className={`flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0 w-full sm:w-auto ${
          menuOpen ? "flex" : "hidden sm:flex"
        }`}
      >
        <Button
          type="button"
          onClick={() => navigate("/auth/login")}
          variant="primary"
          size="sm"
          className="w-full sm:w-auto px-4 py-2"
        >
          {MARKET_TEXT.LOGINBTN}
        </Button>
        <Button
          type="button"
          onClick={() => navigate("/auth/register")}
          variant="primary"
          size="sm"
          className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white hover:bg-yellow-600"
        >
          {MARKET_TEXT.REGISTERBTN}
        </Button>
      </div>
    </header>
  );
};

export default Header;
