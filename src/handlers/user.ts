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

interface ForgetPasswordEmailData {
  email: string;
}
export const forgetPasswordEmail = async (data: ForgetPasswordEmailData) => {
  const response = await axios.post("/api/user/forgetpassword", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

interface ResetPassword {
  data: {
    password: string;
  };
  token: string;
}
export const resetPassword = async ({ data, token }: ResetPassword) => {
  const response = await axios.post(`/api/user/forgetpassword/${token}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
