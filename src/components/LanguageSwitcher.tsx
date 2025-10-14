import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectInput } from "./common/ui/SelectInput";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { value: "en", label: "English" },
    { value: "hn", label: "Hindi" },
    { value: "kn", label: "Kannada" },
  ];

  const [selectedLang, setSelectedLang] = useState<string>(
    localStorage.getItem("i18nextLng") || "en"
  );

  useEffect(() => {
    i18n.changeLanguage(selectedLang);
  }, [i18n, selectedLang]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lng = e.target.value;
    setSelectedLang(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <div className="flex items-center space-x-3">
      <SelectInput
        name="language"
        value={selectedLang}
        onChange={handleChange}
        onBlur={() => {}}
        options={languages}
        className="px-2 py-1 w-48"
        requiredIndicator={false}
      />
    </div>
  );
};

export default LanguageSwitcher;
