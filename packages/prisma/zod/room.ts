import * as z from "zod"
import { CompleteChannelUserDetail, relatedChannelUserDetailModel, CompleteChannel, relatedChannelModel, CompleteMessage, relatedMessageModel } from "./index"

export const roomModel = z.object({
  id: z.number().int(),
  uniqueId: z.string(),
  name: z.string(),
  channelId: z.string(),
  accessRoles: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteRoom extends z.infer<typeof roomModel> {
  users: CompleteChannelUserDetail[]
  channel: CompleteChannel
  roomChat: CompleteMessage[]
}

/**
 * relatedRoomModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedRoomModel: z.ZodSchema<CompleteRoom> = z.lazy(() => roomModel.extend({
  users: relatedChannelUserDetailModel.array(),
  channel: relatedChannelModel,
  roomChat: relatedMessageModel.array(),
}))
