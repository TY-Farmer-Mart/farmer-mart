// import type { CategorySectionType } from "@/types/marketTypes";
// import { Market_Category_data } from "@/utils/json_util";
// import CategorySection from "./CategorySection";
// export default function CategoryList() {
//   return (
//     <div>
//       {Market_Category_data.categories.map((section: CategorySectionType, i) => (
//         <CategorySection
//           key={i}
//           leftCard={{
//             title: section.leftCard.title,
//             description: section.leftCard.description,
//             image: section.leftCard.image,
//           }}
//           categories={section.categories}
//         />
//       ))}
//     </div>
//   );
// }

// import { useState } from "react";
// import { Market_Category_data } from "@/utils/json_util";
// import CategoryPanel from "./CategoryPanel";

// export default function CategoryList() {
//   const categories = Market_Category_data.categories;
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <section className="bg-[#F7FBF7] py-20">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* SECTION TITLE */}
//         <h2 className="text-3xl font-bold text-gray-900 mb-3">
//           Explore by Use Case
//         </h2>
//         <p className="text-gray-600 mb-8">
//           Choose what you’re looking for — we’ll guide you.
//         </p>

//         {/* CATEGORY TABS */}
//         <div className="flex gap-3 overflow-x-auto pb-4 mb-10">
//           {categories.map((cat, i) => (
//             <button
//               key={i}
//               onClick={() => setActiveIndex(i)}
//               className={`px-5 py-2 rounded-full whitespace-nowrap border transition
//                 ${
//                   activeIndex === i
//                     ? "bg-green-700 text-white border-green-700"
//                     : "bg-white text-gray-700 border-gray-300 hover:border-green-600"
//                 }`}
//             >
//               {cat.leftCard.title}
//             </button>
//           ))}
//         </div>

//         {/* ACTIVE PANEL */}
//         <CategoryPanel section={categories[activeIndex]} />
//       </div>
//     </section>
//   );
// }

import { Market_Category_data } from "@/utils/json_util";
import CategoryUseCaseSection from "./CategoryUseCaseSection";

export default function CategoryList() {
  return (
    <section className="bg-green-50 py-10 space-y-10 relative z-10">
      {Market_Category_data.categories.map((section, i) => (
        <>
          <CategoryUseCaseSection
            key={i}
            title={section.leftCard.title}
            description={section.leftCard.description}
            categories={section.categories}
          />
          <hr />
        </>
      ))}
    </section>
  );
}
