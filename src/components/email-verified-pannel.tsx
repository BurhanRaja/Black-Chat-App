"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const EmailVerifiedPannel = () => {
  const { data: session } = useSession();

  const [resendEmail, setResentEmail] = useState<boolean>(true);

  return (
    <>
      {!session?.user.emailVerified && resendEmail && (
        <div className="bg-orange-600 text-white p-3 flex justify-between items-center">
          <div className="flex">
            <p>Please Verify your Email address.</p>
            <Link className="underline ml-1" href={""}>
              Resend Email
            </Link>
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
