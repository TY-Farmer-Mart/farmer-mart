import Modal from "@/components/common/modal/Modal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PAYMENT_TEXTS from "@/constants/PaymentConstants";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice"; 

const CodSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePlaceOrder = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearCart());
    navigate("/products");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{PAYMENT_TEXTS.COD_HEADER}</h2>
      <p className="text-gray-600 mb-4">{PAYMENT_TEXTS.COD_DESCRIPTION}</p>

      <button
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold w-full py-2 rounded-md transition-colors duration-200 shadow-sm"
        onClick={handlePlaceOrder}
      >
        {PAYMENT_TEXTS.COD_PLACE_ORDER}
      </button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-semibold mb-4 pt-5">
          {PAYMENT_TEXTS.COD_MODAL_TITLE}
        </h2>
        <p>{PAYMENT_TEXTS.COD_MODAL_DESC}</p>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          onClick={handleCloseModal}
        >
          {PAYMENT_TEXTS.COD_MODAL_CLOSE}
        </button>
      </Modal>
    </div>
  );
};

export default CodSection;
