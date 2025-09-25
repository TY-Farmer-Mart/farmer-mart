export interface SlideItem {
  id: number | string;
  name: string;
  image: string;
  price?: string;
}

export interface CommonCarouselProps {
  slides: SlideItem[];
  autoPlay?: boolean;
  interval?: number;
  centerSlidePercentage?: number;
  title?: string;
  buttonText?: string;
  onButtonClick?: (item: SlideItem) => void;
}
