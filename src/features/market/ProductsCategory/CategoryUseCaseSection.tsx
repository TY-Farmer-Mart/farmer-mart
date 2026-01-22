import { useRef, useState, MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryUseCaseCard from "./CategoryUseCaseCard";
import { Category } from "@/types/marketTypes";

interface CategoryUseCaseSectionProps {
  title: string;
  description: string;
  categories: Category[];
}

export default function CategoryUseCaseSection({
  title,
  description,
  categories,
}: CategoryUseCaseSectionProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ---------------- HAND SCROLL REFS ----------------
  const isDown = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);

  const visible = expanded ? categories : categories.slice(0, 6);

  // ---------------- ARROW SCROLL ----------------
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  // ---------------- HAND SCROLL HANDLERS ----------------
  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    isDown.current = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    scrollRef.current?.classList.remove("cursor-grabbing");
  };

  const onMouseUp = () => {
    isDown.current = false;
    scrollRef.current?.classList.remove("cursor-grabbing");
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !scrollRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-left text-2xl font-bold text-black-900">
            {title}
          </h2>
          <p className="text-black-900">{description}</p>
        </div>

        {/* VIEW ALL / SHOW LESS */}
        {categories.length > 6 && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-sm font-medium text-green-600 hover:underline"
          >
            {expanded ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      {/* CARD ROW */}
      <div className="relative">
        {/* LEFT ARROW */}
        {!expanded && (
          <div className="absolute left-0 inset-y-0 flex items-center z-20">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-black transition shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        )}

        {/* RIGHT ARROW */}
        {!expanded && (
          <div className="absolute right-0 inset-y-0 flex items-center z-20">
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-black transition shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* CARDS */}
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          className={`grid gap-6 select-none cursor-grab ${
            expanded
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-flow-col auto-cols-[280px] overflow-x-hidden"
          }`}
        >
          {visible.map((category, i) => (
            <CategoryUseCaseCard key={category.id ?? i} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
