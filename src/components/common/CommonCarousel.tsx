import type { CommonCarouselProps, SlideItem } from "@/types/carouselTypes";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from "@/components/common/ui/Button";

export default function CommonCarousel({
  slides,
  autoPlay = true,
  interval = 4000,
  centerSlidePercentage = 25,
  title,
  buttonText,
  onButtonClick,
}: CommonCarouselProps) {
  const pairSlides: SlideItem[][] = [];
  for (let i = 0; i < slides.length; i += 2) {
    pairSlides.push(slides.slice(i, i + 2));
  }

  return (
    <div className="max-w-7xl w-full mx-auto rounded-xl bg-white shadow-md p-4">
      {title && (
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4 text-left pb-3">
          {title}
        </h2>
      )}

      <div className="block md:hidden  relative">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop
          autoPlay={autoPlay}
          interval={interval}
          swipeable
          emulateTouch
          centerMode
          centerSlidePercentage={90}
          className="w-full h-72 rounded-lg bg-white"
        >
          {slides.map((p) => (
            <Card
              key={p.id}
              data={p}
              buttonText={buttonText}
              onButtonClick={onButtonClick}
            />
          ))}
        </Carousel>
      </div>

      <div className="hidden md:block lg:hidden relative">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop
          autoPlay={autoPlay}
          interval={interval}
          swipeable
          emulateTouch
          className="w-full h-80 rounded-lg bg-white"
        >
          {pairSlides.map((pair, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-4 px-3 py-3">
              {pair.map((p) => (
                <Card
                  key={p.id}
                  data={p}
                  buttonText={buttonText}
                  onButtonClick={onButtonClick}
                />
              ))}
            </div>
          ))}
        </Carousel>
      </div>

      <div className="hidden lg:block relative ">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop
          autoPlay={autoPlay}
          interval={interval}
          swipeable
          emulateTouch
          centerMode
          centerSlidePercentage={centerSlidePercentage}
          className="w-full h-80 rounded-lg  bg-white"
        >
          {slides.map((p) => (
            <Card
              key={p.id}
              data={p}
              buttonText={buttonText}
              onButtonClick={onButtonClick}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

function Card({
  data,
  buttonText,
  onButtonClick,
}: {
  data: SlideItem;
  buttonText?: string;
  onButtonClick?: (d: SlideItem) => void;
}) {
  return (
    <div className=" px-3 py-3  mb-18 bg-gray-200 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 mx-2 ">
      <img
        src={data.image}
        alt={data.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg md:text-sm font-semibold">{data.name}</h3>
        {buttonText && (
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="bg-[#007A6E] text-white !text-sm hover:bg-white hover:text-black-900 px-6 py-1 mt-2"
            onClick={() => onButtonClick?.(data)}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
