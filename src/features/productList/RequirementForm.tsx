import React from "react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { REQUIREMENTFORM_TEXT } from "@/constants/textConstants";

const RequirementForm: React.FC = () => {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Requirement submitted:", query);
  };

  return (
    <div className="max-w-xl mx-auto p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
      <h2 className="text-xl md:text-2xl font-medium text-center text-indigo-900 mb-4">
        {REQUIREMENTFORM_TEXT.TITLE1}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-3">
          <label
            htmlFor="requirement"
            className="whitespace-nowrap text-base font-medium text-gray-700"
          >
            {REQUIREMENTFORM_TEXT.TITLE2}
            <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="requirement"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter product name"
            className="w-full border px-4 py-2 rounded-none"
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit" variant="primary" size="md">
            {REQUIREMENTFORM_TEXT.BUTTON_TEXT}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequirementForm;
