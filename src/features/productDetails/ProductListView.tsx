import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import {
  Heart,
  ShoppingCart,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import productText from "@/locales/en.json";
import Pointer from "@/assets/images/Pointer.webp";


import { Button } from "@/components/common/ui/Button";

import { addToCart } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { CardProduct } from "@/types/cartType";
import { RootState } from "@/redux/store";
const ProductListView: React.FC = () => {

  const { state } = useLocation();
  const supplier = state?.supplier;
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sliderRef = useRef<Slider>(null);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (!supplier) {
    return (
      <div className="p-6">{productText.PRODUCT_LIST_VIEW.NO_PRODUCT}</div>
    );
  }

  const product = supplier;
  const TEXT = productText.PRODUCT_LIST_VIEW;
  const visibleOffers = showAllOffers ? TEXT.OFFERS : TEXT.OFFERS.slice(0, 3);
  const isInCart = cartItems.some(
    (item) => item.id === product.id && item.sellerName === supplier.sellerName
  );

  const handleAddToCart = (product: CardProduct) => {
    const productToAdd = {
      ...product,
      sellerName: supplier.sellerName,
      location: supplier.location,
      quantity: 1,
    };

    dispatch(addToCart(productToAdd));
    navigate("/addtocart");
  };

  if (!supplier) {
    return (
      <div className="p-6">{productText.PRODUCT_LIST_VIEW.NO_PRODUCT}</div>
    );
  }


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    pauseOnHover: true,
  };
  const images = Array.isArray(product.imageUrl)
    ? product.imageUrl
    : [product.imageUrl];

  return (
    <div className="bg-gray-100 p-4 min-h-screen">
      <div className="flex flex-col lg:flex-row bg-white shadow-md p-6 gap-6 text-left">
        <div className="lg:w-2/4 flex flex-col justify-start lg:sticky lg:top-6 lg:self-start">
          <div className="border relative flex justify-center items-center">
            <Slider ref={sliderRef} {...sliderSettings} className="w-full">
              {images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="flex justify-center items-center w-full lg:h-[300px]"
                >
                  <div className="flex justify-center items-center w-full h-full">
                    <img
                      src={img}
                      alt={`${product.itemName} ${idx + 1}`}
                      className="w-full md:max-w-[350px] md:h-[300px] max-w-[200px] h-[200px] object-contain"
                    />
                  </div>
                </div>
              ))}
            </Slider>

            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-lg z-10"
            >
              <ChevronLeft className="w-2 h-2 md:w-5 md:h-5" />
            </button>

            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-lg z-10"
            >
              <ChevronRight className="w-2 h-2 md:w-5 md:h-5" />
            </button>

            <div
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute md:top-2 top-1 right-2 p-1 sm:p-2 rounded-full bg-white border-2 border-gray-100 shadow-xl cursor-pointer"
            >
              <Heart
                className="w-4 h-4 sm:w-4 sm:h-4"
                color={isFavorite ? "red" : "lightgray"}
                fill={isFavorite ? "red" : "lightgray"}
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button
              onClick={() => handleAddToCart(product)}
              variant="addToCart"
              leftIcon={<ShoppingCart size={20} />}
              disabled={isInCart}
            >
              {isInCart ? "Added to Cart" : TEXT.ADD_TO_CART}
            </Button>
            <Button variant="buyNow" leftIcon={<Zap size={20} />}>
              {TEXT.BUY_NOW}
            </Button>
          </div>
        </div>

        <div className="lg:w-3/4">
          <h1 className="text-2xl font-bold">{product.itemName}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-green-600 text-white px-2 py-0.5 md:text-sm text-xs w-[70px] h-[30px] rounded text-center flex justify-center items-center">
              {supplier.rating} ★
            </span>
            <span className="text-gray-800 text-sm">
              {supplier.sellerName} • {supplier.location}
            </span>
          </div>
          <div className="mt-3">
            <span className="md:text-3xl text-2xl font-bold text-black">
              ₹{product.price}
            </span>
            <span className="ml-2 text-black line-through">
              ₹{Number(product.price) * 2}
            </span>
            <span className="ml-2 text-green-600 font-medium">46% off</span>
          </div>
          <p className="mt-2 text-black text-sm">
            {product.quantity} • {TEXT.VERIFIED}{" "}
            {supplier.verified ? TEXT.YES : TEXT.NO}
          </p>
          <p className="mt-2 text-black text-sm">{TEXT.SECURE_DELIVERY}</p>
          <p className="mt-2 text-black text-sm">
            {TEXT.PAY_EXTRA} {product.price + 100}
          </p>
          <div className="mt-4">
            <h2 className="font-medium">{TEXT.AVAILABLE_OFFERS}</h2>
            <div className="mt-1 space-y-2">
              {visibleOffers.map((offer, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <img src={Pointer} alt="offer" className="w-4 h-4 mt-0.5" />
                  <span>{offer}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAllOffers(!showAllOffers)}
              className="mt-2 text-blue-600 text-sm font-medium hover:underline"
            >
              {showAllOffers
                ? TEXT.SHOW_LESS
                : `View ${TEXT.OFFERS.length - 3} more offers`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
