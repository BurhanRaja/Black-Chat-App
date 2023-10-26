import { useMutation } from "@tanstack/react-query";

interface MutationParams {
  func: (data: any) => Promise<any>;
  setMessage: (val: string) => void;
}

const useMutationData = ({ func, setMessage }: MutationParams) => {
  const mutation = useMutation(func, {
    onSuccess: (data) => {
      if (data.success) {
        setMessage(data.message);
      }
    },
    onError: (error) => {
      console.log(error);
      setMessage("");
    },
  });

  return mutation;
};

export default useMutationData;
