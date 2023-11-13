"use client";

import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import axios from "axios";
import { ResendEmail } from "@/types";
import { AlertContext } from "@/context/createContext";

const EmailVerifiedPannel = () => {
  const { data: session } = useSession();
  const { setAlertOpen, setDescription, setTitle, setType } =
    useContext(AlertContext);

  const [resendEmail, setResentEmail] = useState<boolean>(true);

  const handleResendEmail = async () => {
    let data: ResendEmail = {
      email: session?.user.email as string,
      userId: session?.user.userId as string,
    };
    const response = await axios.post("/api/user/resend/email", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      setTitle("Success");
      setDescription("Email Successfully sent.");
      setType("success");
      setAlertOpen(true);
    } else {
      setTitle("Error");
      setDescription("Some Error Occurred. Please Try again.");
      setType("error");
      setAlertOpen(true);
    }
  };

  return (
    <>
      {!session?.user.emailVerified && resendEmail && (
        <div className="bg-orange-600 text-white p-3 flex justify-between items-center">
          <div className="flex">
            <p>Please Verify your Email address.</p>
            <button className="underline ml-1" onClick={handleResendEmail}>
              Resend Email
            </button>
            <p className="ml-0.5">?</p>
          </div>
          <button onClick={() => setResentEmail(false)}>
            <X />
          </button>
        </div>
      )}
    </>
  );
};

export default EmailVerifiedPannel;
