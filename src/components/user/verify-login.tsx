"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

const VerifyLogin = () => {
  const { token } = useParams();
  const router = useRouter();
  const { update } = useSession();

  const handleVerifyToken = async () => {
    const response = await fetch(`/api/user/verify/${token}`);
    const res = await response.json();
    if (res.success) {
      update({ emailVerifySuccess: true });
      router.push("/auth/signin");
    }
  };

  useEffect(() => {
    handleVerifyToken();
  }, []);

  return (
    <div className="p-5 pt-10 text-center">
      <h1 className="text-5xl text-center mb-2">Verifying...</h1>
      <p className="text-xl">Please wait token is being verified.</p>
    </div>
  );
};

export default VerifyLogin;
