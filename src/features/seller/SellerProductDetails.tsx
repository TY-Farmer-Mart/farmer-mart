import React, { useState } from "react";
import { CheckCircle, ImagePlus } from "lucide-react";

interface Product {
  name: string;
  image: string | null;
}

const SellerProductDetails: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { name: "", image: null },
    { name: "", image: null },
    { name: "", image: null },
  ]);

  const handleNameChange = (index: number, value: string) => {
    const updated = [...products];
    updated[index].name = value;
    setProducts(updated);
  };

  const handleImageChange = (index: number, file: File | null) => {
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const updated = [...products];
    updated[index].image = imageUrl;
    setProducts(updated);
  };

  const handleContinue = () => {
    alert("Products submitted:\n" + JSON.stringify(products, null, 2));
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 w-full max-w-3xl">
        {/* ✅ Success message */}
        <div className="flex items-center gap-2 text-green-600 mb-3">
          <CheckCircle className="w-5 h-5" />
          <p className="font-medium text-sm">
            Business details added successfully
          </p>
        </div>

        {/* 🟦 Title */}
        <h2 className="text-2xl font-bold text-blue-800 mb-1">
          Product Details
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Add 3 products/services you wish to sell, you can add more later:
        </p>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col gap-2 items-center">
              {/* Input field */}
              <input
                type="text"
                placeholder="Product/Service Name*"
                value={product.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />

              {/* Image Upload Box */}
              <label
                className="w-full h-40 border border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 text-sm cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <>
                    <ImagePlus className="w-10 h-10 mb-2 text-gray-400" />
                    <span>Add Photo</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageChange(index, e.target.files?.[0] || null)
                  }
                  className="hidden"
                />
              </label>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleContinue}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-md transition"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
};

export default SellerProductDetails;
