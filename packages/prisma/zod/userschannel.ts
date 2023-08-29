import * as z from "zod"
import { CompleteUser, relatedUserModel, CompleteChannel, relatedChannelModel } from "./index"

export const usersChannelModel = z.object({
  id: z.number().int(),
  userId: z.string(),
  uniqueId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUsersChannel extends z.infer<typeof usersChannelModel> {
  user: CompleteUser
  channels: CompleteChannel[]
}

/**
 * relatedUsersChannelModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUsersChannelModel: z.ZodSchema<CompleteUsersChannel> = z.lazy(() => usersChannelModel.extend({
  user: relatedUserModel,
  channels: relatedChannelModel.array(),
}))
