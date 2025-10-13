import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Building2, CheckCircle, Mail, MapPin, User } from "lucide-react";

interface BusinessFormValues {
  name: string;
  companyName: string;
  pinCode: string;
  city: string;
  state: string;
  email: string;
}

interface Props {
  onNext: () => void;
}

const SellerBusinessDetails: React.FC<Props> = ({ onNext }) => {

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(); // Move to next step (Product)
  };

  const formik = useFormik<BusinessFormValues>({
    initialValues: {
      name: "",
      companyName: "",
      pinCode: "",
      city: "",
      state: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required*"),
      companyName: Yup.string().required("Company name cannot be blank*"),
      pinCode: Yup.string()
        .matches(/^\d{6}$/, "Enter a valid 6-digit PIN code*")
        .required("PIN Code is required*"),
      city: Yup.string().required("City is required*"),
      state: Yup.string().required("State is required*"),
      email: Yup.string().email("Invalid email*").required("Email is required*"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <section className="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-10 lg:gap-16 bg-gray-50 min-h-screen px-6 py-10">
      {/* LEFT SIDE - FORM */}
      <div className="w-full md:w-[60%] bg-white shadow-lg rounded-xl p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col items-start">
          <p className="text-green-600 font-medium text-sm">
            ✅ Account created successfully
          </p>
          <h2 className="text-2xl font-bold text-blue-700 mt-2">
            Business Details
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Start adding your business details:
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium text-start">
              Your Name<span className="text-red-500">*</span>
            </label>
            <div
              className={`flex items-center border rounded-md px-3 py-2 ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full outline-none bg-transparent"
              />
            </div>
          <div className="text-start">
              {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-start">
              Company/Business/Shop Name<span className="text-red-500">*</span>
            </label>
            <div
              className={`flex items-center  border rounded-md px-3 py-2 ${
                formik.touched.companyName && formik.errors.companyName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <Building2 className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="companyName"
                placeholder="Enter company or shop name"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full outline-none bg-transparent"
              />
            </div>
          <div className="text-start">
              {formik.touched.companyName && formik.errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.companyName}
              </p>
            )}
          </div>
          </div>

          {/* Pin, City, State */}
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-start">
  {/* Pin Code */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">
      Pin Code<span className="text-red-500">*</span>
    </label>
    <div
      className={`flex items-center border rounded-md px-3 py-2 ${
        formik.touched.pinCode && formik.errors.pinCode
          ? "border-red-500"
          : "border-gray-300"
      }`}
    >
      <MapPin className="w-5 h-5 text-gray-500 mr-2" />
      <input
        type="text"
        name="pinCode"
        value={formik.values.pinCode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full outline-none bg-transparent"
        placeholder="600001"
      />
    </div>
    {/* 🔹 Error message */}
    {formik.touched.pinCode && formik.errors.pinCode && (
      <p className="text-red-500 text-sm mt-1">{formik.errors.pinCode}</p>
    )}
  </div>

  {/* City */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">
      City<span className="text-red-500">*</span>
    </label>
    <div
      className={`flex items-center border rounded-md px-3 py-2 ${
        formik.touched.city && formik.errors.city
          ? "border-red-500"
          : "border-gray-300"
      }`}
    >
      <Building2 className="w-5 h-5 text-gray-500 mr-2" />
      <input
        type="text"
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full outline-none bg-transparent"
        placeholder="City"
      />
    </div>
    {/* 🔹 Error message */}
    {formik.touched.city && formik.errors.city && (
      <p className="text-red-500 text-sm mt-1">{formik.errors.city}</p>
    )}
  </div>

  {/* State */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">
      State<span className="text-red-500">*</span>
    </label>
    <div
      className={`flex items-center border rounded-md px-3 py-2 ${
        formik.touched.state && formik.errors.state
          ? "border-red-500"
          : "border-gray-300"
      }`}
    >
      <Building2 className="w-5 h-5 text-gray-500 mr-2" />
      <input
        type="text"
        name="state"
        value={formik.values.state}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full outline-none bg-transparent"
        placeholder="State"
      />
    </div>
    {/* 🔹 Error message */}
    {formik.touched.state && formik.errors.state && (
      <p className="text-red-500 text-sm mt-1">{formik.errors.state}</p>
    )}
  </div>
</div>

          {/* Email */}
         <div>
  <label className="block text-gray-700 font-medium mb-1 text-start">
    Email ID<span className="text-red-500">*</span>
  </label>
  <div
    className={`flex items-start border rounded-md px-3 py-2 ${
      formik.touched.email && formik.errors.email
        ? "border-red-500"
        : "border-gray-300"
    }`}
  >
    <Mail className="w-5 h-5 text-gray-500 mr-2" />
    <input
      type="email"
      name="email"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      placeholder="Enter your email"
      className="w-full outline-none bg-transparent"
    />
    <button
      type="button"
      className="text-green-600 text-sm font-medium ml-2"
    >
      Verify
    </button>
  </div>

  {/* 🔹 Add this block to show validation message */}
  <div className="text-start">
    {formik.touched.email && formik.errors.email && (
      <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
    )}
  </div>
</div>


          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md transition"
            >
              Verify Later
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE - PROFILE CARD */}
      <div className="w-full md:w-[35%] bg-white shadow-lg rounded-xl p-6 h-fit">
        <div className="border-b pb-2 mb-3 flex items-center gap-2">
          <Building2 className="text-teal-600 w-5 h-5" />
          <h3 className="text-lg font-semibold text-gray-800">
            Your Profile So Far
          </h3>
        </div>

        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <p className="font-medium">Your Name</p>
            <p className="font-semibold text-gray-900">
              {formik.values.name || "—"}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium">Mobile Number</p>
            <div className="flex items-center gap-1">
              <p className="font-semibold text-gray-900">xyz</p>
              <CheckCircle className="text-green-500 w-4 h-4" />
            </div>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Address</p>
            <p className="font-semibold text-gray-900 text-right">
              {formik.values.city && formik.values.state
                ? `${formik.values.city}, ${formik.values.state}`
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerBusinessDetails;
