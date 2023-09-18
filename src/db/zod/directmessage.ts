import * as z from "zod"
import { CompleteUser, userModel, CompleteMessage, messageModel } from "./index"

export const _directMessageModel = z.object({
  id: z.number().int(),
  uniqueId: z.string(),
  userOneId: z.string(),
  userTwoId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteDirectMessage extends z.infer<typeof _directMessageModel> {
  userOne: CompleteUser
  userTwo: CompleteUser
  Message: CompleteMessage[]
}

/**
 * directMessageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const directMessageModel: z.ZodSchema<CompleteDirectMessage> = z.lazy(() => _directMessageModel.extend({
  userOne: userModel,
  userTwo: userModel,
  Message: messageModel.array(),
}))
