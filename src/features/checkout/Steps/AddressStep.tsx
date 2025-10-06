import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addAddress, selectAddress } from "@/redux/checkoutSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Props {
  isActive?: boolean; // defaults to true when used as a standalone route
  onNext?: () => void;
}

const AddressStep: React.FC<Props> = ({ isActive = true, onNext }) => {
  const dispatch = useDispatch();
  const addresses = useSelector((state: RootState) => state.checkout.addresses);
  const selectedAddressId = useSelector(
    (state: RootState) => state.checkout.selectedAddressId
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    landmark: "",
    altPhone: "",
    addressType: "home" as "home" | "work",
  });

  const AddressSchema = Yup.object({
    name: Yup.string().min(2).max(50).required("Name is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Enter a valid 10-digit number")
      .required("Mobile is required"),
    pincode: Yup.string()
      .matches(/^\d{6}$/, "Enter a valid 6-digit pincode")
      .required("Pincode is required"),
    address: Yup.string().min(10, "Provide full address").required("Address is required"),
    locality: Yup.string().required("Locality is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    landmark: Yup.string().optional(),
    altPhone: Yup.string().matches(/^$|^\d{10}$/, "Enter a valid 10-digit number"),
    addressType: Yup.mixed().oneOf(["home", "work"]).required(),
  });

  // Prefill from user profile if present and not already in state
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    if (user?.user?.address && addresses.length === 0) {
      dispatch(
        addAddress({
          id: "default",
          name: user.user.name || "",
          phone: user.user.contact || "",
          address: user.user.address,
          pincode: "",
        })
      );
    }
  }, [dispatch]);

  if (!isActive) return null;

  const handleSelect = (id: string) => {
    dispatch(selectAddress(id));
  };

  const handleSaveAndContinue = (values: typeof form) => {
    const id = selectedAddressId || `addr-${Date.now()}`;
    dispatch(
      addAddress({
        id,
        name: values.name,
        phone: values.phone,
        address: values.address,
        pincode: values.pincode,
        locality: values.locality,
        city: values.city,
        state: values.state,
        landmark: values.landmark,
        altPhone: values.altPhone,
        addressType: values.addressType,
      })
    );
    if (onNext) onNext();
  };

  return (
    <div className="p-6 bg-white rounded shadow border">
      <h2 className="text-base font-semibold mb-4 text-gray-700">Delivery Address</h2>
      {addresses.length > 0 && (
        <div className="flex flex-col gap-3">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => handleSelect(addr.id)}
              className={`p-3 border rounded cursor-pointer transition-colors ${
                selectedAddressId === addr.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <p className="font-semibold text-gray-800">{addr.name}</p>
              <p>
                {addr.address}, {addr.pincode}
              </p>
              <p>{addr.phone}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add new address (Formik) */}
      <Formik initialValues={form} validationSchema={AddressSchema} enableReinitialize onSubmit={handleSaveAndContinue}>
        {({ isValid }) => (
          <Form className="mt-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Field className="border rounded px-3 py-2 w-full" name="name" placeholder="Name" />
                <ErrorMessage component="div" className="text-red-600 text-xs mt-1" name="name" />
              </div>
              <div>
                <Field className="border rounded px-3 py-2 w-full" name="phone" placeholder="10-digit mobile number" />
                <ErrorMessage component="div" className="text-red-600 text-xs mt-1" name="phone" />
              </div>
              <div>
                <Field className="border rounded px-3 py-2 w-full" name="pincode" placeholder="Pincode" />
                <ErrorMessage component="div" className="text-red-600 text-xs mt-1" name="pincode" />
              </div>
              <div>
                <Field className="border rounded px-3 py-2 w-full" name="locality" placeholder="Locality" />
                <ErrorMessage component="div" className="text-red-600 text-xs mt-1" name="locality" />
              </div>
              <div className="col-span-2">
                <Field as="textarea" className="border rounded w-full px-3 py-2" name="address" placeholder="Address (Area and Street)" />
                <ErrorMessage component="div" className="text-red-600 text-xs mt-1" name="address" />
              </div>
              <div>
                <Field className="border rounded px-3 py-2 w-full" name="city" placeholder="City/District/Town" />
                <ErrorMessage component="div" className="text-red-600 text-xs mt-1" name="city" />
              </div>
              <div>
                <Field as="select" className="border rounded px-3 py-2 w-full" name="state">
                  <option value="">--Select State--</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                </Field>
                <ErrorMessage component="div" className="text-red-600 text-xs mt-1" name="state" />
              </div>
              <div>
                <Field className="border rounded px-3 py-2 w-full" name="landmark" placeholder="Landmark (Optional)" />
              </div>
              <div>
                <Field className="border rounded px-3 py-2 w-full" name="altPhone" placeholder="Alternate Phone (Optional)" />
                <ErrorMessage component="div" className="text-red-600 text-xs mt-1" name="altPhone" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-700 mb-2">Address Type</p>
              <label className="mr-6 inline-flex items-center gap-2">
                <Field type="radio" name="addressType" value="home" /> Home (All day delivery)
              </label>
              <label className="inline-flex items-center gap-2">
                <Field type="radio" name="addressType" value="work" /> Work (Delivery between 10 AM - 5 PM)
              </label>
            </div>
            <div className="mt-4 grid grid-cols-[1fr_auto] gap-4 items-center">
              <button type="submit" className={`w-full ${isValid ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-300 cursor-not-allowed"} text-white py-2 rounded font-semibold`} disabled={!isValid}>
                Save and Deliver Here
              </button>
              <button type="button" className="text-blue-600">Cancel</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddressStep;
