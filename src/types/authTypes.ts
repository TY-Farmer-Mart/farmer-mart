import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "social"
    | "viewAll";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  requiredIndicator?: boolean;
}
export interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}
interface Option {
  label: string;
  value: string;
}
export interface SelectProps {
  label?: string;
  name: string;
  options: readonly Option[];
  error?: string;
  helperText?: string;
  requiredIndicator?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}
export interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
}
export interface CartItem {
  id?: number;
  textTop?: string;
  textBottom?: string;
  Btn?: string;
}

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
}


export interface MoreForYouCardProps {
  heading: string;
  services: Service[];
}
