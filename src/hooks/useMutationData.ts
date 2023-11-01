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
  const { setAlertOpen, setTitle, setDescription, setType } =
    useContext(AlertContext);

  const mutation = useMutation(func, {
    onSuccess: (data) => {
      if (data.success) {
        setAlertOpen(true);
        setTitle("Success");
        setType("success");
        setDescription(data.message);
      }
    },
    onError: (error: Error) => {
      setAlertOpen(true);
      setTitle("Error");
      setType("error");
      setDescription(error.response.data.message);
    },
  });

  return mutation;
};

export default useMutationData;
