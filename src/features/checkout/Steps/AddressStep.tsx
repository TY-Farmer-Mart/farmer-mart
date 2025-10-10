import React, { useEffect, useState } from "react";
import { State, City } from "country-state-city";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
import { addAddress, selectAddress } from "@/redux/checkoutSlice";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AddressFormValues, CityOption, StateOption, StepProps } from "@/types/checkoutTypes";

const COUNTRY_CODE = "IN";

const AddressStep: React.FC<StepProps> = ({ isActive = true, onNext }) => {
  const dispatch = useDispatch<AppDispatch>();
  const addresses = useSelector((state: RootState) => state.checkout.addresses);
  const selectedAddressId = useSelector(
    (state: RootState) => state.checkout.selectedAddressId
  );

  const [form, setForm] = useState<AddressFormValues>({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    landmark: "",
    altPhone: "",
    addressType: "home",
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [stateOptions, setStateOptions] = useState<StateOption[]>([]);
  const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
  const [selectedStateIso, setSelectedStateIso] = useState<string>("");


  const AddressSchema = Yup.object({
    name: Yup.string().min(2).max(50).required("Name is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Enter a valid 10-digit number")
      .required("Mobile is required"),
    pincode: Yup.string()
      .matches(/^\d{6}$/, "Enter a valid 6-digit pincode")
      .required("Pincode is required"),
    address: Yup.string()
      .min(10, "Provide full address")
      .required("Address is required"),
    locality: Yup.string().required("Locality is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    landmark: Yup.string().optional(),
    altPhone: Yup.string().matches(
      /^$|^\d{10}$/,
      "Enter a valid 10-digit number"
    ),
    addressType: Yup.mixed<"home" | "work">().oneOf(["home", "work"]).required(),
  });


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
          addressType: "home",
        })
      );
    }
  }, [dispatch, addresses.length]);


  useEffect(() => {
    if (selectedAddressId) {
      const selected = addresses.find((a) => a.id === selectedAddressId);
      if (selected) {
        setForm({
          name: selected.name,
          phone: selected.phone,
          pincode: selected.pincode,
          address: selected.address,
          locality: selected.locality || "",
          city: selected.city || "",
          state: selected.state || "",
          landmark: selected.landmark || "",
          altPhone: selected.altPhone || "",
          addressType: selected.addressType || "home",
        });

        const st = State.getStatesOfCountry(COUNTRY_CODE).find(
          (s) => s.name === selected.state
        );
        setSelectedStateIso(st?.isoCode || "");
      }
    }
  }, [selectedAddressId, addresses]);


  useEffect(() => {
    try {
      const states = State.getStatesOfCountry(COUNTRY_CODE) || [];
      setStateOptions(states.map((s) => ({ name: s.name, isoCode: s.isoCode })));
    } catch {
      console.error("Failed to load states");
    }
  }, []);


  useEffect(() => {
    if (selectedStateIso) {
      try {
        const cities = City.getCitiesOfState(COUNTRY_CODE, selectedStateIso);
        setCityOptions(cities.map((c) => ({ name: c.name })));
      } catch {
        setCityOptions([]);
      }
    } else {
      setCityOptions([]);
    }
  }, [selectedStateIso]);

  if (!isActive) return null;


  const handleSelect = (id: string) => {
    dispatch(selectAddress(id));
    const selected = addresses.find((a) => a.id === id);
    if (selected) {
      setForm({
        name: selected.name,
        phone: selected.phone,
        pincode: selected.pincode,
        address: selected.address,
        locality: selected.locality || "",
        city: selected.city || "",
        state: selected.state || "",
        landmark: selected.landmark || "",
        altPhone: selected.altPhone || "",
        addressType: selected.addressType || "home",
      });
    }
  };

  
  const handleSaveAndContinue = (
    values: AddressFormValues,
    { resetForm }: FormikHelpers<AddressFormValues>
  ) => {
    const id = selectedAddressId || `addr-${Date.now()}`;
    dispatch(addAddress({ id, ...values }));
    dispatch(selectAddress(id));
    resetForm();
    if (onNext) onNext();
  };

  const startAddNew = () => {
    setShowAddForm(true);
    setForm({
      name: "",
      phone: "",
      pincode: "",
      address: "",
      locality: "",
      city: "",
      state: "",
      landmark: "",
      altPhone: "",
      addressType: "home",
    });
  };

  const editAddress = (id: string) => {
    handleSelect(id);
    setShowAddForm(true);
  };

  const deliverHere = () => {
    if (selectedAddressId && onNext) onNext();
  };

  return (
    <div className="p-6 bg-white rounded shadow border">
      <h2 className="text-base font-semibold mb-4 text-gray-700">
        Delivery Address
      </h2>


      {addresses.length > 0 && (
        <div className="mb-5">
          <div className="flex flex-col gap-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-3 border rounded transition-colors bg-blue-50/30 ${
                  selectedAddressId === addr.id
                    ? "border-blue-600"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <label
                    className="flex items-start gap-3 flex-1 cursor-pointer"
                    onClick={() => handleSelect(addr.id)}
                  >
                    <input
                      type="radio"
                      name="savedAddress"
                      checked={selectedAddressId === addr.id}
                      onChange={() => handleSelect(addr.id)}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800">
                          {addr.name}
                        </p>
                        {addr.addressType && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-gray-200 text-gray-700 uppercase">
                            {addr.addressType}
                          </span>
                        )}
                        {addr.phone && (
                          <span className="text-gray-700 font-medium">
                            {addr.phone}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-800">
                        {addr.address}
                        {addr.locality ? `, ${addr.locality}` : ""}
                        {addr.city ? `, ${addr.city}` : ""}
                        {addr.state ? `, ${addr.state}` : ""}
                        {addr.pincode ? ` - ${addr.pincode}` : ""}
                      </p>
                    </div>
                  </label>
                  <button
                    type="button"
                    className="text-blue-600 text-sm font-medium"
                    onClick={() => editAddress(addr.id)}
                  >
                    EDIT
                  </button>
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={deliverHere}
                    className={`px-4 py-2 rounded font-semibold ${
                      selectedAddressId === addr.id
                        ? "bg-orange-500 text-white"
                        : "bg-gray-300 text-gray-700 cursor-not-allowed"
                    }`}
                    disabled={selectedAddressId !== addr.id}
                  >
                    DELIVER HERE
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t">
            <button
              type="button"
              className="text-blue-600 font-medium flex items-center gap-2"
              onClick={startAddNew}
            >
              <span className="text-lg">+</span> Add a new address
            </button>
          </div>
        </div>
      )}


      {(showAddForm || addresses.length === 0) && (
        <Formik
          initialValues={form}
          validationSchema={AddressSchema}
          enableReinitialize
          onSubmit={handleSaveAndContinue}
        >
          {({ isValid, setFieldValue, values }) => (
            <Form className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Field
                    className="border rounded px-3 py-2 w-full"
                    name="name"
                    placeholder="Name"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-red-600 text-xs mt-1"
                    name="name"
                  />
                </div>
                <div>
                  <Field
                    className="border rounded px-3 py-2 w-full"
                    name="phone"
                    placeholder="10-digit mobile number"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-red-600 text-xs mt-1"
                    name="phone"
                  />
                </div>
                <div>
                  <Field
                    className="border rounded px-3 py-2 w-full"
                    name="pincode"
                    placeholder="Pincode"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-red-600 text-xs mt-1"
                    name="pincode"
                  />
                </div>
                <div>
                  <Field
                    className="border rounded px-3 py-2 w-full"
                    name="locality"
                    placeholder="Locality"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-red-600 text-xs mt-1"
                    name="locality"
                  />
                </div>
                <div className="col-span-2">
                  <Field
                    as="textarea"
                    className="border rounded w-full px-3 py-2"
                    name="address"
                    placeholder="Address (Area and Street)"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-red-600 text-xs mt-1"
                    name="address"
                  />
                </div>
                <div>
                  <select
                    className="border rounded px-3 py-2 w-full"
                    value={
                      stateOptions.find((s) => s.name === values.state)
                        ?.isoCode || ""
                    }
                    onChange={(e) => {
                      const iso = e.target.value;
                      const st = stateOptions.find((s) => s.isoCode === iso);
                      setFieldValue("state", st ? st.name : "");
                      setSelectedStateIso(iso);
                      setFieldValue("city", "");
                    }}
                  >
                    <option value="">--Select State--</option>
                    {stateOptions.map((s) => (
                      <option key={s.isoCode} value={s.isoCode}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    component="div"
                    className="text-red-600 text-xs mt-1"
                    name="state"
                  />
                </div>
                <div>
                  <Field
                    as="select"
                    className="border rounded px-3 py-2 w-full"
                    name="city"
                    disabled={!selectedStateIso || cityOptions.length === 0}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFieldValue("city", e.target.value)
                    }
                  >
                    <option value="">--Select City--</option>
                    {cityOptions.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    component="div"
                    className="text-red-600 text-xs mt-1"
                    name="city"
                  />
                </div>
                <div>
                  <Field
                    className="border rounded px-3 py-2 w-full"
                    name="landmark"
                    placeholder="Landmark (Optional)"
                  />
                </div>
                <div>
                  <Field
                    className="border rounded px-3 py-2 w-full"
                    name="altPhone"
                    placeholder="Alternate Phone (Optional)"
                  />
                  <ErrorMessage
                    component="div"
                    className="text-red-600 text-xs mt-1"
                    name="altPhone"
                  />
                </div>
              </div>

 
              <div className="mt-4">
                <p className="text-sm text-gray-700 mb-2">Address Type</p>
                <label className="mr-6 inline-flex items-center gap-2">
                  <Field type="radio" name="addressType" value="home" /> Home
                  (All day delivery)
                </label>
                <label className="inline-flex items-center gap-2">
                  <Field type="radio" name="addressType" value="work" /> Work
                  (Delivery between 10 AM - 5 PM)
                </label>
              </div>


              <div className="mt-4 grid grid-cols-[1fr_auto] gap-4 items-center">
                <button
                  type="submit"
                  className={`w-full ${
                    isValid
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-gray-300 cursor-not-allowed"
                  } text-white py-2 rounded font-semibold`}
                  disabled={!isValid}
                >
                  Save and Deliver Here
                </button>
                <button
                  type="button"
                  className="text-blue-600"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AddressStep;