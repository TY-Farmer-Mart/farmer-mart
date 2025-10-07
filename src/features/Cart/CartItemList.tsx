import React from "react";
import { Button } from "@/components/common/ui/Button";
import { CartItemListProps } from "@/types/cartType";
import { useNavigate } from "react-router-dom";

export default function CartItemList({
  items,
  checkedItems,
  onCheckboxChange,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemListProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
      {items.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-600 flex items-center gap-4">
          <span className="w-[70%]">Your cart is empty</span>
          <Button
            variant="addToCart"
            size="lg"
            className="py-2 px-4 w-[30%]"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      ) : (
        items.map((item) => (
          <div
            key={item.cartId}
            className="flex items-start bg-white p-4 shadow rounded gap-4"
          >
            <div className="pt-1">
              <input
                type="checkbox"
                checked={checkedItems.includes(item.cartId!)}
                onChange={() => onCheckboxChange(item.cartId!)}
                className="w-4 h-4"
              />
            </div>

            <div className="flex flex-col">
              <img
                src={item.imageUrl}
                alt={item.itemName}
                className="w-24 h-18 object-cover border bg-white"
              />
              <div className="mt-2 flex items-center justify-center gap-2 text-gray-600">
                <Button
                  variant="circle"
                  size="sm"
                  className="rounded-full p-1"
                  onClick={() => onDecrement(item.cartId!)}
                >
                  −
                </Button>
                <span className="px-2 text-base text-black-900">
                  {item.quantity}
                </span>
                <Button
                  variant="circle"
                  size="sm"
                  className="rounded-full p-1"
                  onClick={() => onIncrement(item.cartId!)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between mb-6">
                <div className="text-left">
                  <h3 className="font-semibold text-base">{item.itemName}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Seller:{" "}
                    <span className="font-medium text-gray-700">
                      {item.sellerName}
                    </span>
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Delivery by <span className="font-medium">Sun Oct 12</span>
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="!text-black-900 px-2"
                  >
                    SAVE FOR LATER
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="!text-black-900 px-2"
                    onClick={() => onRemove(item.cartId!)}
                  >
                    REMOVE
                  </Button>
                </div>
                <div className="text-lg font-bold">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
