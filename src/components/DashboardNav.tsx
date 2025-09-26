import { CiLocationOn } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Input } from "@/components/common/ui/Input";
import { Button } from "./common/ui/Button";
import { DASHBOARD_NAV_TXT } from "@/constants/textConstants";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect, useRef } from "react";

function DashboardNav() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const openPopover = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setOpen(true);
  };
  useEffect(() => {
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <div
        className="
        relative z-0
        flex flex-col sm:flex-row sm:items-center sm:justify-between
        w-full bg-white p-4 mt-4 mb-4 mr-4 rounded-xl shadow
        gap-4 sm:gap-6
      "
      >
        <div
          className="flex items-center gap-2 bg-gray-200 rounded-lg px-3 py-2  cursor-pointer hover:bg-gray-50"
          ref={triggerRef}
          onClick={openPopover}
        >
          <CiLocationOn />
          <span className="text-gray-800 text-sm sm:text-base font-medium">
            {DASHBOARD_NAV_TXT.LOCATION}
          </span>
          <MdOutlineKeyboardArrowDown />
        </div>

        <div className="w-full sm:flex-1 sm:mx-4">
          <Input
            placeholder={DASHBOARD_NAV_TXT.SEARCH_PLACEHOLDER}
            className="w-full px-3 py-2 text-sm sm:text-base"
          />
        </div>

        <Button
          leftIcon={<IoIosSearch className="w-5 h-5" />}
          className="
          flex items-center gap-2
          bg-blue-800 text-white px-4 py-2
          rounded hover:bg-[#00665c]
          text-sm sm:text-xl
          w-full sm:w-auto
        "
        >
          <span className="font-bold">{DASHBOARD_NAV_TXT.BTN_TEXT}</span>
        </Button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0  bg-black-500 bg-opacity-80 z-[1000]"
            onClick={() => setOpen(false)}
          />

          <div
            className="
     absolute z-[1001] bg-white rounded-md shadow-lg
     px-3 py-3 sm:px-4 sm:py-4
    w-[90vw] max-w-sm   
  "
            style={{
              top: pos.top,
              left: pos.left,
              width: pos.width > 320 ? pos.width : "auto",
            }}
          >
            <input
              type="text"
              placeholder={DASHBOARD_NAV_TXT.POPOVER_TEXT}
              className="
       w-full bg-transparent focus:bg-transparent outline-none
       text-gray-800 placeholder-gray-400
      text-sm sm:text-base       px-1 sm:px-2        
    "
            />
          </div>
        </>
      )}
    </>
  );
}

export default DashboardNav;
