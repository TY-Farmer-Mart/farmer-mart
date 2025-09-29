import * as Yup from "yup";
import { AUTH_VALIDATION } from "@/constants/textConstants";

const registerSchema = Yup.object().shape({
  name: Yup.string().required(AUTH_VALIDATION.NAME_REQUIRED),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, AUTH_VALIDATION.PHONE_INVALID)
    .required(AUTH_VALIDATION.PHONE_REQUIRED),

  email: Yup.string()
    .email(AUTH_VALIDATION.EMAIL_INVALID)
    .required(AUTH_VALIDATION.EMAIL_REQUIRED),

  role: Yup.string().required(AUTH_VALIDATION.ROLE_REQUIRED),

  gstNumber: Yup.string().when("role", {
    is: (role: string) => role === "vendor",
    then: (schema) =>
      schema.matches(/^[0-9]{15}$/, AUTH_VALIDATION.GST_INVALID),
    otherwise: (schema) => schema.notRequired(),
  }),

  password: Yup.string()
    .min(4, AUTH_VALIDATION.PASSWORD_MIN)
    .required(AUTH_VALIDATION.PASSWORD_REQUIRED),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], AUTH_VALIDATION.PASSWORD_MATCH)
    .required(AUTH_VALIDATION.CONFIRM_PASSWORD_REQUIRED),

  about: Yup.string().max(300, AUTH_VALIDATION.ABOUT_MAX),
});

export default registerSchema;
