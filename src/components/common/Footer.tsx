import {
  Apple,
  Facebook,
  Github,
  Linkedin,
  Smartphone,
  Twitter,
} from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const aboutUs = t("FOOTER.aboutUs", { returnObjects: true }) as string[];
  const jobCareers = t("FOOTER.jobCareers", {
    returnObjects: true,
  }) as string[];
  const buyToolkit = t("FOOTER.buyToolkit", {
    returnObjects: true,
  }) as string[];
  const accountingSolutions = t("FOOTER.accountingSolutions", {
    returnObjects: true,
  }) as string[];
  const supplierToolkit = t("FOOTER.supplierToolkit", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="w-[100%] mt-4 bg-blue-900 pb-2 text-white">
      <div className="flex justify-between flex-col sm:flex-row px-10 py-2 items-center">
        <span className="text-xl text-white">
          {t("FOOTER.footerHeaderText")}
        </span>
        <div className="flex gap-1 sm:gap-4 text-sm flex-col sm:flex-row">
          <div className="flex gap-2 items-center">
            <span>{t("FOOTER.goMobile")}</span>
            <div className="flex text-white">
              <span className="text-white h-8 w-8 flex items-center justify-center rounded-full cursor-pointer">
                <Apple color="white" size={22} />
              </span>
              <span className="h-8 w-8 flex items-center justify-center rounded-full cursor-pointer">
                <Github color="white" size={22} />
              </span>
              <span className="h-8 w-8 flex items-center justify-center rounded-full cursor-pointer">
                <Smartphone color="white" size={22} />
              </span>
            </div>
          </div>

          <div className="flex gap-2 items-center text-white">
            <span>{t("FOOTER.followUsOn")}</span>
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

      <div className="flex justify-between flex-col gap-4 sm:gap-0 sm:flex-row px-10 py-2 text-white text-sm text-left border-b-2">
        <div>
          {aboutUs.map((val, ind) => (
            <div key={ind}>
              <p className="cursor-pointer text-white">{val}</p>
            </div>
          ))}
        </div>
        <div>
          {jobCareers.map((val, ind) => (
            <div key={ind}>
              <p className="cursor-pointer text-white">{val}</p>
            </div>
          ))}
        </div>
        <div>
          {buyToolkit.map((val, ind) => (
            <div key={ind}>
              <p
                className={
                  ind === 0
                    ? "text-xl text-black cursor-pointer text-white"
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
            <div key={ind}>
              <p
                className={
                  ind === 0
                    ? "text-xl text-black cursor-pointer text-white"
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
            <div key={ind}>
              <p
                className={
                  ind === 0
                    ? "text-xl text-black cursor-pointer text-white"
                    : "text-sm cursor-pointer text-white"
                }
              >
                {val}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-white flex justify-between flex-col sm:flex-row gap-4 sm:gap-0 text-sm pt-2 px-8">
        <p>{t("FOOTER.copyRight")}</p>
        <p className="pointer cursor-pointer text-white">
          {t("FOOTER.termsUse")}
        </p>
      </div>
    </div>
  );
};

export default Footer;
