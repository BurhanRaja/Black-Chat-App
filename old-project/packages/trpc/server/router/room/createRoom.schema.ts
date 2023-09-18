import z from "zod";
import { RoomType } from "@prisma/client";

const createRoomInputValidate = z.object({
  name: z.string().min(5).max(30),
  channelId: z.string(),
  roomType: z.custom<RoomType>(),
});

export type CreateRoomInput = typeof createRoomInputValidate._type;

export const createRoomInput = createRoomInputValidate;
