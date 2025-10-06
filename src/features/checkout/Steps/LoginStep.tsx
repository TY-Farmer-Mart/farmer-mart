import React from "react";
import { useDispatch } from "react-redux";
import { goToNextStep } from "@/redux/checkoutSlice";

interface Props {
  isActive?: boolean; // defaults to true when used as a standalone route
  onNext?: () => void;
}

const LoginStep: React.FC<Props> = ({ isActive = true, onNext }) => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Simulate login success
    if (onNext) onNext();
  };

  if (!isActive) return null;

  return (
    <div className="p-6 bg-white rounded shadow border">
      <h2 className="text-base font-semibold mb-4 text-gray-700">Login / Signup</h2>
      <p className="mb-4">Please login to continue with your checkout.</p>
      <button
        onClick={handleLogin}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
      >
        Login / Continue
      </button>
    </div>
  );
};

export default LoginStep;
