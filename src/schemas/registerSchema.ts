import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  role: Yup.string().required("Role is required"),

  gstNumber: Yup.string().when("role", {
    is: (role: string) => !!role,
    then: (schema) =>
      schema.matches(/^[0-9]{15}$/, "GST number must be 15 digits"),
    otherwise: (schema) => schema.notRequired(),
  }),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),

  about: Yup.string()
    .max(300, "About section must not exceed 300 characters")
    .notRequired(),
});

export default registerSchema;
