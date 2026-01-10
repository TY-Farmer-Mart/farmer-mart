import React from "react";
import HelpCard from "./HelpCard";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const HelpCardList: React.FC = () => {
  const cards = [
    {
      title: "Buying on FarmerMart",
      description: "Find and purchase from suppliers",
      imageSrc:
        "	https://help.indiamart.com/wp-content/themes/astra/svg-icons/buying-on-indiamart.webp",
      imageAlt: "Buying on FarmerMart",
    },
    {
      title: "Selling on FarmerMart",
      description: "List Products and connect with buyers",
      imageSrc:
        "	https://help.indiamart.com/wp-content/themes/astra/svg-icons/selling.webp",
      imageAlt: "Selling on FarmerMart",
    },
    {
      title: "Paid Services",
      description: "Explore premium service packages for added advantages",
      imageSrc:
        "	https://help.indiamart.com/wp-content/themes/astra/svg-icons/paid-services.webp",
      imageAlt: "Paid services",
    },
    {
      title: "Payment Related",
      description: "Handle transactions and resolve payment issues",
      imageSrc:
        "	https://help.indiamart.com/wp-content/themes/astra/svg-icons/payment-related.webp",
      imageAlt: "Payment",
    },
    {
      title: "Communication and Support",
      description: "Resolve queries and connect with customers",
      imageSrc:
        "	https://help.indiamart.com/wp-content/themes/astra/svg-icons/communication.webp",
      imageAlt: "Communication",
    },
    {
      title: "Policies Guidelines",
      description: "Understand platform rules and user conduct.",
      imageSrc:
        "https://help.indiamart.com/wp-content/themes/astra/svg-icons/policies.webp",
      imageAlt: "Policies & guidelines",
    },
    {
      title: "Account and Privacy",
      description: "Manage account details and data security.",
      imageSrc:
        "https://help.indiamart.com/wp-content/themes/astra/svg-icons/account-privacy.webp",
      imageAlt: "Account & privacy",
    },
    {
      title: "Complaints",
      description: "Report issues or share user Experiences.",
      imageSrc:
        "	https://help.indiamart.com/wp-content/themes/astra/svg-icons/complaint-feedback.webp",
      imageAlt: "Complaints",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {cards.map((card, index) => (
            <HelpCard key={index} {...card} />
          ))}
        </div>
      </div>
      <div className="mt-5  flex justify-center ">
        <LanguageSwitcher/>
      </div>
    </section>
  );
};

export default HelpCardList;
