// // import { MARKET_TEXT } from "@/constants/textConstants";
// import { CircleStar, MessageSquareText, ShieldCheck } from "lucide-react";
// import img from "@/assets/images/farmer_ad.jpg";
// import img1 from "@/assets/images/home-banner-4.jpg";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useTranslation } from "react-i18next"; // import i18n
// import { Button } from "@/components/common/ui/Button";

// const countryCodes = [
//   { code: "+91", label: "India" },
//   { code: "+1", label: "USA" },
//   { code: "+44", label: "UK" },
// ];

// const validationSchema = Yup.object({
//   product: Yup.string().required("productRequired"),
//   countryCode: Yup.string().required("countryCodeRequired"),
//   mobile: Yup.string()
//     .matches(/^[0-9]{7,15}$/, "invalidMobile")
//     .required("mobileRequired"),
// });

// const BannerSection = () => {
//   const { t } = useTranslation(); // initialize translation

//   return (
//     <div className="p-2 bg-gray-100 lg:flex">
//       <div className="lg:w-[25%] md:[100%] md:flex flex-col justify-center gap-6 p-4">
//         <div>
//           <p className="font-extrabold text-3xl mb-2">
//             {t("MARKET_TEXT.HERO_TEXT")}
//           </p>
//           <p className="text-lg">{t("MARKET_TEXT.HERO_SUB")}</p>
//         </div>
//         <div className="flex gap-4 mt-4 justify-center">
//           <div className="flex flex-col items-center text-center gap-1">
//             <span className="bg-red-100 p-2 rounded-full mb-1">
//               <CircleStar className="text-red-500" size={28} />
//             </span>
//             <p className="text-sm font-medium">
//               {t("MARKET_TEXT.TITLE_ICON1")}
//             </p>
//           </div>
//           <div className="flex flex-col items-center text-center gap-1">
//             <span className="bg-green-100 p-2 rounded-full mb-1">
//               <ShieldCheck className="text-green-500" size={28} />
//             </span>
//             <p className="text-sm font-medium">
//               {t("MARKET_TEXT.TITLE_ICON2")}
//             </p>
//           </div>
//           <div className="flex flex-col items-center text-center gap-1">
//             <span className="bg-blue-100 p-2 rounded-full mb-1">
//               <MessageSquareText className="text-blue-500" size={28} />
//             </span>
//             <p className="text-sm font-medium">
//               {t("MARKET_TEXT.TITLE_ICON3")}
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="md:w-[100%] lg:w-[75%]  flex items-center justify-center">
//         <Carousel
//           showThumbs={false}
//           showStatus={false}
//           infiniteLoop
//           autoPlay
//           interval={4000}
//           className="w-full"
//         >
//           <div>
//             <img
//               src={img}
//               alt={t("bannerAlt1")}
//               className="object-fit w-full h-96"
//             />
//           </div>

//           <div className="relative h-96 w-full">
//             <img
//               src={img1}
//               alt={t("bannerAlt2")}
//               className="absolute inset-0 w-full h-full object-fit"
//             />
//             <div className="absolute top-1/2 md:right-8 transform -translate-y-1/2 p-6 w-80 max-w-full flex flex-col">
//               <Formik
//                 initialValues={{ product: "", countryCode: "+91", mobile: "" }}
//                 validationSchema={validationSchema}
//                 onSubmit={(values, { resetForm }) => {
//                   alert(JSON.stringify(values, null, 2));
//                   resetForm();
//                 }}
//               >
//                 {() => (
//                   <Form>
//                     <div className="mb-2">
//                       <Field
//                         name="product"
//                         type="text"
//                         placeholder={t("enterProduct")}
//                         className="w-full p-2 border rounded"
//                       />
//                       <ErrorMessage
//                         name="product"
//                         component="div"
//                         className="text-red-500 text-xs"
//                       >
//                         {(msg) => t(msg)}
//                       </ErrorMessage>
//                     </div>
//                     <div className="mb-2 flex gap-2">
//                       <Field
//                         as="select"
//                         name="countryCode"
//                         className="p-2 border rounded w-1/3"
//                       >
//                         {countryCodes.map((c) => (
//                           <option key={c.code} value={c.code}>
//                             {t(c.label)} ({c.code})
//                           </option>
//                         ))}
//                       </Field>
//                       <Field
//                         name="mobile"
//                         type="text"
//                         placeholder={t("mobileNumber")}
//                         className="w-2/3 p-2 border rounded"
//                       />
//                     </div>
//                     <ErrorMessage
//                       name="mobile"
//                       component="div"
//                       className="text-red-500 text-xs mb-2"
//                     >
//                       {(msg) => t(msg)}
//                     </ErrorMessage>
//                     <Button
//                       type="submit"
//                       className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
//                     >
//                       {t("MARKET_TEXT.SUBMIT_BUTTON")}
//                     </Button>
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//         </Carousel>
//       </div>
//     </div>
//   );
// };

// export default BannerSection;

import { ShieldCheck, Leaf, TrendingUp } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/common/ui/Button";

const validationSchema = Yup.object({
  product: Yup.string().required("Please enter your Product details"),
  mobile: Yup.string()
    .matches(/^[0-9]{7,15}$/, "Invalid Mobile Number")
    .required("Please enter your mobile number"),
});

const BannerSection = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* FARMER STORY */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-green-100">
          <span className="inline-block mb-4 px-4 py-1 bg-green-400 text-black-900 rounded-full text-sm">
            🌾 Farmer Story
          </span>

          <h1 className="text-4xl font-bold text-black-900 leading-tight">
            Real Farmers.
            <br />
            Real Produce.
            <br />
            Direct to You.
          </h1>

          <p className="mt-4 text-black-900 text-lg max-w-xl">
            Farmer Mart connects verified farmers directly with businesses,
            exporters, and bulk buyers — without middlemen.
          </p>

          {/* STORY CARDS */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StoryCard
              icon={<Leaf />}
              title="Fresh from Farms"
              desc="Direct sourcing from verified farmers"
            />
            <StoryCard
              icon={<ShieldCheck />}
              title="Verified Sellers"
              desc="Quality and trust ensured"
            />
            <StoryCard
              icon={<TrendingUp />}
              title="Fair Pricing"
              desc="Better margins for farmers & buyers"
            />
          </div>
        </div>

        {/* BUYER ACTION PANEL */}

        <div className=" relative bg-black-900 text-white rounded-3xl p-8 shadow-2xl border border-white/10  ">
          <h3 className="text-xl font-semibold mb-2">Get Price from Farmers</h3>
          <p className="text-green-100 mb-6 text-sm">
            Tell us what you need. We’ll connect you directly.
          </p>

          <Formik
            initialValues={{ product: "", mobile: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              alert(JSON.stringify(values, null, 2));
              resetForm();
            }}
          >
            {() => (
              <Form className="space-y-5">
                <div>
                  <Field
                    name="product"
                    placeholder="Product name (eg. Onions, Rice)"
                    className="w-full px-4 py-3 rounded-xl text-black"
                  />
                  <ErrorMessage
                    name="product"
                    component="div"
                    className="!text-red-500 text-xs mt-1"
                  >
                    {(msg) => t(msg)}
                  </ErrorMessage>
                </div>

                <div>
                  <Field
                    name="mobile"
                    placeholder="Mobile number"
                    className="w-full px-4 py-3 rounded-xl text-black"
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="!text-red-500 text-xs mt-1"
                  >
                    {(msg) => t(msg)}
                  </ErrorMessage>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-300 hover:!bg-green-400 text-green-700 font-semibold rounded-xl py-3"
                >
                  Connect to Farmers
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* TRUST STRIP */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <TrustMetric value="10,000+" label="Verified Farmers" />
        <TrustMetric value="1M+" label="Tons Traded" />
        <TrustMetric value="500+" label="Cities Covered" />
        <TrustMetric value="98%" label="Buyer Satisfaction" />
      </div>
    </section>
  );
};

export default BannerSection;

/* ----------------- SUB COMPONENTS ----------------- */

const StoryCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="p-4 rounded-2xl bg-green-50 text-center">
    <div className="flex justify-center mb-2 text-green-700">{icon}</div>
    <p className="font-semibold">{title}</p>
    <p className="text-sm text-gray-600 mt-1">{desc}</p>
  </div>
);

const TrustMetric = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition">
    <p className="text-3xl font-bold text-green-700">{value}</p>
    <p className="text-sm text-black-900 mt-1">{label}</p>
  </div>
);
