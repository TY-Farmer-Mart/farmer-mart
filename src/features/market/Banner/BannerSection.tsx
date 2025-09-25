import { MARKET_TEXT } from "@/constants/textConstants";
import { CircleStar, MessageSquareText, ShieldCheck } from "lucide-react";
import img from '@/assets/images/farmer_ad.jpg'
import img1 from '@/assets/images/home-banner-4.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const countryCodes = [
  { code: "+91", label: "India" },
  { code: "+1", label: "USA" },
  { code: "+44", label: "UK" },
];

const validationSchema = Yup.object({
  product: Yup.string().required("Product is required"),
  countryCode: Yup.string().required("Country code is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{7,15}$/, "Enter a valid mobile number")
    .required("Mobile number is required"),
});

const BannerSection = () => {
  return (
    <div className="p-2 bg-gray-100 lg:flex">
      <div className="lg:w-[25%] md:[100%] md:flex flex-col justify-center gap-6 p-4">
        <div>
          <p className="font-extrabold text-3xl mb-2">{MARKET_TEXT.HERO_TEXT}</p>
          <p className="text-lg">{MARKET_TEXT.HERO_SUB}</p>
        </div>
        <div className="flex gap-4 mt-4 justify-center">
          <div className="flex flex-col items-center text-center gap-1">
            <span className="bg-red-100 p-2 rounded-full mb-1">
              <CircleStar className="text-red-500" size={28} />
            </span>
            <p className="text-sm font-medium">{MARKET_TEXT.TITLE_ICON1}</p>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <span className="bg-green-100 p-2 rounded-full mb-1">
              <ShieldCheck className="text-green-500" size={28} />
            </span>
            <p className="text-sm font-medium">{MARKET_TEXT.TITLE_ICON2}</p>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <span className="bg-blue-100 p-2 rounded-full mb-1">
              <MessageSquareText className="text-blue-500" size={28} />
            </span>
            <p className="text-sm font-medium">{MARKET_TEXT.TITLE_ICON3}</p>
          </div>
        </div>
      </div>
      <div className="md:w-[100%] lg:w-[75%]  flex items-center justify-center">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={4000}
          className="w-full"
        >
          <div>
            <img src={img} alt="banner" className="object-fit w-full h-96" />
          </div>

          <div className="relative h-96 w-full">
            <img
              src={img1}
              alt="banner2"
              className="absolute inset-0 w-full h-full object-fit"
            />
            <div className="absolute top-1/2 md:right-8 transform -translate-y-1/2 p-6 w-80 max-w-full flex flex-col">
              <Formik
                initialValues={{ product: "", countryCode: "+91", mobile: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  // handle form submit here
                  alert(JSON.stringify(values, null, 2));
                  resetForm();
                }}
              >
                {() => (
                  <Form>
                    <div className="mb-2">
                      <Field
                        name="product"
                        type="text"
                        placeholder="Enter Product"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage name="product" component="div" className="text-red-500 text-xs" />
                    </div>
                    <div className="mb-2 flex gap-2">
                      <Field
                        as="select"
                        name="countryCode"
                        className="p-2 border rounded w-1/3"
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.label} ({c.code})
                          </option>
                        ))}
                      </Field>
                      <Field
                        name="mobile"
                        type="text"
                        placeholder="Mobile Number"
                        className="w-2/3 p-2 border rounded"
                      />
                    </div>
                    <ErrorMessage name="mobile" component="div" className="text-red-500 text-xs mb-2" />
                    <button
                      type="submit"
                      className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                      {MARKET_TEXT.SUBMIT_BUTTON}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default BannerSection;