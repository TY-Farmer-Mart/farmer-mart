import React, { useState, ChangeEvent, FormEvent } from "react";
import deal_img from "@assets/QuoteForm/img_1.png";
import quote_img from "@assets/QuoteForm/img_2.png";
import need_img from "@assets/QuoteForm/img_3.png";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { QUOTE_FORM } from "@/constants/textConstants";
interface FormData {
  product: string;
  mobile: string;
}

const QuoteForm = () => {
  const [form, setForm] = useState<FormData>({ product: "", mobile: "" });
  const [countryName, setCountryName] = useState<string>("India");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Data:", form);
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="md:basis-[40%] flex flex-col  p-8 ml-8 mt-4 text-center md:text-left ">
          <h2 className="text-4xl">
            {QUOTE_FORM.HEADING_GET}{" "}
            <span className="font-semibold">{QUOTE_FORM.HEADING_FREE}</span>
            {QUOTE_FORM.HEADING_QUOTE}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-4 w-full place-items-center">
            <div className="flex flex-col items-center">
              <img
                src={need_img}
                alt={QUOTE_FORM.NEED_ALT}
                className="w-20 h-22 ml-1 flex justify-center items-center "
              />
              <p className="text-sm mt-4">
                {QUOTE_FORM.NEED_TITLE}
                <br />
                <b>{QUOTE_FORM.NEED_SUBTITLE}</b>
              </p>
            </div>
            <div className="flex flex-col">
              <img
                src={quote_img}
                alt={QUOTE_FORM.QUOTE_ALT}
                className="w-24 h-22"
              />
              <p className="text-sm mt-4">
                {QUOTE_FORM.QUOTE_TITLE}
                <br />
                <b>{QUOTE_FORM.QUOTE_SUBTITLE}</b>
              </p>
            </div>
            <div className="flex flex-col">
              <img
                src={deal_img}
                alt={QUOTE_FORM.DEAL_ALT}
                className="w-20 h-22"
              />
              <p className="text-sm mt-3">
                {QUOTE_FORM.DEAL_TITLE}
                <br />
                <b>{QUOTE_FORM.DEAL_SUBTITLE}</b>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="md:basis-[60%] flex flex-col p-8 ml-4 mt-4 bg-white md:justify-center md:items-center">
          <h3 className="text-xl text-left font-bold mb-4">
            {QUOTE_FORM.FORM}
          </h3>

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <input
              type="text"
              name="product"
              value={form.product}
              onChange={handleChange}
              placeholder={QUOTE_FORM.PRODUCT}
              className="border w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Phone input with dropdown */}
            <PhoneInput
              initialCountry="in"
              value={form.mobile}
              onChange={(phone) =>
                setForm((prev) => ({ ...prev, mobile: phone }))
              }
              onCountryChange={(country) => setCountryName(country)}
              className="w-full"
              inputClassName="p-2 border rounded w-full"
            />

            {/* Selected country display */}
            <p className="text-sm text-left text-gray-500">
              {QUOTE_FORM.COUNTRY_TEXT}{" "}
              <span className="font-medium underline">{countryName}</span>
            </p>

            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-3 rounded font-semibold transition"
            >
              {QUOTE_FORM.SUBMIT}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
