"use client";

import { AlertContext } from "@/context/createContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

interface ServerAlertProps {
  type: string;
  message: string;
  redirect: string;
}

const ServerAlert = ({ type, message, redirect }: ServerAlertProps) => {
  const { setTitle, setDescription, setAlertOpen, setType } =
    useContext(AlertContext);
  const router = useRouter();

  useEffect(() => {
    if (type && message && redirect) {
      setType(type);
      setTitle(type.charAt(0).toUpperCase() + type.substring(1));
      setDescription(message);
      setAlertOpen(true);
      router.push(redirect);
    }
  }, [type, message, redirect]);

  return <></>;
};

export default ServerAlert;
