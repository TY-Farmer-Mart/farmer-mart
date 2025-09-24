
// Type for each state/location option
export interface StateOption {
  value: string;
  label: string;
}

// Type for each nav button option
export interface NavOption {
  value: "export" | "sell" | "help";
  label: string;
}

// Props for individual nav icon buttons
export interface NavIconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export interface NavbarProps {
  state?: string;                  // make optional
  setStatets?: (value: string) => void; // make optional
  stateOptions?: StateOption[];    // already optional
}
