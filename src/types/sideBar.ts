export interface SidebarData {
  name?: string;
  mobile?: number;
  address?: string;
  menuItem: { name: string; icon: React.ReactNode; path: string }[];
  help?: string;
  imageIcon?: string;
}

export interface menuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}


