export interface StateOption {
  value: string;
  label: string;
}

export interface NavOption {
  value: "export" | "sell" | "help";
  label: string;
}

export interface NavIconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export interface NavbarProps {
  state?: string;
  setStatets?: (value: string) => void;
  stateOptions?: StateOption[];
}
