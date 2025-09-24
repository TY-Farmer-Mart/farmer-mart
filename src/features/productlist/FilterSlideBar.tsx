import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import FilterDropdown from "@/components/common/FilterSection";
import TextDropdown from "@/components/common/TextDropdown";
import { SidebarSection } from "@/types/sidebarTypes";

interface FilterSlideBarProps {
  sidebarData: SidebarSection[];
}

const FilterSlideBar: React.FC<FilterSlideBarProps> = ({ sidebarData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="sm:hidden p-2">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 border rounded-md bg-white shadow"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="hidden sm:flex w-60 bg-white  rounded-md w-full border-gray-200 flex-col h-full max-h-full overflow-y-auto m-auto">
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
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed top-0 left-0 w-full min-h-full bg-white border-r border-gray-200 z-50 flex flex-col p-4 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="mb-4 self-end p-2 border rounded-md bg-gray-100"
              >
                <X size={20} />
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSlideBar;
