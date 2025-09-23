import {
  Apple,
  Facebook,
  Github,
  Linkedin,
  Smartphone,
  Twitter,
} from "lucide-react";
import { footer_data } from "@utils/json_util";

const Footer = () => {
  const {
    footerHeaderText,
    goMobile,
    followUsOn,
    aboutUs,
    jobCareers,
    buyToolkit,
    accountingSolutions,
    supplierToolkit,
    copyRight,
    termsUse,
  } = footer_data;
  return (
    <div className="w-[100%] mt-4 bg-gray-200 pb-2">
      <div className="flex justify-between flex-col sm:flex-row  px-10 py-2 items-center">
        <span className="text-xl text-blue-900">{footerHeaderText}</span>
        <div className="flex gap-1 sm:gap-4 text-sm flex-col sm:flex-row">
          <div className="flex gap-2 items-center">
            <span>{goMobile}</span>
            <div className="flex">
              <span className="h-8 w-8 flex items-center justify-center  rounded-full cursor-pointer">
                <Apple color="black" size={22} />
              </span>
              <span className="h-8 w-8 flex items-center justify-center  rounded-full cursor-pointer">
                <Github color="black" size={22} />
              </span>
              <span className="h-8 w-8 flex items-center justify-center  rounded-full cursor-pointer">
                <Smartphone color="black" size={22} />
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <span>{followUsOn}</span>
            <div className="flex gap-2">
              <span className="h-8 w-8 flex items-center justify-center bg-blue-950 rounded-full cursor-pointer">
                <Facebook color="white" size={22} />
              </span>
              <span className="h-8 w-8 flex items-center justify-center bg-blue-950 rounded-full cursor-pointer">
                <Twitter color="white" size={22} />
              </span>
              <span className="h-8 w-8 flex items-center justify-center bg-blue-950 rounded-full cursor-pointer">
                <Linkedin color="white" size={22} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-col gap-4 sm:gap-0 sm:flex-row px-10 py-2 text-gray-700 text-sm text-left border-b-2">
        <div className="">
          {aboutUs.map((val, ind) => (
            <div>
              <p key={ind} className="cursor-pointer">
                {val}
              </p>
            </div>
          ))}
        </div>
        <div>
          {jobCareers.map((val, ind) => (
            <div>
              <p key={ind} className="cursor-pointer">
                {val}
              </p>
            </div>
          ))}
        </div>
        <div>
          {buyToolkit.map((val, ind) => (
            <div>
              <p
                key={ind}
                className={
                  ind === 0
                    ? "text-xl text-black cursor-pointer"
                    : "text-sm cursor-pointer"
                }
              >
                {val}
              </p>
            </div>
          ))}
        </div>
        <div>
          {accountingSolutions.map((val, ind) => (
            <div>
              <p
                key={ind}
                className={
                  ind === 0
                    ? "text-xl text-black cursor-pointer"
                    : "text-sm cursor-pointer"
                }
              >
                {val}
              </p>
            </div>
          ))}
        </div>
        <div>
          {supplierToolkit.map((val, ind) => (
            <div>
              <p
                key={ind}
                className={
                  ind === 0
                    ? "text-xl text-black cursor-pointer"
                    : "text-sm cursor-pointer"
                }
              >
                {val}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between flex-col sm:flex-row gap-4 sm:gap-0 text-gray-700 text-sm pt-2">
        <p>{copyRight}</p>
        <p className="pointer cursor-pointer">{termsUse}</p>
      </div>
    </div>
  );
};

export default Footer;
