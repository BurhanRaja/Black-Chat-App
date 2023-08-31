import * as z from "zod"
import { CompleteUsersChannel, relatedUsersChannelModel, CompleteChannelUserDetail, relatedChannelUserDetailModel, CompleteFriends, relatedFriendsModel, CompleteMessage, relatedMessageModel, CompleteNotifications, relatedNotificationsModel } from "./index"

export const userModel = z.object({
  id: z.number().int(),
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  uniqueId: z.string(),
  password: z.string(),
  emailVerified: z.boolean(),
  phoneVerified: z.boolean(),
  twoFactorEnable: z.boolean(),
  about: z.string(),
  disable: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof userModel> {
  channel: CompleteUsersChannel[]
  allChannelUserDetails: CompleteChannelUserDetail[]
  senderRequest: CompleteFriends[]
  receiverRequest: CompleteFriends[]
  senderMessages: CompleteMessage[]
  receiverMessage: CompleteMessage[]
  notifications: CompleteNotifications[]
}

/**
 * relatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => userModel.extend({
  channel: relatedUsersChannelModel.array(),
  allChannelUserDetails: relatedChannelUserDetailModel.array(),
  senderRequest: relatedFriendsModel.array(),
  receiverRequest: relatedFriendsModel.array(),
  senderMessages: relatedMessageModel.array(),
  receiverMessage: relatedMessageModel.array(),
  notifications: relatedNotificationsModel.array(),
}))
