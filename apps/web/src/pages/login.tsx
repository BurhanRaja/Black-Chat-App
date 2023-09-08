import React from "react";
import SignupImage from "../components/signup/SignupImage";
import LoginForm from "../components/login/LoginForm";

const Login = () => {

  return (
    <>
      <section className="bg-gray-900">
        <div className="flex items-center justify-between mx-auto md:h-screen">
          <SignupImage />
          {/* Validation is remaining */}
          <LoginForm />
        </div>
      </section>
    </>
  );
};

export default Login;
