import Navbar from "@/components/common/Navbar";
import React from "react";
import HeroSection from "./HeroSection";
import HelpCardList from "./HelpCardList";
import Footer from "@/components/common/Footer";

function Help() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <HelpCardList />
      <Footer />
    </div>
  );
}

export default Help;
