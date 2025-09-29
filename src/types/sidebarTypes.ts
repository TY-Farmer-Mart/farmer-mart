export interface SidebarOption {
  label: string;
  image?: string;
}

export interface SidebarSectionBase {
  type: "text" | "filter";
  title: string;
}

export interface TextSection extends SidebarSectionBase {
  type: "text";
  options: (string | SidebarOption)[];
  showRange?: boolean;
}

export interface FilterSection extends SidebarSectionBase {
  type: "filter";
  options: string[];
}

export type SidebarSection = TextSection | FilterSection;


export interface DropdownOption {
  label: string;
  image?: string;
}

export interface TextDropdownProps {
  title: string;
  options: (string | DropdownOption)[];
  onSelect?: (value: string) => void;
  showRange?: boolean;
}

export interface FilterSectionProps {
  title: string;
  options: string[];
  
}
