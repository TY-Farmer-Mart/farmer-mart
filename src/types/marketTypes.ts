export type CategoryItem = {
  title: string;
  image: string;
  items: string[];
};

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
