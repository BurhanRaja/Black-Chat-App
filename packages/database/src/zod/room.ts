import * as z from "zod"
import { AccessRole } from "@prisma/client"
import { CompleteChannelUserDetail, channelUserDetailModel, CompleteChannel, channelModel, CompleteMessage, messageModel } from "./index"

export const _roomModel = z.object({
  id: z.number().int(),
  uniqueId: z.string(),
  name: z.string(),
  channelId: z.string(),
  accessRoles: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  access_roles: z.nativeEnum(AccessRole).array(),
})

export interface CompleteRoom extends z.infer<typeof _roomModel> {
  users: CompleteChannelUserDetail[]
  channel: CompleteChannel
  roomChat: CompleteMessage[]
}

/**
 * roomModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const roomModel: z.ZodSchema<CompleteRoom> = z.lazy(() => _roomModel.extend({
  users: channelUserDetailModel.array(),
  channel: channelModel,
  roomChat: messageModel.array(),
}))
