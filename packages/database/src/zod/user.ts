import * as z from "zod"
import { CompleteUsersChannel, usersChannelModel, CompleteChannelUserDetail, channelUserDetailModel, CompleteMessage, messageModel, CompleteFriends, friendsModel, CompleteNotifications, notificationsModel, CompleteAccount, accountModel, CompleteSession, sessionModel, CompleteDirectMessage, directMessageModel } from "./index"

export const _userModel = z.object({
  id: z.number().int(),
  username: z.string(),
  email: z.string(),
  country: z.string(),
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

export interface CompleteUser extends z.infer<typeof _userModel> {
  channel: CompleteUsersChannel[]
  allChannelUserDetails: CompleteChannelUserDetail[]
  userMessages: CompleteMessage[]
  userReplyMessages: CompleteMessage[]
  senderRequest: CompleteFriends[]
  receiverRequest: CompleteFriends[]
  notifications: CompleteNotifications[]
  account?: CompleteAccount | null
  session?: CompleteSession | null
  dMUserOne: CompleteDirectMessage[]
  dMUserTwo: CompleteDirectMessage[]
}

/**
 * userModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const userModel: z.ZodSchema<CompleteUser> = z.lazy(() => _userModel.extend({
  channel: usersChannelModel.array(),
  allChannelUserDetails: channelUserDetailModel.array(),
  userMessages: messageModel.array(),
  userReplyMessages: messageModel.array(),
  senderRequest: friendsModel.array(),
  receiverRequest: friendsModel.array(),
  notifications: notificationsModel.array(),
  account: accountModel.nullish(),
  session: sessionModel.nullish(),
  dMUserOne: directMessageModel.array(),
  dMUserTwo: directMessageModel.array(),
}))
