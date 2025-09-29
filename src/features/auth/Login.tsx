import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { LoginSchema, LoginFormValues } from "@/schemas/loginSchema";
import { AiOutlineApple } from "react-icons/ai";
import Googleimg from "@assets/images/google.svg";
import { ROUTES } from "@/constants/routeConstants";
import { loginUser } from "../../services/auth";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues) => {
    console.log("Form submitted:", values);

    try {
      const data = await loginUser(values);
      console.log("User data:", data);
      navigate("/dashboard");
    } catch (err) {
      console.log("error while logging in", err);
    }
  };

  return (
    <>
      <div className="absolute top-4 right-4 z-30">
        <LanguageSwitcher />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form className="space-y-4">
            <div>
              <Input
                label={t("AUTH.EMAIL_LABEL")}
                type="email"
                id="email"
                name="email"
                placeholder={t("AUTH.EMAIL_PLACEHOLDER")}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="p-2"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-left text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <Input
                label={t("AUTH.PASSWORD_LABEL")}
                type="password"
                id="password"
                name="password"
                placeholder={t("AUTH.PASSWORD_PLACEHOLDER")}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="p-2"
              />
              {touched.password && errors.password && (
                <p className="text-red-500 text-left text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                {t("AUTH.REMEMBER_ME")}
              </label>
              <a href="#" className="text-green-600 hover:underline">
                {t("AUTH.FORGOT_PASSWORD")}
              </a>
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              disabled={isSubmitting}
            >
              {t("AUTH.TITLE")}
            </Button>
          </Form>
        )}
      </Formik>
      <div className="py-2 flex items-center">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500 text-sm">{t("AUTH.SOCIAL")}</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <div className="flex justify-center items-center gap-2">
        <Button
          variant="social"
          className="w-full flex items-center justify-center gap-2 text-sm p-1"
        >
          <img src={Googleimg} alt="Google" className="w-10 h-5 inline" />
          {t("AUTH.CONTINUE_WITH_GOOGLE")}
        </Button>

        <Button
          variant="social"
          className="w-full flex items-center justify-center gap-2 text-sm p-1"
        >
          <AiOutlineApple size={27} className="inline mr-1" />
          {t("AUTH.CONTINUE_WITH_APPLE")}
        </Button>
      </div>
      <p className="text-center text-sm text-gray-600 my-2">
        {t("AUTH.FOOTER")}
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            navigate(`${ROUTES.AUTH}${ROUTES.REGISTER}`);
          }}
          className="text-green-600 hover:underline"
        >
          {t("AUTH.FOOTER_LINK")}
        </Link>
      </p>
    </>
  );
};

export default Login;
