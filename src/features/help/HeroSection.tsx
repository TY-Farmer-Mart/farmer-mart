import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { HELP_PAGE_TEXT } from "@/constants/textConstants";
import { HeroProps } from "@/types/helpTypes";
import { Search } from "lucide-react";
import React, { useState } from "react";

const HeroSection: React.FC<HeroProps> = () => {
  const [searchText, setSearchText] = useState("");

  const supportLinks = [
    { label: "How to Register for Paid Services on IndiaMART?", href: "#" },
    { label: "Does IndiaMART Provide Shipping Services?", href: "#" },
    { label: "How to Sell Items on IndiaMART?", href: "#" },
  ];

  return (
    <section className="w-full h-auto py-6 text-center bg-gradient-to-b from-white to-[#B3B7FF]">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">
        {HELP_PAGE_TEXT.TITLE}
      </h1>

      <div className="flex justify-center px-4">
        <div className="w-full max-w-2xl flex flex-col sm:flex-row justify-center gap-3">
          <Input
            type="text"
            placeholder="Search using Keywords..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="p-2 w-full rounded-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            variant="blue"
            size="md"
            className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-2 rounded-sm flex items-center justify-center gap-2"
          >
            <Search size="16" />
          </Button>
        </div>
      </div>

      <div className="mt-6 px-4">
        <p className="text-base sm:text-lg font-medium text-black-500 mb-3">
          {HELP_PAGE_TEXT.SUBTITLE}
        </p>

        <div className="flex flex-col sm:flex-wrap sm:flex-row justify-center items-center gap-3">
          {supportLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="px-4 py-2  shadow-md rounded-full text-sm font-medium text-gray-900  transition"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
