// import { useNavigate } from "react-router-dom";
// import type { CategoryItem, ProductName } from "@/types/marketTypes";

// type Props = {
//   category: CategoryItem;
// };

// function CategoryCard({ category }: Props) {
//   const navigate = useNavigate();

//   const handleClick = (item: ProductName) => {
//     navigate(`/products?product=${encodeURIComponent(item)}`);
//   };

//   return (
//     <div
//       className="flex rounded-lg items-center border shadow-sm lg:pl-10 pl-2
//    ml-0 sm:ml-4 md:ml-9 md:w-[230px] lg:w-[310px] xl:w-[410px] lg:ml-12
//   w-full bg-white hover:shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out hover:bg-green-200"
//     >
//       <img
//         src={category.image}
//         alt={category.title}
//         className="w-[80px] sm:w-[90px] md:w-[100px]
//                    h-[80px] sm:h-[90px] md:h-[100px]
//                    object-contain mr-4"
//       />
//       <div>
//         <h3 className="lg:text-lg md:text-sm text-xs font-semibold flex flex-start text-black-500 hover:text-blue-900 mb-2 hover:underline decoration-blue-900">
//           {category.title}
//         </h3>

//         <ul className="text-black-500 text-[14px] m-0 p-0 list-none space-y-2 mb-2 decoration-blue-900">
//           {category.items.map((item, index) => (
//             <li
//               key={index}
//               onClick={() => handleClick(item)}
//               className="flex flex-start lg:text-sm text-xs hover:text-blue-900 hover:underline cursor-pointer"
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default CategoryCard;

import type { CategoryItem } from "@/types/marketTypes";
import { ArrowRight } from "lucide-react";

type Props = {
  category: CategoryItem;
};

function CategoryCard({ category }: Props) {
  return (
    <div
      className="
        group
        border border-gray-200
        rounded-2xl
        p-6
        bg-white
        transition
        hover:border-green-600
        hover:shadow-md
        cursor-default
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-green-50 overflow-hidden flex items-center justify-center">
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-900">
            {category.title}
          </h3>
        </div>

        <ArrowRight className="text-gray-300 group-hover:text-green-600 transition" />
      </div>

      {/* SUB PRODUCTS */}
      <div className="mt-4 flex flex-wrap gap-2">
        {category.items.map((item, index) => (
          <span
            key={index}
            className="
              px-3 py-1
              rounded-full
              bg-green-50
              text-green-700
              text-sm
              cursor-pointer
              hover:bg-green-100
              transition
            "
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default CategoryCard;
