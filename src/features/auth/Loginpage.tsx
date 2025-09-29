import { AuthWrapper } from "./Authwrapper";
import Login from "./Login";
import { useTranslation } from "react-i18next";

const Loginpage = () => {
  const { t } = useTranslation();
  return (
    <AuthWrapper title={t("AUTH.TITLE")}>
      <Login />
    </AuthWrapper>
  );
};

export default Loginpage;
