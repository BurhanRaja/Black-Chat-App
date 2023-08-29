import * as z from "zod"
import { CompleteUser, relatedUserModel } from "./index"

export const friendsModel = z.object({
  id: z.number().int(),
  senderId: z.string(),
  receiverId: z.string(),
  status: z.boolean(),
  uniqueId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteFriends extends z.infer<typeof friendsModel> {
  sender: CompleteUser
  reciever: CompleteUser
}

/**
 * relatedFriendsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFriendsModel: z.ZodSchema<CompleteFriends> = z.lazy(() => friendsModel.extend({
  sender: relatedUserModel,
  reciever: relatedUserModel,
}))
