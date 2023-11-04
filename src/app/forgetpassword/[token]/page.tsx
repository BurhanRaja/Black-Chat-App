"use client";

import Input from "@/components/ui/input";
import { forgetPasswordEmail, resetPassword } from "@/handlers/user";
import useMutationData from "@/hooks/useMutationData";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AiFillInfoCircle, AiOutlineLoading3Quarters } from "react-icons/ai";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const ResetPassword = () => {
  const { status } = useSession();
  const router = useRouter();
  const { mutate, isLoading, isSuccess, isError } = useMutationData({
    func: resetPassword,
  });
  const { token } = useParams();

  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (PASSWORD_REGEX.test(password)) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  }, [checkPassword]);

  useEffect(() => {
    if (isSuccess && !isError) {
      router.push("/auth/signin");
    }
  }, [isSuccess, isError]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let emailTest = PASSWORD_REGEX.test(password);
    if (password.length === 0) {
      setError("The above field is empty.");
      return;
    }
    if (!emailTest) {
      setPasswordError("Email does not match the instructions");
      return;
    }
    let data = {
      password,
    };

    mutate({ data, token });
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
          <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
          <form className="p-2 w-[80%]" onSubmit={handleSubmit}>
            <div className="mb-3">
              <Input
                value={password}
                setVal={(val) => setPassword(val)}
                name="password"
                type="password"
                label="New Password"
                setFocus={(val) => setPasswordFocus(val)}
                setBlur={(val) => setPasswordFocus(val)}
              />
              {password.length !== 0 && passwordError && !passwordFocus ? (
                <p className="mt-1 text-xs text-red-500">{passwordError}</p>
              ) : (
                ""
              )}
              {password.length === 0 && error ? (
                <p className="mt-1 text-xs text-red-500">{error}</p>
              ) : (
                ""
              )}
              {!checkPassword && passwordFocus ? (
                <p className="text-white mt-1 text-xs flex items-start p-1 bg-gray-900 rounded-sm">
                  <AiFillInfoCircle className="text-white mr-2" />
                  <span>
                    {" "}
                    Strong password should contain lowercase letters, UPPERCASE
                    letters, digits and one special character.
                  </span>
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
                  "Reset"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
