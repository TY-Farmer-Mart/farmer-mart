// src/components/common/Toast/toast.ts
import toast from "react-hot-toast";

export const showSuccess = (message: string) => toast.success(message);
export const showError = (message: string) => toast.error(message);
export const showLoading = (message: string, p0: { duration: number; }) => toast.loading(message);
export const dismissToast = (id: string) => toast.dismiss(id);
