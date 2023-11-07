"use client";

import Input from "@/components/ui/input";
import { forgetPasswordEmail } from "@/handlers/user";
import useMutationData from "@/hooks/useMutationData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AiFillInfoCircle, AiOutlineLoading3Quarters } from "react-icons/ai";

const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,5}$/;

const ForgetPasswordEmail = () => {
  const { status } = useSession();
  const router = useRouter();
  const { mutate, isLoading, isSuccess, isError } = useMutationData({
    func: forgetPasswordEmail,
  });

  const [email, setEmail] = useState<string>("");
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (EMAIL_REGEX.test(email)) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  }, [email]);

  useEffect(() => {
    if (isSuccess && !isError) {
      router.push("/auth/signin");
    }
  }, [isSuccess, isError]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let emailTest = EMAIL_REGEX.test(email);

    if (email.length === 0) {
      setError("The above field is empty.");
      return;
    }

    if (!emailTest) {
      setEmailError("Email does not match the instructions");
      return;
    }

    let data = {
      email,
    };
    mutate(data);
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/servers/@me");
    }
  }, [status]);

  return (
    <>
      <div className="flex justify-center items-center bg-zinc-800 h-[100vh]">
        <div className="w-[35%] p-2 bg-black rounded-md h-[50%] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Forget Password</h1>
          <form className="p-2 w-[80%]" onSubmit={handleSubmit}>
            <div className="mb-3">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                label="Email"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              {email.length !== 0 && emailError && !emailFocus ? (
                <p className="mt-1 text-xs text-red-500">{emailError}</p>
              ) : (
                ""
              )}
              {email.length === 0 && error ? (
                <p className="mt-1 text-xs text-red-500">{error}</p>
              ) : (
                ""
              )}
              {!checkEmail && emailFocus ? (
                <p className="text-white mt-1 text-xs flex items-start p-1 bg-gray-900 rounded-sm">
                  <AiFillInfoCircle className="text-white mr-2" />
                  <span>Example: example@email.com</span>
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center justify-center mt-8">
              <button className="p-2 w-[70%] rounded-md text-lg border border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-800 font-bold">
                {isLoading ? (
                  <p className="text-center flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="animate-spin text-lg text-white" />
                  </p>
                ) : (
                  "Send mail"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordEmail;
