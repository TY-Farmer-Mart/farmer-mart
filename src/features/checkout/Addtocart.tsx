import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cartSlice";

const AddToCart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (cartId: string) => {
    setCheckedItems((prev) =>
      prev.includes(cartId)
        ? prev.filter((id) => id !== cartId)
        : [...prev, cartId]
    );
  };

  useEffect(() => {
    if (selectAll) {
      const allIds = cartItems
        .map((c) => c.cartId!)
        .filter(Boolean) as string[];
      setCheckedItems(allIds);
    } else {
      setCheckedItems((prev) =>
        prev.filter((id) => cartItems.some((c) => c.cartId === id))
      );
    }
  }, [selectAll, cartItems.length]);

  useEffect(() => {
    setCheckedItems((prev) =>
      prev.filter((id) => cartItems.some((c) => c.cartId === id))
    );
  }, [cartItems]);

  const checkedCartItems = cartItems.filter((item) =>
    checkedItems.includes(item.cartId!)
  );
  const totalPrice = checkedCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const PLATFORM_FEE = 7;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex gap-6">
        {/* Left Side: Cart Items */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Header */}
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-end gap-6">
                <div className="text-blue-600 border-b-2 border-blue-600 pb-2 font-semibold">
                  Cart Items ({cartItems.length})
                </div>
              </div>
              {cartItems.length > 0 && (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={() => setSelectAll((prev) => !prev)}
                    className="w-4 h-4"
                  />
                  Select All
                </label>
              )}
            </div>
          </div>

          {/* Delivery Info */}
          <div className="flex justify-between items-center bg-white p-4 rounded shadow">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">Deliver to:</span>
              <span className="font-semibold">Samastipur - 848101</span>
            </div>
            <div>
              <button className="text-blue-600 hover:underline text-sm">
                Change
              </button>
            </div>
          </div>

          {/* Empty Cart */}
          {cartItems.length === 0 ? (
            <div className="bg-white p-6 rounded shadow text-gray-600">
              Your cart is empty
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartId}
                className="flex items-start bg-white p-4 shadow rounded gap-4"
              >
                {/* Checkbox */}
                <div className="pt-1">
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.cartId!)}
                    onChange={() => handleCheckboxChange(item.cartId!)}
                    className="w-4 h-4"
                  />
                </div>

                {/* Product Image and Actions */}
                <div className="flex flex-col items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.itemName}
                    className="w-24 h-20 object-cover border bg-white"
                  />

                  <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-gray-600 flex-nowrap">
                    <div className="flex items-center border rounded text-[10px]">
                      <button
                        onClick={() =>
                          dispatch(decrementQuantity(item.cartId!))
                        }
                        className="px-1 py-0.5"
                      >
                        −
                      </button>
                      <span className="px-1">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(incrementQuantity(item.cartId!))
                        }
                        className="px-1 py-0.5"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.cartId!))}
                      className="hover:underline"
                    >
                      REMOVE
                    </button>
                    <button className="hover:underline">SAVE FOR LATER</button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-base">
                        {item.itemName}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Seller:{" "}
                        <span className="font-medium text-gray-700">
                          {item.sellerName}
                        </span>
                      </p>
                    </div>

                    <p className="text-sm text-gray-500">
                      Delivery by{" "}
                      <span className="font-medium">Sun Oct 12</span>
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <div className="text-lg font-bold">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Price Summary */}
        <aside className="w-80">
          <div className="bg-white p-4 shadow rounded sticky top-6">
            <h2 className="font-semibold mb-3 text-lg">PRICE DETAILS</h2>

            <div className="flex justify-between mb-2 text-sm">
              <span>Price ({checkedItems.length} items)</span>
              <span>₹{checkedItems.length > 0 ? totalPrice : 0}</span>
            </div>

            <div className="flex justify-between mb-2 text-sm text-green-600">
              <span>Discount</span>
              <span>- ₹0</span>
            </div>

            <div className="flex justify-between mb-2 text-sm text-green-600">
              <span>Coupons for you</span>
              <span>- ₹0</span>
            </div>

            <div className="flex justify-between mb-2 text-sm">
              <span>Platform Fee</span>
              <span>₹{checkedItems.length > 0 ? PLATFORM_FEE : 0}</span>
            </div>

            <div className="border-t mt-3 pt-3 flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>
                ₹{checkedItems.length > 0 ? totalPrice + PLATFORM_FEE : 0}
              </span>
            </div>

            <p className="text-green-600 mt-2 text-sm">
              {checkedItems.length > 0
                ? `You will save ₹0 on this order`
                : `No savings available`}
            </p>

            <button
              className={`mt-4 w-full ${
                checkedItems.length > 0
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white py-2 rounded font-semibold`}
              disabled={checkedItems.length === 0}
            >
              Place Order
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AddToCart;
