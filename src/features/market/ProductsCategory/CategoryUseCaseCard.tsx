import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MouseEvent } from "react";

interface Category {
  id?: string | number;
  title: string;
  image: string;
  items: string[];
}

interface CategoryUseCaseCardProps {
  category: Category;
}

export default function CategoryUseCaseCard({
  category,
}: CategoryUseCaseCardProps) {
  const navigate = useNavigate();

  const handleItemClick = (e: MouseEvent<HTMLSpanElement>, item: string) => {
    e.stopPropagation();
    navigate(`/products?product=${encodeURIComponent(item)}`);
  };

  return (
    <div
      className="
        group relative overflow-hidden
        bg-black-900
        rounded-2xl
        px-2 py-4
        h-[200px]
        border border-white/10
        hover:border-white/30
        transition-all duration-300
      "
    >
      {/* BACKGROUND IMAGE */}
      <img
        src={category.image}
        alt={category.title}
        className="
          absolute inset-0
          w-full h-full
          object-cover
          opacity-30
          group-hover:opacity-45
          scale-100
          group-hover:scale-105
          transition-all duration-500
          pointer-events-none
        "
      />

      {/* GRADIENT OVERLAY */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-black/90
          via-black/55
          to-black/90
          pointer-events-none
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col h-full">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-sm">{category.title}</h3>
          <ArrowRight className="text-white/60 group-hover:text-white transition" />
        </div>

        {/* BODY */}
        <div className="flex gap-2 flex-1">
          {/* LEFT IMAGE */}
          <div className="w-[70%] rounded-xl overflow-hidden">
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT TAGS */}
          <div className="flex flex-wrap gap-2 content-start overflow-y-auto">
            {category.items.map((item, i) => (
              <span
                key={i}
                onClick={(e) => handleItemClick(e, item)}
                className="
                  text-xs px-3 py-1
                  rounded-full
                  bg-white text-black
                  hover:bg-gray-200
                  cursor-pointer
                  transition
                  whitespace-nowrap
                "
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
