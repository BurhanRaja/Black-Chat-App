import * as z from "zod"
import { CompleteUser, userModel } from "./index"

export const _friendsModel = z.object({
  id: z.number().int(),
  senderId: z.string(),
  receiverId: z.string(),
  status: z.boolean(),
  uniqueId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteFriends extends z.infer<typeof _friendsModel> {
  sender: CompleteUser
  reciever: CompleteUser
}

/**
 * friendsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const friendsModel: z.ZodSchema<CompleteFriends> = z.lazy(() => _friendsModel.extend({
  sender: userModel,
  reciever: userModel,
}))
