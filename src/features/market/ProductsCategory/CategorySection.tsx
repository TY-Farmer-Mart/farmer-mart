import type { LeftCard, CategoryItem } from "@/types/marketTypes";
import CategoryCard from "./CategoryCard";
import { Button } from "@/components/common/ui/Button";
import { MARKET_CATEGORY_PRODUCT } from "@/constants/textConstants";

type Props = {
  leftCard: LeftCard;
  categories: CategoryItem[];
};

export default function CategorySection({ leftCard, categories }: Props) {
  return (
    <div className="border border-t-4 border-t-blue-900 mt-5 bg-gray-50">
      <h1 className="font-bold text-black-500 hover:text-blue-900 md:text-[28px] text-[20px] pt-5 text-left pl-5 hover:underline decoration-blue-900">
        {leftCard.title}
      </h1>

      <div className="p-4 grid grid-cols-1 md:grid-cols-4 lg:gap-6">

        <div className="col-span-1 relative border shadow-md w-full xl:w-[325px] lg:w-[305px] md:w-[200px] h-64 md:h-[480px] bg-white">
          <img
            src={leftCard.image}
            alt={leftCard.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex flex-col justify-end items-start p-4">
            <p className="text-white mt-2 hover:underline md:text-lg text-md font-semibold leading-normal text-left">
              {leftCard.description}
            </p>
            <Button variant="viewAll" >
              {MARKET_CATEGORY_PRODUCT.VIEWALL_BUTTON}
            </Button>
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-5 md:pr-6 pt-2 md:pt-0 lg:pt-0">
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
