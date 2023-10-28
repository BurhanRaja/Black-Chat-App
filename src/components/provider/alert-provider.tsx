"use client";
import { AlertContext } from "@/context/createContext";
import { ReactNode, useState } from "react";
import Toast from "../ui/toast";

interface AlertProviderProps {
  children: ReactNode;
}

const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [duration, setDuration] = useState<number>(3000);
  const [titleTextColor, setTitleTextColor] = useState<string>("");
  const [descriptionTextColor, setDescriptionTextColor] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");

  return (
    <AlertContext.Provider
      value={{
        setAlertOpen,
        setTitle,
        setDescription,
        setDuration,
        setTitleTextColor,
        setDescriptionTextColor,
        setBackgroundColor,
      }}
    >
      <Toast
        open={alertOpen}
        setOpen={(val) => setAlertOpen(val)}
        title={title}
        description={description}
        duration={duration}
        titleTextColor={titleTextColor}
        descriptionTextColor={descriptionTextColor}
        backgroundColor={backgroundColor}
      />
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
