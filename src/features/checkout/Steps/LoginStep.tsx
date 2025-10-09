// module: LoginStep file scope (imports)
import React from "react";
import { useDispatch } from "react-redux";
import { goToNextStep } from "@/redux/checkoutSlice";
import { Formik, Form } from "formik";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import { LoginSchema, LoginFormValues } from "@/schemas/loginSchema";
import { loginUser } from "@/services/auth";

interface Props {
  isActive?: boolean; // defaults to true when used as a standalone route
  onNext?: () => void;
}

// component: LoginStep
const LoginStep: React.FC<Props> = ({ isActive = true, onNext }) => {
  const dispatch = useDispatch();

  if (!isActive) return null;

  const initialValues: LoginFormValues = { email: "", password: "" };

  const getStoredToken = (): string | undefined => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const parsed = JSON.parse(userStr);
        if (parsed?.token && typeof parsed.token === "string") return parsed.token;
      }
    } catch {}
    const token = localStorage.getItem("token");
    return token || undefined;
  };

  const getUserEmail = (): string => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const parsed = JSON.parse(userStr);
        return parsed?.user?.email || parsed?.email || "";
      }
    } catch {}
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
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus(undefined);
          try {
            const res: any = await loginUser(values);
            // Normalize and persist for downstream checks (e.g., ProtectedRoute)
            if (res?.token) {
              try {
                localStorage.setItem("user", JSON.stringify({ message: res.message || "Login successful", token: res.token }));
              } catch {}
            }
            if (onNext) onNext();
            else dispatch(goToNextStep());
          } catch (err: any) {
            setStatus(err?.message || "Login failed");
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
              error={touched.password && errors.password ? errors.password : ""}
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
