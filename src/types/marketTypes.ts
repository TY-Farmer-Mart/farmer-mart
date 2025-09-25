export type CategoryItem = {
  title: string;
  image: string;
  items: ProductName[];
};

export type ProductName = string;

export type LeftCard = {
  title: string;
  description: string;
  image: string;
  onViewAll?: () => void; 
};

export type CategorySectionType = {
  leftCard: Omit<LeftCard, "onViewAll">; 
  categories: CategoryItem[];
};

export type CategoryData = {
  categories: CategorySectionType[];
};

export interface Option {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string; // optional extra classes
}