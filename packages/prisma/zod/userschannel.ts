import * as z from "zod"
import { CompleteUser, userModel, CompleteChannel, channelModel } from "./index"

export const _usersChannelModel = z.object({
  id: z.number().int(),
  userId: z.string(),
  uniqueId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUsersChannel extends z.infer<typeof _usersChannelModel> {
  user: CompleteUser
  channels: CompleteChannel[]
}

/**
 * usersChannelModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const usersChannelModel: z.ZodSchema<CompleteUsersChannel> = z.lazy(() => _usersChannelModel.extend({
  user: userModel,
  channels: channelModel.array(),
}))
