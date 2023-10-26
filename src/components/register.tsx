"use client";

import { FormEvent, useState } from "react";
import Input from "./ui/input";
import Link from "next/link";
import Select from "./ui/select";
import useMutationData from "@/hooks/useMutationData";
import { registerUser } from "@/utils/user";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const { data, mutate, isSuccess, isError, error } = useMutationData({
    func: registerUser,
    setMessage,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let data = {
      email,
      username,
      gender: Number(gender),
      password,
    };
    mutate(data);
  };

  return (
    <>
      <div className="flex justify-center items-center bg-zinc-800 h-[100vh]">
        <div className="w-[35%] p-2 bg-black rounded-md h-[85%] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">SignUp</h1>
          <p className="my-2 mb-3">
            Already have an Account?{" "}
            <Link className="text-blue-600 hover:underline" href={""}>
              Login
            </Link>{" "}
          </p>
          <form className="p-2 w-[80%]" onSubmit={handleSubmit}>
            <div className="mb-3">
              <Input
                value={username}
                setVal={(val) => setUsername(val)}
                name="username"
                type="text"
                label="Username"
              />
            </div>
            <div className="mb-3">
              <Input
                value={email}
                setVal={(val) => setEmail(val)}
                name="email"
                type="email"
                label="Email"
              />
            </div>
            <div className="mb-3">
              <Input
                value={password}
                setVal={(val) => setPassword(val)}
                name="password"
                type="text"
                label="Password"
              />
            </div>
            <div className="mb-3">
              <Select
                value={gender}
                setValue={(val) => setGender(val)}
                name="gender"
                label="Gender"
                options={[
                  {
                    name: "Male",
                    value: "0",
                    key: "swewsv",
                  },
                  {
                    name: "Female",
                    value: "1",
                    key: "tyrrdv",
                  },
                ]}
              />
            </div>
            <div className="flex items-center justify-center mt-8">
              <button className="p-2 w-[70%] rounded-md text-lg border border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-800 font-bold">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
