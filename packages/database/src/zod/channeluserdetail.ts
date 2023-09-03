import * as z from "zod"
import { CompleteUser, userModel, CompleteRoom, roomModel, CompleteChannel, channelModel } from "./index"

export const _channelUserDetailModel = z.object({
  id: z.number().int(),
  userId: z.string(),
  accessRole: z.number().int(),
  join_type: z.number().int(),
  channelId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteChannelUserDetail extends z.infer<typeof _channelUserDetailModel> {
  user: CompleteUser
  room: CompleteRoom[]
  channel?: CompleteChannel | null
}

/**
 * channelUserDetailModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const channelUserDetailModel: z.ZodSchema<CompleteChannelUserDetail> = z.lazy(() => _channelUserDetailModel.extend({
  user: userModel,
  room: roomModel.array(),
  channel: channelModel.nullish(),
}))
