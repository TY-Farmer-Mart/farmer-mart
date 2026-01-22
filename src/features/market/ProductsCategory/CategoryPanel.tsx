import type { CategorySectionType, ProductName } from "@/types/marketTypes";
import { useNavigate } from "react-router-dom";

type Props = {
  section: CategorySectionType;
};

export default function CategoryPanel({ section }: Props) {
  const navigate = useNavigate();

  const handleClick = (item: ProductName) => {
    navigate(`/products?product=${encodeURIComponent(item)}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* LEFT STORY */}
      <div className="bg-white rounded-3xl p-8 border border-green-100">
        <span className="inline-block mb-4 px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm">
          Use Case
        </span>

        <h3 className="text-2xl font-bold mb-3">{section.leftCard.title}</h3>

        <p className="text-gray-600 mb-6">{section.leftCard.description}</p>

        <button
          onClick={() => navigate("/products")}
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl"
        >
          View All
        </button>
      </div>

      {/* RIGHT CARDS */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {section.categories.slice(0, 6).map((cat) => (
          <div
            key={cat.title}
            className="bg-white rounded-2xl p-6 border hover:border-green-600 transition"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-12 h-12 object-contain"
              />
              <h4 className="font-semibold text-lg">{cat.title}</h4>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.items.slice(0, 5).map((item, i) => (
                <span
                  key={i}
                  onClick={() => handleClick(item)}
                  className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm cursor-pointer hover:bg-green-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
