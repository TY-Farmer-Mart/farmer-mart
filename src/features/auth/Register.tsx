import React from "react";
import { Formik, Form } from "formik";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import registerSchema from "@/schemas/registerSchema";
import { AUTH_TEXT } from "@/constants/textConstants";

const Register: React.FC = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 justify-center items-center"></div>

      <div className="flex w-full lg:w-1/2 justify-center items-center p-4">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {AUTH_TEXT.REGISTER}
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={(values) => {
              console.log("Form Submitted:", values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className="space-y-4">
                <Input
                  label={AUTH_TEXT.NAME_LABEL}
                  type="text"
                  name="name"
                  placeholder={AUTH_TEXT.NAME_PLACEHOLDER}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="px-4 py-2"
                  error={
                    touched.name && typeof errors.name === "string"
                      ? errors.name
                      : ""
                  }
                />

                <Input
                  label={AUTH_TEXT.EMAIL_LABEL}
                  type="email"
                  name="email"
                  placeholder={AUTH_TEXT.EMAIL_PLACEHOLDER}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="px-4 py-2"
                  error={
                    touched.email && typeof errors.email === "string"
                      ? errors.email
                      : ""
                  }
                />

                <Input
                  label={AUTH_TEXT.PASSWORD_LABEL}
                  type="password"
                  name="password"
                  placeholder={AUTH_TEXT.PASSWORD_PLACEHOLDER}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="px-4 py-2"
                  error={
                    touched.password && typeof errors.password === "string"
                      ? errors.password
                      : ""
                  }
                />

                <Input
                  label={AUTH_TEXT.CONFIRM_PASSWORD_LABEL}
                  type="password"
                  name="confirmPassword"
                  placeholder={AUTH_TEXT.CONFIRM_PASSWORD_PLACEHOLDER}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="px-4 py-2"
                  error={
                    touched.confirmPassword &&
                    typeof errors.confirmPassword === "string"
                      ? errors.confirmPassword
                      : ""
                  }
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  {AUTH_TEXT.SIGNUP_BUTTON}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
