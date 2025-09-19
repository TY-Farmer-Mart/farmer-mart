import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import React from "react";
import { AUTH_TEXT } from "@/constants/textConstants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const text = AUTH_TEXT.LOGIN;
    const navigate = useNavigate();


    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/user");
  };

  return (
    <div className="flex flex-row justify-between md:flex-row h-[100vh]">
      {/* Left side bg image */}
      <div className="hidden md:flex w-1/2 items-center justify-start text-white p-10 bg-sky-300">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">background image on this side!</h1>
          <p className="text-lg">{text.SUBTITLE}</p>
        </div>
      </div>

      {/* Right side (login form) */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">{text.TITLE}</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <Input
              label={text.EMAIL_LABEL}
              type="email"
              id="email"
              placeholder="you@example.com"
              required
            />

            {/* Password */}
            <Input
              label={text.PASSWORD_LABEL}
              type="password"
              id="password"
              placeholder="••••••••"
              required
            />

            {/* Remember + Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                {text.REMEMBER_ME}
              </label>
              <a href="#" className="text-green-600 hover:underline">
                {text.FORGOT_PASSWORD}
              </a>
            </div>

            {/* Submit button */}
            <Button type="submit" variant="primary" size="md" className="w-full">
              {text.BUTTON}
            </Button>
          </form>

          {/* Divider Lines */}
          <div className="my-6 flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">{text.SOCIAL}</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social logins */}
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="social"
              className="w-full flex items-center justify-center gap-2 text-sm p-1"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-10 h-5 inline"
              />
              Continue with Google
            </Button>

            <Button
              variant="social"
              className="w-full flex items-center justify-center gap-2 bg-black text-sm p-1"
            >
              <img
                src="https://store.storeimages.cdn-apple.com/4668/store.apple.com/static-resources/rs-external-1.66.0-953d3/rel/45dfd13dacaf484f3462.svg"
                alt="Apple"
                className="w-10 h-5 inline"
              />
              Continue with Apple
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            {text.FOOTER}
            <a href="#" className="text-green-600 hover:underline">
              {text.FOOTER_LINK}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
