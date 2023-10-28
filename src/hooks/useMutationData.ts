import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AlertContext } from "@/context/createContext";

interface MutationParams {
  func: (data: any) => Promise<any>;
}

interface Error {
  response: {
    data: {
      message: string;
    };
  };
}

const useMutationData = ({ func }: MutationParams) => {
  const {
    setAlertOpen,
    setTitle,
    setDescription,
    setDuration,
    setTitleTextColor,
    setDescriptionTextColor,
    setBackgroundColor,
  } = useContext(AlertContext);

  const mutation = useMutation(func, {
    onSuccess: (data) => {
      if (data.success) {
        setAlertOpen(true);
        setTitle("Success");
        setDuration(3000);
        setDescription(data.message);
        setTitleTextColor("text-white");
        setDescriptionTextColor("text-gray-300");
        setBackgroundColor("bg-green-500");
      }
    },
    onError: (error: Error) => {
      setAlertOpen(true);
      setTitle("Error");
      setDuration(3000);
      setDescription(error.response.data.message);
      setTitleTextColor("text-white");
      setDescriptionTextColor("text-gray-200");
      setBackgroundColor("bg-red-600");
    },
  });

  return mutation;
};

export default useMutationData;
