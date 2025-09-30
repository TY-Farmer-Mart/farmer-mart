// src/components/common/Toast/ToastProvider.tsx
import { Toaster } from "react-hot-toast";
import React from "react";

const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#fff",
          color: "#333",
          fontSize: "14px",
          borderRadius: "12px",
          padding: "12px 16px",
        },
        success: {
          style: {
            background: "#ecfdf5",
            color: "#065f46",
            border: "1px solid #10b981",
          },
          iconTheme: {
            primary: "#10b981",
            secondary: "#ecfdf5",
          },
        },
        error: {
          style: {
            background: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #ef4444",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fef2f2",
          },
        },
        loading: {
          style: {
            background: "#f3f4f6", // light gray
            color: "#111827",
            border: "1px solid #9ca3af",
          },
        },
      }}
    />
  );
};

export default ToastProvider;
