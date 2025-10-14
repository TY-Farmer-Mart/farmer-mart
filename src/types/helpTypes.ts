export interface HeroProps {
  title?: string;
  subtitle?: string;
  links?: { label: string; href: string }[];
}
export interface HelpCardProps {
  title: string;
  description: string;
 imageSrc?: string;       
  imageAlt?: string; 
}