export interface StateOption {
  value: string;
  label: string;
}

export interface NavOption {
  value: "export" | "sell" | "cart" | "help";
  label: string;
  path: string;
}

export interface NavIconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  cartCount?: number
}

export interface NavbarProps {
  state?: string;
  setStatets?: (value: string) => void;
  stateOptions?: StateOption[];
}
