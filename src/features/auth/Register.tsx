import React from "react";
import { Formik, Form } from "formik";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { SelectInput } from "@/components/common/ui/SelectInput";
import { Textarea } from "@/components/common/ui/Textarea";
import registerSchema from "@/schemas/registerSchema";
import { AUTH_TEXT, ROLE_OPTIONS } from "@/constants/textConstants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routeConstants";
const Register: React.FC = () => {
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    role: "",
    gstNumber: "",
    password: "",
    confirmPassword: "",
    about: "",
  };
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={() => {
          alert("Register Successfully!");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          submitCount,
        }) => (
          <Form className="space-y-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={AUTH_TEXT.NAME_LABEL}
                placeholder={AUTH_TEXT.NAME_PLACEHOLDER}
                name="name"
                value={values.name}
                className="px-4 py-2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  (touched.name || submitCount > 0) && errors.name
                    ? errors.name
                    : ""
                }
              />

              <Input
                label={AUTH_TEXT.PHONE_LABEL}
                placeholder={AUTH_TEXT.PHONE_PLACEHOLDER}
                name="phone"
                value={values.phone}
                className="px-4 py-2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  (touched.phone || submitCount > 0) && errors.phone
                    ? errors.phone
                    : ""
                }
              />
            </div>

            <Input
              label={AUTH_TEXT.EMAIL_LABEL}
              placeholder={AUTH_TEXT.EMAIL_PLACEHOLDER}
              name="email"
              type="email"
              value={values.email}
              className="px-4 py-2"
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                (touched.email || submitCount > 0) && errors.email
                  ? errors.email
                  : ""
              }
            />

            <SelectInput
              label={AUTH_TEXT.ROLE_LABEL}
              name="role"
              value={values.role}
              className="px-4 py-2"
              onChange={handleChange}
              requiredIndicator={true}
              onBlur={handleBlur}
              options={ROLE_OPTIONS}
              error={
                (touched.role || submitCount > 0) && errors.role
                  ? errors.role
                  : ""
              }
            />

            {values.role === "vendor" && (
              <Input
                label={AUTH_TEXT.GST_LABEL}
                placeholder={AUTH_TEXT.GST_PLACEHOLDER}
                name="gstNumber"
                requiredIndicator={false}
                value={values.gstNumber}
                className="px-4 py-2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  (touched.gstNumber || submitCount > 0) && errors.gstNumber
                    ? errors.gstNumber
                    : ""
                }
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={AUTH_TEXT.PASSWORD_LABEL}
                placeholder={AUTH_TEXT.PASSWORD_PLACEHOLDER}
                name="password"
                type="password"
                value={values.password}
                className="px-4 py-2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  (touched.password || submitCount > 0) && errors.password
                    ? errors.password
                    : ""
                }
              />

              <Input
                label={AUTH_TEXT.CONFIRM_PASSWORD_LABEL}
                placeholder={AUTH_TEXT.CONFIRM_PASSWORD_PLACEHOLDER}
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                className="px-4 py-2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  (touched.confirmPassword || submitCount > 0) &&
                    errors.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
              />
            </div>

            <Textarea
              label={AUTH_TEXT.ABOUT_LABEL}
              placeholder={AUTH_TEXT.ABOUT_PLACEHOLDER}
              name="about"
              value={values.about}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                (touched.about || submitCount > 0) && errors.about
                  ? errors.about
                  : ""
              }
            />

            <Button type="submit" variant="primary" className="w-full">
              {AUTH_TEXT.SIGNUP_BUTTON}
            </Button>
            <p className="text-center text-sm text-gray-600 m-0 py-2">
              {AUTH_TEXT.ALREADY_HAVE_ACCOUNT}
              <button
                type="button"
                onClick={() => navigate(`${ROUTES.AUTH}${ROUTES.LOGIN}`)}
                className="text-green-600 font-semibold hover:underline"
              >
                {AUTH_TEXT.TITLE}
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
