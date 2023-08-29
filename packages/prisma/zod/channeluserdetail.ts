import * as z from "zod"
import { CompleteUser, relatedUserModel, CompleteRoom, relatedRoomModel, CompleteChannel, relatedChannelModel } from "./index"

export const channelUserDetailModel = z.object({
  id: z.number().int(),
  userId: z.string(),
  accessRole: z.number().int(),
  join_type: z.number().int(),
  channelId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteChannelUserDetail extends z.infer<typeof channelUserDetailModel> {
  user: CompleteUser
  room: CompleteRoom[]
  channel?: CompleteChannel | null
}

/**
 * relatedChannelUserDetailModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedChannelUserDetailModel: z.ZodSchema<CompleteChannelUserDetail> = z.lazy(() => channelUserDetailModel.extend({
  user: relatedUserModel,
  room: relatedRoomModel.array(),
  channel: relatedChannelModel.nullish(),
}))
