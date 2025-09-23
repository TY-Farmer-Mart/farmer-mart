import { MARKET_TEXT } from "@/constants/textConstants";
import { CircleStar, MessageSquareText, ShieldCheck } from "lucide-react";
import img from '@/assets/images/ss_money.jpg'

const HeroSection = () => {
  return (
    <div className="bg-red-100 flex">
      <div className="md:w-[25%]">
        <p className="font-extrabold text-2xl">{MARKET_TEXT.HERO_TEXT}</p>
        <p className="text-xl">{MARKET_TEXT.HERO_SUB}</p>
      <div className="flex">
        <div>
          <CircleStar />
          <p>{MARKET_TEXT.TITLE_ICON1}</p>
        </div>
        <div>
          <ShieldCheck />
          <p>{MARKET_TEXT.TITLE_ICON2}</p>
        </div>
        <div>
          <MessageSquareText />
          <p>{MARKET_TEXT.TITLE_ICON3}</p>
        </div>
      </div>
     </div> 
     <div>
       <img src={img} alt="" />
     </div>
    </div>
  );
};

export default HeroSection;
