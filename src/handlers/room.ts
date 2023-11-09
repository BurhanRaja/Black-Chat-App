import { CreateRoom } from "@/types";
import axios from "axios";

export const createRoom = async (data: CreateRoom) => {
  const response = await axios.post("/api/room", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
