import * as z from "zod"
import { CompleteRoom, relatedRoomModel, CompleteChannelUserDetail, relatedChannelUserDetailModel, CompleteUsersChannel, relatedUsersChannelModel, CompleteUser, relatedUserModel } from "./index"

export const channelModel = z.object({
  id: z.number().int(),
  uniqueId: z.string(),
  name: z.string(),
  inviteCode: z.string(),
  usersChannelId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteChannel extends z.infer<typeof channelModel> {
  rooms: CompleteRoom[]
  userDetails: CompleteChannelUserDetail[]
  usersChannel?: CompleteUsersChannel | null
  User: CompleteUser[]
}

/**
 * relatedChannelModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedChannelModel: z.ZodSchema<CompleteChannel> = z.lazy(() => channelModel.extend({
  rooms: relatedRoomModel.array(),
  userDetails: relatedChannelUserDetailModel.array(),
  usersChannel: relatedUsersChannelModel.nullish(),
  User: relatedUserModel.array(),
}))
