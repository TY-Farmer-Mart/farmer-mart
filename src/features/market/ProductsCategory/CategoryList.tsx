import type { CategorySectionType } from "@/types/marketTypes";
import { Market_Category_data } from "@/utils/json_util";
import CategorySection from "./CategorySection";
export default function CategoryList() {
  return (
    <div>
      {Market_Category_data.categories.map((section: CategorySectionType, i) => (
        <CategorySection
          key={i}
          leftCard={{
            title: section.leftCard.title,
            description: section.leftCard.description,
            image: section.leftCard.image,
          }}
          categories={section.categories}
        />
      ))}
    </div>
  );
}
