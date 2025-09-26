import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterDropdown from "@/components/common/FilterSection";
import TextDropdown from "@/components/common/TextDropdown";
import { SidebarSection } from "@/types/sidebarTypes";
import { FunnelPlus, X } from "lucide-react";
interface FilterSlideBarProps {
  sidebarData: SidebarSection[];
}
const FilterSlideBar: React.FC<FilterSlideBarProps> = ({ sidebarData }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <>
      {" "}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden absolute top-84 left-3 z-50 p-1 border rounded-md bg-white shadow"
      >
        {" "}
        <FunnelPlus size={18} />{" "}
      </button>{" "}
      <div className="hidden lg:block w-60 bg-white border border-gray-200 rounded-md flex-col h-full max-h-full overflow-y-auto">
        {" "}
        {sidebarData.map((section) =>
          section.type === "text" ? (
            <TextDropdown
              key={section.title}
              title={section.title}
              options={section.options}
              showRange={section.showRange}
            />
          ) : (
            <FilterDropdown
              key={section.title}
              title={section.title}
              options={section.options}
            />
          )
        )}{" "}
      </div>{" "}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 p-4 overflow-y-auto"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="mb-4 flex items-center space-x-2"
              >
                <X className="w-6 h-6" />
              </button>

              {sidebarData.map((section) =>
                section.type === "text" ? (
                  <TextDropdown
                    key={section.title}
                    title={section.title}
                    options={section.options}
                    showRange={section.showRange}
                  />
                ) : (
                  <FilterDropdown
                    key={section.title}
                    title={section.title}
                    options={section.options}
                  />
                )
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default FilterSlideBar;
