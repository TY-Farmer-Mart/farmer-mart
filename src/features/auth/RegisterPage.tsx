import { useTranslation } from "react-i18next";

import Register from "./Register";
import { AuthWrapper } from "./Authwrapper";

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AuthWrapper title={t("AUTH.REGISTER_TITLE")}>
      <Register />
    </AuthWrapper>
  );
};

export default RegisterPage;
