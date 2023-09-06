import React, { useState } from "react";
import SignupImage from "./SignupImage";
import { tRPC } from "trpc/client";
import { useSession } from "next-auth/react";
import Input from "../forms/Input";
import Select from "../forms/Select";

{
  /* Validation is remaining */
}
const SignupForm = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const { data: session } = useSession();

  console.log(session);

  const { mutateAsync, isLoading, isSuccess, isError, error } =
    tRPC.createUser.useMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
      phone: phoneCode + phone,
      country,
    };
    await mutateAsync(data);
  };

  return (
    <div className="w-[48%] bg-white">
      <div className="w-[90%] mx-auto bg-[#e7e7e7] rounded-lg shadow-lg shadow-gray-300">
        <div className="flex items-center mb-1 p-5 pb-0 text-2xl font-semibold text-gray-900">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          BlackChat
        </div>
        <div className="p-6 pt-2 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Create an account
          </h1>
          <form className="space-y-4 md:space-y-6" onChange={handleSubmit}>
            <div className="grid grid-cols-2 grid-flow-col gap-4">
              <div>
                <Input
                  type="text"
                  name="username"
                  label="Username"
                  value={username}
                  setValue={(val) => setUsername(val)}
                  bgColor="gray"
                  textColor="text-gray-900"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="email"
                  label="Email"
                  value={email}
                  setValue={(val) => setEmail(val)}
                  bgColor="gray"
                  textColor="text-gray-900"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 grid-flow-col gap-4">
              <div>
                <Select
                  name="country"
                  label="Country"
                  value={country}
                  setValue={(val) => setCountry(val)}
                  textColor="text-gray-900"
                  mappedData={
                    <>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="China">China</option>
                      <option value="UAE">UAE</option>
                      <option value="Thailand">Thailand</option>
                    </>
                  }
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="phone"
                  label="Phone"
                  value={phone}
                  setValue={(val) => setPhone(val)}
                  bgColor="gray"
                  textColor="text-gray-900"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 grid-flow-col gap-4">
              <div>
                <Input
                  type="text"
                  name="password"
                  label="Password"
                  value={password}
                  setValue={(val) => setPassword(val)}
                  bgColor="gray"
                  textColor="text-gray-900"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="password"
                  label="Confirm Password"
                  value={confirmPassword}
                  setValue={(val) => setConfirmPassword(val)}
                  bgColor="gray"
                  textColor="text-gray-900"
                />
              </div>
            </div>
            <div></div>
            <button
              type="submit"
              className="w-full mt-24 text-white bg-blue-600 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
          </form>
          <p className="text-sm font-light text-gray-500">
            Already have an account?{" "}
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
