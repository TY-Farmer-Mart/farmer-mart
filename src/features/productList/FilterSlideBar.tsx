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
            <div className="lg:hidden p-2">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 border rounded-md bg-white shadow"
                >
                    <Menu size={24} />
                </button>
            </div>

            <div className="hidden lg:block w-60 bg-white border border-gray-200 rounded-md flex-col h-full max-h-full overflow-y-auto">
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
                            <span>Close</span>
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
                )}
            </AnimatePresence>
        </>
    );
};

export default FilterSlideBar;

