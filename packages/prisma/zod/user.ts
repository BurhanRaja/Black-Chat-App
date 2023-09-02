import * as z from "zod"
import { CompleteUsersChannel, usersChannelModel, CompleteChannelUserDetail, channelUserDetailModel, CompleteFriends, friendsModel, CompleteMessage, messageModel, CompleteNotifications, notificationsModel, CompleteAccount, accountModel, CompleteSession, sessionModel } from "./index"

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
  senderRequest: CompleteFriends[]
  receiverRequest: CompleteFriends[]
  senderMessages: CompleteMessage[]
  receiverMessage: CompleteMessage[]
  notifications: CompleteNotifications[]
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
}

/**
 * userModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const userModel: z.ZodSchema<CompleteUser> = z.lazy(() => _userModel.extend({
  channel: usersChannelModel.array(),
  allChannelUserDetails: channelUserDetailModel.array(),
  senderRequest: friendsModel.array(),
  receiverRequest: friendsModel.array(),
  senderMessages: messageModel.array(),
  receiverMessage: messageModel.array(),
  notifications: notificationsModel.array(),
  accounts: accountModel.array(),
  sessions: sessionModel.array(),
}))
