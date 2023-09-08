import * as z from "zod"
import { AccessRole, RoomType } from "@prisma/client"
import { CompleteChannel, channelModel, CompleteMessage, messageModel } from "./index"

export const _roomModel = z.object({
  id: z.number().int(),
  uniqueId: z.string(),
  name: z.string(),
  channelId: z.string(),
  accessRoles: z.nativeEnum(AccessRole).array(),
  roomType: z.nativeEnum(RoomType),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteRoom extends z.infer<typeof _roomModel> {
  channel: CompleteChannel
  roomChat: CompleteMessage[]
}

/**
 * roomModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const roomModel: z.ZodSchema<CompleteRoom> = z.lazy(() => _roomModel.extend({
  channel: channelModel,
  roomChat: messageModel.array(),
}))
