import axios from "axios";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  gender: number;
}

export const registerUser = async (data: RegisterData) => {
  const response = await axios.post("/api/register", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.data;
};
