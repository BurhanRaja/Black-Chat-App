import axios from "axios";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  gender: number;
}

export const registerUser = async (data: RegisterData) => {
  const response = await axios.post("/api/user/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
