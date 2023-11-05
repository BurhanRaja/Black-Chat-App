import axios from "axios";

interface CreateServerParams {
  imageUrl: string;
  name: string;
}

export const createServer = async (data: CreateServerParams) => {
  const response = await axios.post("/api/server", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

interface DeleteServerParams {
  serverId: string;
}

export const deleteServer = async (data: DeleteServerParams) => {
  const response = await axios.delete(`/api/server/${data.serverId}`);
  return response.data;
};
