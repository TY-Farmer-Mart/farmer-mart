import React from "react";
import { useDispatch } from "react-redux";
import { goToNextStep } from "@/redux/checkoutSlice";
import { Formik, Form, FormikHelpers } from "formik";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { LoginSchema, LoginFormValues } from "@/schemas/loginSchema";
import { loginUser } from "@/services/auth";
import { StepProps, StoredUser, LoginResponse } from "@/types/checkoutTypes";

const LoginStep: React.FC<StepProps> = ({ isActive = true, onNext }) => {
  const dispatch = useDispatch();

  if (!isActive) return null;

  const initialValues: LoginFormValues = { email: "", password: "" };

  const getStoredToken = (): string | undefined => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const parsed: StoredUser = JSON.parse(userStr);
        if (parsed?.token) return parsed.token;
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
    }
    return localStorage.getItem("token") || undefined;
  };

  const getUserEmail = (): string => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const parsed: StoredUser = JSON.parse(userStr);
        return parsed?.user?.email ?? parsed?.email ?? "";
      }
    } catch (err) {
      console.error("Failed to parse user email from localStorage", err);
    }
    return "";
  };

  const isAuthenticated = Boolean(getStoredToken());
  const userEmail = getUserEmail();

  return (
    <div className="p-6 bg-white rounded shadow border">
      <h2 className="text-base font-semibold mb-4 text-gray-700">
        Login / Signup
      </h2>

      {isAuthenticated ? (
        <>
          <div className="mb-4 p-3 bg-gray-50 rounded border">
            <p className="text-sm text-gray-600 mb-1">Logged in as:</p>
            <p className="font-medium text-gray-800">{userEmail}</p>
          </div>
          <Button
            type="button"
            variant="primary"
            size="md"
            className="w-full mb-6"
            onClick={() => (onNext ? onNext() : dispatch(goToNextStep()))}
          >
            Continue
          </Button>
        </>
      ) : (
        <p className="mb-4">Please login to continue with your checkout.</p>
      )}

      {!isAuthenticated && (
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={async (
            values: LoginFormValues,
            { setSubmitting, setStatus }: FormikHelpers<LoginFormValues>
          ) => {
            setStatus(undefined);
            try {
              const res: LoginResponse = await loginUser(values);

              if (res?.token) {
                try {
                  const storedUser: StoredUser = {
                    message: res.message ?? "Login successful",
                    token: res.token,
                  };
                  localStorage.setItem("user", JSON.stringify(storedUser));
                } catch (err) {
                  console.error("Failed to save user to localStorage", err);
                }
              }

              if (onNext) onNext();
              else dispatch(goToNextStep());
            } catch (err: unknown) {
              const message =
                err instanceof Error ? err.message : "Login failed";
              setStatus(message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            status,
          }) => (
            <Form className="space-y-4">
              <Input
                label="Email Address"
                placeholder="Enter your email"
                name="email"
                type="email"
                value={values.email}
                className="px-4 py-2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? errors.email : ""}
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                name="password"
                type="password"
                value={values.password}
                className="px-4 py-2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.password && errors.password ? errors.password : ""
                }
              />

              {status && (
                <p className="text-sm text-red-600 text-left">{status}</p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login / Continue"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default LoginStep;
