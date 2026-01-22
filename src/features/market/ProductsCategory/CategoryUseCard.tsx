import { CategoryUseCaseCardProps } from "@/types/marketTypes";
import { useNavigate } from "react-router-dom";

export default function CategoryUseCaseCard({
  category,
}: CategoryUseCaseCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="min-w-[260px] bg-[#F7FBF7] border border-green-100 rounded-2xl p-5 
                 hover:shadow-md transition cursor-pointer"
      onClick={() => navigate(`/products?product=${category.title}`)}
    >
      <img
        src={category.image}
        alt={category.title}
        className="w-14 h-14 object-contain mb-4"
      />

      <h3 className="font-semibold text-gray-900 mb-3">{category.title}</h3>

      <div className="flex flex-wrap gap-2">
        {category.items.slice(0, 3).map((item, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
