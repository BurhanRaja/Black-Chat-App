import React, { FormEvent, FunctionComponent, useState } from "react";
import Input from "../forms/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LoginForm: FunctionComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Hello");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(res);
  };

  return (
    <>
      <div className="w-[48%] ">
        <div className="w-[70%] mx-auto py-6 bg-gray-800 rounded-lg shadow-lg shadow-gray-600">
          <div className="flex items-center justify-center mb-1 p-5 pb-0 text-2xl font-semibold text-gray-50">
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            BlackChat
          </div>
          <div className="p-6 pt-2 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-gray-50 md:text-2xl ">
              Login
              <p className="text-sm mt-3 font-light text-gray-100">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Signup here
                </Link>
              </p>
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <Input
                  type="text"
                  name="email"
                  label="Email"
                  value={email}
                  setValue={(val) => setEmail(val)}
                  bgColor="gray"
                  textColor="text-gray-900"
                  labelColor="text-gray-50"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="password"
                  label="Password"
                  value={password}
                  setValue={(val) => setPassword(val)}
                  bgColor="gray"
                  textColor="text-gray-900"
                  labelColor="text-gray-50"
                />
              </div>
              <div></div>
              <button
                type="submit"
                className="w-full mt-24 text-white bg-blue-600 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
