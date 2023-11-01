"use client";
import { AlertContext } from "@/context/createContext";
import { ReactNode, useEffect, useState } from "react";
import Toast from "../ui/toast";

interface AlertProviderProps {
  children: ReactNode;
}

const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<
    "error" | "success" | "info" | "notification"
  >("success");

  useEffect(() => {
    if (alertOpen) {
      let timer = setTimeout(() => {
        setAlertOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertOpen]);

  return (
    <AlertContext.Provider
      value={{
        setAlertOpen,
        setTitle,
        setDescription,
        setType,
      }}
    >
      {alertOpen && (
        <Toast
          open={alertOpen}
          setOpen={(val) => setAlertOpen(val)}
          title={title}
          description={description}
          type={type}
        />
      )}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
