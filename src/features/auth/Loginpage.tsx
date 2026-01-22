import { AuthWrapper } from "./AuthWrapper";
import Login from "./Login";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <AuthWrapper title={t("AUTH.TITLE")}>
      <Login />
    </AuthWrapper>
  );
};

export default LoginPage;
