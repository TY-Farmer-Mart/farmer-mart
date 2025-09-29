import React from "react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { useTranslation } from "react-i18next";

const RequirementForm: React.FC = () => {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const { t } = useTranslation();

  return (
    <div className="max-w-xl mx-auto p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
      <h2 className="text-lg md:text-xl font-medium text-center text-indigo-900 mb-3">
        {t("REQUIREMENTFORM_TEXT.TITLE1")}
      </h2>

      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <label
          htmlFor="requirement"
          className="whitespace-nowrap text-sm md:text-base font-medium text-gray-700"
        >
          {t("REQUIREMENTFORM_TEXT.TITLE2")}
          <span className="text-red-500">*</span>
        </label>

        <Input
          type="text"
          id="requirement"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter product name"
          className="flex-1 border px-3 py-2 rounded-none"
        />

        <Button type="submit" variant="primary" size="md">
          {t("REQUIREMENTFORM_TEXT.BUTTON_TEXT")}
        </Button>
      </form>
    </div>
  );
};

export default RequirementForm;
