import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CustomArrowProps } from "react-slick";
import { products } from "../utils/json_util";
import { Button } from "@/components/common/ui/Button";
import { useTranslation } from "react-i18next";

function Card({
  data,
  buttonText,
  onButtonClick,
}: {
  data: (typeof products)[number];
  buttonText?: string;
  onButtonClick?: (d: (typeof products)[number]) => void;
}) {
  return (
    <div
      className="
      relative
        flex flex-col
         h-[22rem] sm:h-[20rem] lg:h-[21rem] 
        bg-gray-200
        rounded-xl
        shadow-md
        transition-transform
        duration-300
        hover:scale-105
        mx-2
        px-3 py-4
      "
    >
      <img
        src={data.image}
        alt={data.name}
        className="h-44 sm:h-42 md:h-48 w-full object-cover "
      />

      <div className="p-4 pb-14 text-center">
        <h3 className="text-base sm:text-lg font-semibold line-clamp-2">
          {data.name}
        </h3>

        {buttonText && (
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="absolute bottom-3 left-1/2 -translate-x-1/2 
             text-white text-sm hover:bg-white hover:text-black-500 px-6 py-1 mt-3  whitespace-nowrap  "
            onClick={() => onButtonClick?.(data)}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}

const SampleNextArrow: React.FC<CustomArrowProps> = ({
  className,

  onClick,
}) => (
  <div
    className={`${className} !flex justify-center !items-center   !bg-green-300 !w-8 !h-8 rounded-2xl text-[40px] z-60  !p-4`}
    onClick={onClick}
  />
);

const SamplePrevArrow: React.FC<CustomArrowProps> = ({
  className,

  onClick,
}) => (
  <div
    className={`${className} !flex justify-center !items-center   !bg-green-300 !w-8 !h-8 rounded-2xl text-[40px] z-60 !p-4`}
    onClick={onClick}
  />
);

const DashboardCarousel = () => {
  const { t } = useTranslation();

  const isMobile = window.innerWidth <= 768;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="slider-container max-w-7xl mx-auto p-2 bg-white rounded-xl shadow-md py-6 ">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4 pb-3 text-center md:text-left px-3">
        {t("DASHBOARD_TEXT.DASHBOARD_CAROUSEL")}
      </h2>

      <Slider {...settings}>
        {products.map((p) => (
          <div key={p.id} className="px-2">
            <Card data={p} buttonText={t("DASHBOARD_TEXT.CAROUSEL_BUTTON")} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default DashboardCarousel;
