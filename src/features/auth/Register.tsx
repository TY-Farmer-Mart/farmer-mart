import React from "react";
import { Formik, Form } from "formik";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { SelectInput } from "@/components/common/ui/SelectInput";
import { Textarea } from "@/components/common/ui/Textarea";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routeConstants";
import { registerUser } from "@/services/auth";
import {
  showLoading,
  dismissToast,
  showSuccess,
  showError,
} from "@/components/common/Toast/toast";
import { Toaster } from "react-hot-toast";
import { ROLE_OPTIONS } from "@/constants/textConstants";
import registerSchema from "@/schemas/registerSchema";

const Register: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, setErrors }: any
  ) => {
    // Show loading toast with infinite duration
    const toastId = showLoading("Registering your account...", {
      duration: Infinity,
    });

    try {
      // Map phone → contact and remove confirmPassword
      const { phone, ...rest } = values;
      const payload = { ...rest, contact: phone };
      console.log("Payload to backend:", payload);

      // Call backend API
      await registerUser(payload);

      // Dismiss loading toast
      dismissToast(toastId);

      // Show success toast
      showSuccess("Account created successfully! Please login.");

      // Delay navigation so toast is visible
      setTimeout(() => {
        navigate(`${ROUTES.AUTH}${ROUTES.LOGIN}`);
      }, 1500); // 1.5 seconds delay
    } catch (err: any) {
      // Dismiss loading toast
      dismissToast(toastId);

      // Show error toast
      showError(err.message || "Something went wrong.");

      // Set form errors if any
      if (err.errors) setErrors(err.errors);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
          },
          success: {
            style: {
              background: "#ecfdf5",
              color: "#065f46",
              border: "1px solid #10b981",
            },
            iconTheme: { primary: "#10b981", secondary: "#ecfdf5" },
          },
          error: {
            style: {
              background: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #ef4444",
            },
            iconTheme: { primary: "#ef4444", secondary: "#fef2f2" },
          },
          loading: {
            style: {
              background: "#f3f4f6",
              color: "#111827",
              border: "1px solid #9ca3af",
            },
          },
        }}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          submitCount,
        
        }) => (
          
           <Form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t("AUTH.NAME_LABEL")}
              placeholder={t("AUTH.NAME_PLACEHOLDER")}
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
              label={t("AUTH.PHONE_LABEL")}
              placeholder={t("AUTH.PHONE_PLACEHOLDER")}
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
            label={t("AUTH.EMAIL_LABEL")}
            placeholder={t("AUTH.EMAIL_PLACEHOLDER")}
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
            label={t("AUTH.ROLE_LABEL")}
            name="role"
            value={values.role}
            className="px-4 py-2"
            onChange={handleChange}
            onBlur={handleBlur}
            options={ROLE_OPTIONS}
            requiredIndicator
            error={
              (touched.role || submitCount > 0) && errors.role
                ? errors.role
                : ""
            }
          />

          {values.role === "vendor" && (
            <Input
              label={t("AUTH.GST_LABEL")}
              placeholder={t("AUTH.GST_PLACEHOLDER")}
              name="gstNumber"
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
              label={t("AUTH.PASSWORD_LABEL")}
              placeholder={t("AUTH.PASSWORD_PLACEHOLDER")}
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
              label={t("AUTH.CONFIRM_PASSWORD_LABEL")}
              placeholder={t("AUTH.CONFIRM_PASSWORD_PLACEHOLDER")}
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
            label={t("AUTH.ABOUT_LABEL")}
            placeholder={t("AUTH.ABOUT_PLACEHOLDER")}
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
            {t("AUTH.SIGNUP_BUTTON")}
          </Button>

          <p className="text-center text-sm text-gray-600 m-0 py-2">
            {t("AUTH.ALREADY_HAVE_ACCOUNT")}

            <span
              className="text-green-600 hover:underline"
              onClick={() => navigate(`${ROUTES.AUTH}${ROUTES.LOGIN}`)}
            >
              {t("AUTH.TITLE")}
            </span>
          </p>
        </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
