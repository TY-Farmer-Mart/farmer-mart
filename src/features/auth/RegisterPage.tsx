import { AuthWrapper } from "./AuthWrapper";
import Register from "./Register";

const RegisterPage: React.FC = () => {
  return (
    <AuthWrapper title="Create an Account">
      <Register />
    </AuthWrapper>
  );
};

export default RegisterPage;
